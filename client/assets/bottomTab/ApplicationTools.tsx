import * as React from "react";
import Svg, { Path } from "react-native-svg";
import Animated from "react-native-reanimated";
import BottomTabIconWrapper from "../../components/BottomTabIconWrapper";
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
            viewBox="0 0 21 20"
        >
            <Path
                d="M16.0588 7.88235C17.9593 7.88235 19.5 6.34169 19.5 4.44118C19.5 2.54067 17.9593 1 16.0588 1C14.1583 1 12.6176 2.54067 12.6176 4.44118C12.6176 6.34169 14.1583 7.88235 16.0588 7.88235Z"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
            <Path
                d="M16.0588 19C17.9593 19 19.5 17.4593 19.5 15.5588C19.5 13.6583 17.9593 12.1176 16.0588 12.1176C14.1583 12.1176 12.6176 13.6583 12.6176 15.5588C12.6176 17.4593 14.1583 19 16.0588 19Z"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
            <Path
                d="M4.94118 7.88235C6.84169 7.88235 8.38235 6.34169 8.38235 4.44118C8.38235 2.54067 6.84169 1 4.94118 1C3.04067 1 1.5 2.54067 1.5 4.44118C1.5 6.34169 3.04067 7.88235 4.94118 7.88235Z"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
            <Path
                d="M4.94118 19C6.84169 19 8.38235 17.4593 8.38235 15.5588C8.38235 13.6583 6.84169 12.1176 4.94118 12.1176C3.04067 12.1176 1.5 13.6583 1.5 15.5588C1.5 17.4593 3.04067 19 4.94118 19Z"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
        </AnimatedSvg>
    );
};
export default React.memo(BottomTabIconWrapper(SVGComponent));
