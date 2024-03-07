import Binance, { Binance as BinanceType } from "binance-api-node";
import { PubSub, withFilter } from "graphql-subscriptions";
import { Spot } from "@binance/connector";
import fetch from "node-fetch";

let client: BinanceType;
// @ts-ignore
client = Binance.default(); //this line having type issues with ts-node
const oclient = new Spot();
let tickerApiConnected = false;
const pubsub = new PubSub();
const newsCache = {};

const resolvers = {
  Query: {
    candles: async (parent, { symbol }) => {
      return await client.candles({ symbol, interval: "1d", limit: 7 });
    },
    tickers: async (parent, { symbols }) => {
      const { data } = await oclient.ticker24hr("", symbols);
      return data;
    },
    symbols: async (parent, { symbols }: { symbols: string[] }) => {
      if (symbols && symbols.length > 0) {
        return (await oclient.ticker24hr("", symbols)).data;
      }
      return (await oclient.ticker24hr()).data;
    },
    news: async (parent, { nextPage }) => {
      const cached = newsCache[nextPage || 0];
      if (cached) return cached;
      // Fetch if no cache
      let url =
        "https://newsdata.io/api/1/news?apikey=pub_394997602ee65c4a146b37046655c30c98f8a&language=en&q=crypto";
      if (nextPage) url += `&page=${nextPage}`;
      const response = await fetch(url);
      const json = await response.json();
      newsCache[nextPage || 0] = json;
      return json;
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
          return (variables.symbols as Array<String>).includes(payload.ticker.symbol);
        }
      ),
    },
  },
};

export default resolvers;
