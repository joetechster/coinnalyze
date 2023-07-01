import { TouchableNativeFeedback, View, StyleProp, ViewStyle } from "react-native";

interface Props {
    children: any;
    onPress: () => any;
    style: StyleProp<ViewStyle>;
}

function RippleTouchable({ onPress, children, style }: Props) {
    return (
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple("#FF0000", false, 100)}
        >
            <View style={style}>{children}</View>
        </TouchableNativeFeedback>
    );
}

export default RippleTouchable;
