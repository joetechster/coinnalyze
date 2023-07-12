import useIconAnimation from "@custom_hooks/useIconAnimation";
import * as React from "react";
import { View } from "react-native";
import { updateIconDimensions } from "../../utils/updateIconDimensions";
import { BottomTabIconSvgProp } from "../../assets/bottomTab";
import { withSpring } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { selectTranslateX, selectWidth } from "@redux_schema/bottomTab/bottomTabSlice";

export type BottomTabIconProps = {
    focused: boolean;
    inActiveCase: boolean;
} & BottomTabIconSvgProp;

function BottomTabIconWrapper(BottomTabIconSvg: React.FC<BottomTabIconSvgProp>) {
    return function (props: BottomTabIconProps) {
        const ref = React.useRef<View>(null);
        const [iconDimensions, setIconDimensions] = React.useState<{ pageX: number; width: number }>({
            pageX: 0,
            width: 0,
        });
        const width = useSelector(selectWidth);
        const sharedTranslateX = useSelector(selectTranslateX);

        React.useEffect(() => {
            // If the current icon is focused update the translate shared value
            if (props.focused) {
                let translateX = iconDimensions.pageX + iconDimensions.width / 2 - width / 2;
                if (sharedTranslateX)
                    sharedTranslateX.value = withSpring(translateX, { damping: 11, velocity: 1 });
            }
        }, [iconDimensions, props.focused]);
        const animatedProps = useIconAnimation(props);

        return (
            <View
                ref={ref}
                onLayout={() => {
                    if (!props.inActiveCase) updateIconDimensions(ref, setIconDimensions);
                }}
            >
                <BottomTabIconSvg
                    animatedProps={animatedProps}
                    stroke={props.stroke}
                    strokeWidth={props.strokeWidth}
                    width={props.width}
                    height={props.height}
                    fill={props.fill}
                    entering={props.entering}
                    exiting={props.exiting}
                />
            </View>
        );
    };
}

export default BottomTabIconWrapper;
