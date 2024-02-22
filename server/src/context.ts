import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { PubSub } from "graphql-subscriptions";

export type Context = {
    pubsub: PubSub;
};

const pubsub = new PubSub();
const contextFunc: ContextFunction<
    [ExpressContextFunctionArgument],
    Context
> = async ({ req, res }) => ({
    pubsub,
});

export default contextFunc;
