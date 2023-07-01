import * as React from "react";
import { TouchableOpacity } from "react-native";
import SearchIcon from "@assets/icons/search_icon.svg";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function DrawerToggle() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                padding: 10,
            }}
            onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
            }}
        >
            <SearchIcon />
        </TouchableOpacity>
    );
}
