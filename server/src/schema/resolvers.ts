import { Context } from "context";
import Binance, { Binance as BinanceType } from "binance-api-node";
import { subscribe } from "diagnostics_channel";

// @ts-ignore
const client: BinanceType = Binance.default();
let candleApiConnected = false;
let users = [{ name: "dami" }, { name: "joseph" }];

const resolvers = {
    Query: {
        users: (parent, args, { pubsub }: Context) => {
            pubsub.publish("USER_LIST_REQUESTED", { users });
            return users;
        },
        candles: async (parent, { symbol }) => {
            return await client.candles({ symbol, interval: "5m" });
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
        candle: {
            subscribe: (parent, { symbol }, { pubsub }: Context) => {
                if (!candleApiConnected) {
                    candleApiConnected = true;
                    client.ws.candles(symbol, "1m", (candle) => {
                        pubsub.publish(`${symbol}_SUBSCRIPTION`, { candle });
                    });
                }
                return pubsub.asyncIterator(`${symbol}_SUBSCRIPTION`);
            },
        },
    },
};

export default resolvers;
