import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import resolvers from "./schema/resolvers.ts";
import { fileURLToPath } from "url";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import contextFunc, { Context } from "./context.ts";

const { json } = bodyParser;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const typeDefs = fs.readFileSync(path.join(__dirname, "schema/types.gql"), {
    encoding: "utf8",
});

const app = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer<Context>({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            serverWillStart: async () => {
                return {
                    drainServer: async () => {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();

app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware<Context>(server, { context: contextFunc })
);

const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

const serverCleanup = useServer({ schema, context: contextFunc }, wsServer);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
