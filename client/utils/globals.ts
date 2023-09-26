// global variables for the application

import Constants from "expo-constants";
const { manifest } = Constants;

let deviceHost = "192.168.241.177";

export const development: boolean = Boolean(manifest?.packagerOpts?.dev);

export let domain = development ? `${manifest?.debuggerHost?.split(":").shift()}:4000` : "api.example.com";

if (development) {
    let generatedHost = manifest?.debuggerHost?.split(":").shift();
    if (generatedHost?.slice(0, 3) !== "127") {
        domain = generatedHost + ":4000";
    } else {
        domain = deviceHost + ":19000";
    }
}

export type Ticker = {
    open: string;
    symbol: string;
};
