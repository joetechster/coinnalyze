import { StyleType } from "../../custom_hooks/useStyles";
import { paddingWidth } from "../../styles/global";
import themes, { ThemeKeys } from "../../styles/themes";
import { StyleSheet } from "react-native";

interface BottomTabStyleType {
    container: StyleType;
    backDropSvg: StyleType;
    touchable: StyleType;
    text: StyleType;
    itemsWrapper: StyleType;
    icon: StyleType;
    activeIcon: StyleType;
    activeIconCase: StyleType;
}

export default function BottomTabStyles(theme: ThemeKeys) {
    const styles: BottomTabStyleType = {
        container: {
            ...StyleSheet.absoluteFillObject,
            top: undefined,
        },
        touchable: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        text: { color: themes[theme].bottomTab.color },
        itemsWrapper: {
            paddingHorizontal: paddingWidth,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
        },
        backDropSvg: {
            backgroundColor: themes[theme].bottomTab.backgroundColor,
        },
        icon: {
            backgroundColor: themes[theme].bottomTab.icon.backgroundColor,
            borderColor: themes[theme].bottomTab.icon.borderColor,
        },
        activeIcon: {
            backgroundColor: themes[theme].bottomTab.activeIcon.backgroundColor,
            borderColor: themes[theme].bottomTab.activeIcon.borderColor,
        },
        activeIconCase: {
            ...StyleSheet.absoluteFillObject,
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: themes[theme].bottomTab.backgroundColor,
        },
    };
    return styles;
}
