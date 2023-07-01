import * as React from "react";
import Svg, { Path } from "react-native-svg";
import Animated from "react-native-reanimated";
import { BottomTabIconSvgProp } from ".";
import BottomTabIconWrapper from "../../utils/BottomTabIconWrapper";

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
            viewBox="0 0 17 20"
        >
            <Path
                d="M12.5 1V5M4.5 1V5M0.5 9H16.5M0.5 5C0.5 4.46957 0.710714 3.96086 1.08579 3.58579C1.46086 3.21071 1.96957 3 2.5 3H14.5C15.0304 3 15.5391 3.21071 15.9142 3.58579C16.2893 3.96086 16.5 4.46957 16.5 5V17C16.5 17.5304 16.2893 18.0391 15.9142 18.4142C15.5391 18.7893 15.0304 19 14.5 19H2.5C1.96957 19 1.46086 18.7893 1.08579 18.4142C0.710714 18.0391 0.5 17.5304 0.5 17V5ZM5.5 15C5.0286 15 4.79289 15 4.64645 14.8536C4.5 14.7071 4.5 14.4714 4.5 14C4.5 13.5286 4.5 13.2929 4.64645 13.1464C4.79289 13 5.0286 13 5.5 13C5.9714 13 6.20711 13 6.35355 13.1464C6.5 13.2929 6.5 13.5286 6.5 14C6.5 14.4714 6.5 14.7071 6.35355 14.8536C6.20711 15 5.9714 15 5.5 15Z"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </AnimatedSvg>
    );
};
export default React.memo(BottomTabIconWrapper(SVGComponent));
