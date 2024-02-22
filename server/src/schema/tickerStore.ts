import { Ticker } from "binance-api-node";

type tickerStore = {
    [key in string]: Ticker;
};
type tickerSubscriber = {
    id: string;
    symbols: string[];
};

export default class TickerStore {
    store: tickerStore;
    subscribers: tickerSubscriber[];

    constructor() {
        this.store = {};
        this.subscribers = [];
    }

    getTickers = (symbols: string[]) => {
        return symbols
            .map((symbol) => this.store[symbol])
            .filter((ticker) => Boolean(ticker));
    };

    addTickers = (tickers: Ticker[]) => {
        tickers.forEach((ticker) => (this.store[ticker.symbol] = ticker));
    };

    addSubscriber = (symbols: string[]) => {
        const id = Math.random().toString(36).slice(2);
        this.subscribers.push({ id, symbols });
        return id;
    };

    publish = (pubsub) => {
        this.subscribers.forEach((subscriber) => {
            let tickers = this.getTickers(subscriber.symbols);
            if (tickers.length > 0) {
                pubsub.publish(subscriber.id, { tickers });
            }
        });
    };
}
