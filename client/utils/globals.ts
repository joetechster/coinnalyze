import Constants from "expo-constants";
const { manifest } = Constants;

export const domain = manifest?.packagerOpts?.dev
    ? `${manifest?.debuggerHost?.split(":").shift()}:4000`
    : "api.example.com";

export type Ticker = {
    open: string;
    symbol: string;
};
