import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [{ name: "dami" }, { name: "joseph" }];
const typeDefs = `#graphql
    type User { 
        name: String!
    }
    type Query {
        users: [User!]
    }
`;
const resolvers = {
    Query: {
        users: () => users,
    },
};
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
