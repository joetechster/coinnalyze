import Constants from "expo-constants";
const { manifest } = Constants;

export const url = manifest?.packagerOpts?.dev
    ? `http://${manifest?.debuggerHost?.split(":").shift()}:4000/graphql`
    : "api.example.com";
