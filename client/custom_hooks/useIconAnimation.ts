import { BottomTabIconProps } from "@components/BottomTab/BottomTabIconWrapper";
import { useAnimatedProps, withTiming } from "react-native-reanimated";

export default function useIconAnimation({ height, focused, inActiveCase }: BottomTabIconProps) {
    const animatedProps = useAnimatedProps((): Partial<{ translateY: number; opacity: number }> => {
        if (inActiveCase) {
            return {
                translateY: 0,
                opacity: 1,
            };
        } else {
            return focused
                ? {
                      translateY: withTiming(height),
                      opacity: withTiming(0),
                  }
                : {
                      translateY: withTiming(0),
                      opacity: withTiming(1),
                  };
        }
    }, [focused]);
    return animatedProps;
}
