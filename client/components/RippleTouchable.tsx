import { selectTheme } from "@redux_schema/theme/themeSlice";
import themes, { ThemeKeys } from "@styles/themes";
import { TouchableNativeFeedback, View, StyleProp, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

interface Props {
    children: any;
    onPress?: () => any;
    style?: StyleProp<ViewStyle>;
    onLongPress?: () => any;
}

function RippleTouchable({ onPress, children, onLongPress }: Props) {
    const theme = useSelector(selectTheme);

    return (
        <TouchableNativeFeedback
            onPress={onPress}
            onLongPress={onLongPress}
            background={TouchableNativeFeedback.Ripple(theme === ThemeKeys.Dark ? "#666" : "aaa", false)}
        >
            {children}
        </TouchableNativeFeedback>
    );
}

export default RippleTouchable;
