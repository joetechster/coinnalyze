import * as React from "react";
import Svg, { Path } from "react-native-svg";
import Animated from "react-native-reanimated";
import BottomTabIconWrapper from "../../components/BottomTab/BottomTabIconWrapper";
import { BottomTabIconSvgProp } from ".";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const SVGComponent = (props: BottomTabIconSvgProp) => {
    return (
        <AnimatedSvg
            animatedProps={props.animatedProps}
            fill={props.fill}
            width={props.width}
            height={props.height}
            entering={props.entering}
            exiting={props.exiting}
            viewBox="0 0 16 20"
        >
            <Path
                d="M8.75 1.25H8.25H8H5H4.75H4.25H4C3.27065 1.25 2.57118 1.53973 2.05546 2.05546C1.53973 2.57118 1.25 3.27066 1.25 4V16C1.25 16.7293 1.53973 17.4288 2.05546 17.9445C2.57118 18.4603 3.27065 18.75 4 18.75H12C12.7293 18.75 13.4288 18.4603 13.9445 17.9445C14.4603 17.4288 14.75 16.7294 14.75 16V4C14.75 3.27065 14.4603 2.57118 13.9445 2.05546C13.4288 1.53973 12.7293 1.25 12 1.25H9H8.75Z"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
        </AnimatedSvg>
    );
};
export default React.memo(BottomTabIconWrapper(SVGComponent));
