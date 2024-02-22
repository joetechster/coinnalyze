import { Context } from "context";
import Binance, { Binance as BinanceType } from "binance-api-node";
import TickerStore from "./tickerStore.ts";

// @ts-ignore
const client: BinanceType = Binance.default(); //this line having type issuse with ts-node
let candleApiConnected = false;
let tickerApiConnected = false;
let users = [{ name: "dami" }, { name: "joseph" }];
let tickerStore = new TickerStore();

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
                    try {
                        client.ws.candles(symbol, "1m", (candle) => {
                            pubsub.publish(`${symbol}_SUBSCRIPTION`, {
                                candle,
                            });
                        });
                    } catch {
                        console.log("could not connect to binance api");
                    }
                }
                return pubsub.asyncIterator(`${symbol}_SUBSCRIPTION`);
            },
        },
        tickers: {
            subscribe: (parent, { symbols }, { pubsub }: Context) => {
                let id = tickerStore.addSubscriber(symbols); // add new subscriber

                // only connect to websocket once on server start-up
                if (!tickerApiConnected) {
                    tickerApiConnected = true;
                    // connect to ticker websocket
                    client.ws.allTickers((tickers) => {
                        tickerStore.addTickers(tickers); // add ticker change to local cache
                        tickerStore.publish(pubsub); // publish change to all subscribers
                    });
                }
                return pubsub.asyncIterator(id); // return iterator with event id
            },
        },
    },
};

export default resolvers;
