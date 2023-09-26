import themes, { ThemeKeys } from "../../styles/themes";
import { StyleType } from "../../custom_hooks/useStyles";
import { screenPaddingHorizontal } from "../../styles/global";
import { ViewStyle, TextStyle } from "react-native";

interface HomeStyleType {
    container: ViewStyle;
    button: StyleType;
    text: TextStyle;
    searchInput: ViewStyle;
}

export default function HomeStyles(theme: ThemeKeys) {
    const styles: HomeStyleType = {
        container: {
            flex: 1,
            backgroundColor: themes[theme].backgroundColor,
            marginTop: "auto",
            gap: 10,
        },
        button: {
            fontWeight: "bold",
            textTransform: "capitalize",
            color: themes[theme].color,
            alignSelf: "flex-end",
        },
        text: {
            color: themes[theme].color,
            fontSize: 30,
        },
        searchInput: {
            ...screenPaddingHorizontal,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
    };
    return styles;
}
