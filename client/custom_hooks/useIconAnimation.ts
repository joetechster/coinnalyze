import { useAnimatedProps, withTiming } from "react-native-reanimated";

export default function useIconAnimation({ height, focused }: any) {
    const animatedProps = useAnimatedProps((): Partial<{ translateY: number; opacity: number }> => {
        return focused
            ? {
                  translateY: withTiming(height),
                  opacity: withTiming(0),
              }
            : {
                  translateY: withTiming(0),
                  opacity: withTiming(1),
              };
    }, [focused]);
    return animatedProps;
}
