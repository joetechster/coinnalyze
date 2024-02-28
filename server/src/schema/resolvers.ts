import Binance, { Binance as BinanceType, Ticker } from "binance-api-node";
import { PubSub, withFilter } from "graphql-subscriptions";
import { Spot } from "@binance/connector";

let client: BinanceType;
// @ts-ignore
client = Binance.default(); //this line having type issues with ts-node
const oclient = new Spot();
let tickerApiConnected = false;
const pubsub = new PubSub();

const resolvers = {
  Query: {
    candles: async (parent, { symbol }) => {
      return await client.candles({ symbol, interval: "1d", limit: 7 });
    },
    tickers: async (parent, { symbols }) => {
      const { data } = await oclient.ticker24hr("", symbols);
      return data;
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
