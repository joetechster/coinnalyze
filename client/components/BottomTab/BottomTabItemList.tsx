import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Pressable } from "react-native";
import useStyles from "../../custom_hooks/useStyles";
import BottomTabStyles from "./BottomTabStyles";
import { StyleSheet } from "react-native";
import { DrawerActions, NavigationHelpers, ParamListBase, useNavigation } from "@react-navigation/native";

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
}

function BottomTabItemList({ navigation, Tabs }: Props) {
    const styles = useStyles(BottomTabStyles);

    return (
        <View style={[styles.itemsWrapper, StyleSheet.absoluteFill]}>
            {Tabs.list.map((item: any, index: number) => {
                const last: boolean = index === (Tabs.list as Array<any>).length - 1;
                return <TabItem item={item} navigation={navigation} key={index} last={last} />;
            })}
        </View>
    );
}

function TabItem({ item, navigation, last }: any) {
    const styles = useStyles(BottomTabStyles);
    const size = 20;
    const drawerNavigation = useNavigation();

    function onPressIn() {
        if (last) {
            drawerNavigation.dispatch(DrawerActions.toggleDrawer());
        } else {
            navigation.navigate(item.name);
        }
    }
    return (
        <Pressable onPressIn={onPressIn} style={styles.touchable}>
            <item.Icon
                focused={item.isFocused}
                fill={styles.icon.backgroundColor}
                stroke={styles.icon.borderColor}
                width={size}
                height={size}
                strokeWidth={1}
            />
        </Pressable>
    );
}

export default BottomTabItemList;
