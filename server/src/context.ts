import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { PubSub } from "graphql-subscriptions";

export type Context = {
    pubsub: PubSub;
};

const pubsub = new PubSub();

// This function creates an initial state for the context object when the server starts
const contextFunc: ContextFunction<[ExpressContextFunctionArgument], Context> =
    async function ({ req, res }) {
        return {
            pubsub,
        };
    };

export default contextFunc;
