import themes, { ThemeKeys } from "../../styles/themes";
import { StyleType } from "../../custom_hooks/useStyles";
import { screenPadding } from "../../styles/global";
import { ViewStyle } from "react-native";

interface HomeStyleType {
    container: ViewStyle;
    button: StyleType;
}

export default function HomeStyles(theme: ThemeKeys) {
    const styles: HomeStyleType = {
        container: {
            ...screenPadding,
            flex: 1,
            backgroundColor: themes[theme].backgroundColor,
            marginTop: "auto",
        },
        button: {
            fontWeight: "bold",
            textTransform: "capitalize",
            color: themes[theme].color,
            alignSelf: "flex-end",
        },
    };
    return styles;
}
