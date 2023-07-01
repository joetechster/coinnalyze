import * as React from "react";
import useStyles from "../../custom_hooks/useStyles";
import { DrawerContentScrollView, DrawerContentComponentProps } from "@react-navigation/drawer";
import DrawerStyles from "./DrawerStyles";
import { Image, Text, View } from "react-native";
import DrawerToggle from "./DrawerToggle";
import DrawerItemList from "./DrawerItemList";

function Drawer(props: DrawerContentComponentProps) {
    const styles = useStyles(DrawerStyles);

    return (
        <View style={styles.container}>
            <View style={styles.topStrip}>
                <View style={styles.userInfo}>
                    <Image source={require("../../assets/icon.png")} style={styles.profilePicture} />
                    <View style={styles.userNameWrapper}>
                        <Text style={styles.userName} numberOfLines={1}>
                            Bamidele Damilola joseph
                        </Text>
                        <Text style={styles.userEmail} numberOfLines={1}>
                            bamideledamilola3@gmail.com
                        </Text>
                    </View>
                </View>
                <DrawerToggle />
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
}

export default Drawer;
