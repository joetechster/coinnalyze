import { screenPaddingHorizontal } from "@styles/global";
import themes, { ThemeKeys } from "@styles/themes";
import { TextStyle, ViewStyle, ImageStyle } from "react-native";

interface TickerStylesType {
    container: ViewStyle;
    text: TextStyle;
    icon: ImageStyle;
}
export default function TickerStyles(theme: ThemeKeys) {
    const styles: TickerStylesType = {
        container: {
            ...screenPaddingHorizontal,
            flex: 1,
            flexDirection: "row",
            gap: 10,
            paddingVertical: 10,
        },
        text: {
            alignSelf: "flex-end",
            color: themes[theme].color,
        },
        icon: {},
    };
    return styles;
}
