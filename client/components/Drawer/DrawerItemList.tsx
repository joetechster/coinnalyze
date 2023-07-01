import * as React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View } from "react-native";

function DrawerItemList({ state, descriptors }: DrawerContentComponentProps) {
    const Tabs = React.useMemo(() => {
        return state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const focused = state.index === index;
            return {
                name: route.name,
                isFocused: focused,
            };
        });
    }, [state, descriptors]);

    return <View></View>;
}

export default DrawerItemList;
