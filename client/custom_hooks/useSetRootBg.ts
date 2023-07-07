import { selectTheme } from "@redux_store/selectors";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import * as SystemUI from "expo-system-ui";
import themes from "@styles/themes";

export default function useSetRootBg() {
    const theme = useSelector(selectTheme);
    useEffect(() => {
        // SystemUI.setBackgroundColorAsync(themes[theme].backgroundColor);
    }, [theme]);
}
