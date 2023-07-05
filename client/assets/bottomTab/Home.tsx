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
            viewBox="0 0 20 20"
        >
            <Path
                d="M7 18.3221H5C3.93913 18.3221 2.92172 17.9007 2.17157 17.1505C1.42143 16.4004 1 15.3829 1 14.3221V8.03008C0.999986 7.3423 1.17732 6.66613 1.51487 6.06688C1.85242 5.46762 2.33879 4.96553 2.927 4.60908L7.927 1.57908C8.55211 1.20028 9.26907 1 10 1C10.7309 1 11.4479 1.20028 12.073 1.57908L17.073 4.60908C17.6611 4.96544 18.1473 5.46737 18.4849 6.06644C18.8224 6.6655 18.9998 7.34147 19 8.02908V14.3221C19 15.3829 18.5786 16.4004 17.8284 17.1505C17.0783 17.9007 16.0609 18.3221 15 18.3221H13M7 18.3221V14.3221C7 13.5264 7.31607 12.7634 7.87868 12.2008C8.44129 11.6382 9.20435 11.3221 10 11.3221C10.7956 11.3221 11.5587 11.6382 12.1213 12.2008C12.6839 12.7634 13 13.5264 13 14.3221V18.3221M7 18.3221H13"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </AnimatedSvg>
    );
};
export default React.memo(BottomTabIconWrapper(SVGComponent));
