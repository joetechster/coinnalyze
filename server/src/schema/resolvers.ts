import { Context } from "context";
import Binance, { Binance as BinanceType } from "binance-api-node";

// @ts-ignore
const client: BinanceType = Binance.default(); //this line having type issuse with ts-node
let candleApiConnected = false;
let tickerApiConnected = false;
let users = [{ name: "dami" }, { name: "joseph" }];
let tickSubscribers: { id: string; symbols: string[] }[] = [];
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
                            pubsub.publish(`${symbol}_SUBSCRIPTION`, { candle });
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
                const id = Math.random().toString(36).slice(2);
                tickSubscribers.push({ id, symbols });
                if (!tickerApiConnected) {
                    tickerApiConnected = true;
                    client.ws.allTickers((tickers) => {
                        tickSubscribers.forEach((subscriber) => {
                            let _tickers = tickers.filter((ticker) =>
                                subscriber.symbols.includes(ticker.symbol)
                            );
                            if (_tickers.length > 0) pubsub.publish(subscriber.id, { tickers: _tickers });
                        });
                    });
                }
                return pubsub.asyncIterator(id);
            },
        },
    },
};

export default resolvers;
