import { ThemeKeys } from "@styles/themes";

export type GlobalStateType = {
    user: {
        name: string;
        username: string;
    };
    theme: ThemeKeys;
};
export const GlobalState = {
    user: {
        name: "",
        username: "",
    },
    theme: ThemeKeys.Dark,
};
