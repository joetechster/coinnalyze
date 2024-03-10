import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();
// This function creates an initial state for the context object when the server starts
const contextFunc = async function ({ req, res }) {
    return {
        pubsub,
    };
};
export default contextFunc;
