import { screenPaddingHorizontal } from "@styles/global";
import themes, { ThemeKeys } from "@styles/themes";
import { TextStyle, ViewStyle, ImageStyle, ColorValue } from "react-native";

const fontsize = {
    price: 22,
    percentageChange: 16,
    name: 25,
    description: 15,
};

interface TickerStylesType {
    container: ViewStyle;
    image: ImageStyle;
    name: TextStyle;
    description: TextStyle;
    nameWrapper: ViewStyle;
    price: TextStyle;
    percentageChange: TextStyle;
    priceWrapper: ViewStyle;
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
        image: {
            width: 40,
            height: 40,
            alignSelf: "center",
        },
        name: {
            fontSize: fontsize.name - 5,
            borderRadius: 5,
            marginTop: "auto",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: themes[theme].color,
        },
        description: {
            fontSize: fontsize.description,
            borderRadius: 5,
            color: themes[theme].color,
            opacity: 0.7,
            width: "100%",
        },
        nameWrapper: { width: "45%" },
        price: {
            marginLeft: "auto",
            fontSize: fontsize.price - 3,
            borderRadius: 5,
            marginTop: "auto",
            fontWeight: "bold",
            color: themes[theme].color,
        },
        percentageChange: {
            marginLeft: "auto",
            fontSize: fontsize.percentageChange,
            borderRadius: 5,
            color: themes[theme].color,
        },
        priceWrapper: { marginLeft: "auto", flex: 1 },
    };
    return styles;
}

interface TickerLoadingStylesType {
    container: ViewStyle;
    image: ViewStyle;
    name: ViewStyle;
    description: ViewStyle;
    nameWrapper: ViewStyle;
    price: ViewStyle;
    percentageChange: ViewStyle;
    priceWrapper: ViewStyle;
}
export function TickerLoadingStyles(theme: ThemeKeys) {
    const color: ColorValue = themes[theme].loading.backgroundColor;

    const styles: TickerLoadingStylesType = {
        container: {
            ...screenPaddingHorizontal,
            flexDirection: "row",
            gap: 10,
        },
        image: {
            width: 50,
            height: 50,
            backgroundColor: color,
            borderRadius: 5,
        },
        name: {
            height: fontsize.name,
            width: "60%",
            backgroundColor: color,
            borderRadius: 5,
            marginTop: "auto",
        },
        description: {
            height: fontsize.description,
            width: "80%",
            backgroundColor: color,
            borderRadius: 5,
        },
        nameWrapper: { gap: 5, width: "45%" },
        price: {
            marginLeft: "auto",
            height: fontsize.price,
            width: "80%",
            backgroundColor: color,
            borderRadius: 5,
            marginTop: "auto",
        },
        percentageChange: {
            marginLeft: "auto",
            height: fontsize.percentageChange,
            width: "60%",
            backgroundColor: color,
            borderRadius: 5,
        },
        priceWrapper: { marginLeft: "auto", gap: 5, flex: 1 },
    };
    return styles;
}
