import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Pressable } from "react-native";
import useStyles from "../../custom_hooks/useStyles";
import BottomTabStyles from "./BottomTabStyles";
import { StyleSheet } from "react-native";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { activeCaseType } from "./BottomTab";

interface Props {
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    Tabs: {
        list: {
            name: any;
            isFocused: boolean;
            Icon: ((props: { focused: boolean; color: string; size: number }) => React.ReactNode) | undefined;
        }[];
        activeIcon: any;
    };
    activeCase: activeCaseType;
}

function BottomTabItemList({ navigation, Tabs, activeCase }: Props) {
    const styles = useStyles(BottomTabStyles);

    return (
        <View style={[styles.itemsWrapper, StyleSheet.absoluteFill]}>
            {Tabs.list.map((item: any, index: number) => (
                <TabItem item={item} navigation={navigation} key={index} activeCase={activeCase} />
            ))}
        </View>
    );
}

function TabItem({ item, navigation, activeCase }: any) {
    const styles = useStyles(BottomTabStyles);
    const size = 20;
    return (
        <Pressable onPressIn={() => navigation.navigate(item.name)} style={styles.touchable}>
            <item.Icon
                focused={item.isFocused}
                fill={styles.icon.backgroundColor}
                stroke={styles.icon.borderColor}
                width={size}
                height={size}
                strokeWidth={1}
                activeCase={activeCase}
            />
        </Pressable>
    );
}

export default BottomTabItemList;
