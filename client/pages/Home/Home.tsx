import * as React from "react";
import { View, ScrollView } from "react-native";
import HomeStyles from "./HomeStyles";
import useStyles from "@custom_hooks/useStyles";
import TextInput from "@components/TextInput/TextInput";
import SearchIcon from "@assets/icons/search_icon.svg";
import DrawerToggle from "@components/Drawer/DrawerToggle";

export default function Home() {
    const styles = useStyles(HomeStyles);

    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <TextInput icon={<SearchIcon width={20} height={20} />} />
                <DrawerToggle />
            </View>
        </ScrollView>
    );
}
