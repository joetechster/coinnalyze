import * as React from "react";
import themes, { ThemeKeys } from "../styles/themes";
import { StatusBarStyle } from "react-native/types";

export default function useStatusBarStyle(theme: ThemeKeys) {
    return React.useMemo(() => {
        let prefix: ThemeKeys, background;
        switch (theme) {
            case ThemeKeys.Dark:
                prefix = ThemeKeys.Light;
                break;
            case ThemeKeys.Light:
                prefix = ThemeKeys.Dark;
                break;
        }
        let statusBarTheme: StatusBarStyle = `${prefix}-content`;
        return {
            content: statusBarTheme,
            background: themes[theme].backgroundColor,
        };
    }, [theme]);
}
