import { PubSub } from "graphql-subscriptions";
import { Context } from "server";

let users = [{ name: "dami" }, { name: "joseph" }];

const resolvers = {
    Query: {
        users: (parent, args, { pubsub }: Context) => {
            pubsub.publish("USER_LIST_REQUESTED", { users });
            return users;
        },
    },
    Mutation: {
        addUser: (parent, { name }, { pubsub }: Context) => {
            let newUser = { name };
            users.push(newUser);
            pubsub.publish("USER_ADDED", { newUser });
            pubsub.publish("USER_LIST_REQUESTED", { users });
            return newUser;
        },
    },
    Subscription: {
        users: {
            subscribe: (parent, args, { pubsub }: Context) => {
                return pubsub.asyncIterator("USER_LIST_REQUESTED");
            },
        },
        newUser: {
            subscribe: (parent, args, { pubsub }: Context) => {
                return pubsub.asyncIterator("USER_ADDED");
            },
        },
    },
};

export default resolvers;
