import * as React from "react";
import { View } from "react-native";
import useStyles from "../../custom_hooks/useStyles";
import BottomTabStyles from "./BottomTabStyles";
import BottomTabSvg from "./BottomTabSvg";
import Animated, { useAnimatedStyle, useSharedValue, FadeInDown, FadeOutDown } from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import BottomTabItemList from "./BottomTabItemList";
import { BottomTabIconProps } from "@components/BottomTab/BottomTabIconWrapper";
import { useDispatch, useSelector } from "react-redux";
import { init, selectTranslateX } from "@redux_schema/bottomTab/bottomTabSlice";

function useTabTranslate() {
    const initialSharedValue = useSharedValue(0);
    const dispatch = useDispatch();
    let translateValue = useSelector(selectTranslateX);

    React.useLayoutEffect(() => {
        dispatch(init({ translateX: initialSharedValue }));
    }, []);
    return translateValue;
}

export default function BottomTab({ state, descriptors, navigation }: BottomTabBarProps) {
    const styles = useStyles(BottomTabStyles);
    const translateX = useTabTranslate();

    const Tabs = React.useMemo(() => {
        let activeIcon: React.FC<BottomTabIconProps>;
        return {
            list: state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const focused = state.index === index;
                if (focused) activeIcon = options.tabBarIcon as unknown as typeof activeIcon;
                return {
                    name: route.name,
                    isFocused: focused,
                    Icon: options.tabBarIcon,
                };
            }),
            activeIcon: activeIcon!,
        };
    }, [state, descriptors]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX ? translateX.value : 0 }, { translateY: -30 }],
        };
    });

    return (
        <View style={styles.container}>
            <BottomTabSvg height={55} />
            <Animated.View style={[styles.activeIconCase, animatedStyle]}>
                <Tabs.activeIcon
                    inActiveCase={true}
                    focused={false}
                    fill={styles.activeIcon.backgroundColor}
                    stroke={styles.activeIcon.borderColor}
                    width={25}
                    height={25}
                    strokeWidth={1}
                    entering={FadeInDown}
                    exiting={FadeOutDown.duration(200)}
                />
            </Animated.View>
            <BottomTabItemList navigation={navigation} Tabs={Tabs} />
        </View>
    );
}
