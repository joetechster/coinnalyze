import { Context } from "context";
import Binance, { Binance as BinanceType, Ticker } from "binance-api-node";
import { Console } from "console";
import { PubSub, withFilter } from "graphql-subscriptions";

let client: BinanceType;
// @ts-ignore
client = Binance.default(); //this line having type issues with ts-node

let tickerApiConnected = false;
const pubsub = new PubSub();

const resolvers = {
  Query: {
    candles: async (parent, { symbol }) => {
      return await client.candles({ symbol, interval: "1d", limit: 6 });
    },
  },
  Subscription: {
    ticker: {
      subscribe: withFilter(
        (parent, args) => {
          if (!tickerApiConnected) {
            tickerApiConnected = true;
            try {
              client.ws.allTickers((tickers) => {
                console.log(tickers.length);
                tickers.forEach((ticker) => {
                  pubsub.publish("TICK", { ticker });
                });
              });
            } catch (e) {
              console.log(e);
            }
          }
          return pubsub.asyncIterator("TICK"); // return iterator with event id
        },
        (payload, variables) => {
          return (variables.symbols as Array<String>).includes(
            payload.ticker.symbol
          );
        }
      ),
    },
  },
};

export default resolvers;
