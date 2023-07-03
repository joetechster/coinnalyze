import { setRootViewBackgroundColor } from "@pnthach95/react-native-root-view-background";
import { selectTheme } from "@redux_store/selectors";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import themes from "@styles/themes";

export default function useRootBackgroundColor() {
    const theme = useSelector(selectTheme);

    useEffect(() => {
        try {
            setRootViewBackgroundColor(themes[theme].backgroundColor);
        } catch (err) {
            console.error(err);
        }
    }, [theme]);
}
