import { activeCaseType } from "@components/BottomTab/BottomTab";
import useIconAnimation from "@custom_hooks/useIconAnimation";
import * as React from "react";
import { View } from "react-native";
import { updateIconDimensions } from "./updateIconDimensions";
import { BottomTabIconSvgProp } from "../assets/bottomTab";
import { withSpring } from "react-native-reanimated";

export type BottomTabIconProps = {
    focused: boolean;
    inActiveCase: boolean;
    activeCase: activeCaseType;
} & BottomTabIconSvgProp;

function BottomTabIconWrapper(BottomTabIconSvg: React.FC<BottomTabIconSvgProp>) {
    return function (props: BottomTabIconProps) {
        const ref = React.useRef<View>(null);
        const [iconDimensions, setIconDimensions] = React.useState<{ pageX: number; width: number }>({
            pageX: 0,
            width: 0,
        });
        React.useEffect(() => {
            if (props.focused) {
                let translateX = iconDimensions.pageX + iconDimensions.width / 2 - props.activeCase.width / 2;
                props.activeCase.translateX!.value = withSpring(translateX, { damping: 11, velocity: 1 });
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
