import * as React from "react";
import BottomTab from "@components/BottomTab/BottomTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import * as bottomTabIcons from "@assets/bottomTab";
import Favourites from "./Favourites/Favourites";
import { Dimensions, StatusBar, View } from "react-native";
import { Platform } from "react-native";

const TabNavigator = createBottomTabNavigator();
const windowHeight =
    Platform.OS === "ios"
        ? Dimensions.get("screen").height
        : Dimensions.get("screen").height - (StatusBar?.currentHeight ? StatusBar.currentHeight : 0);

export default function Base() {
    return (
        <View style={{ height: windowHeight }}>
            <TabNavigator.Navigator
                screenOptions={{ headerShown: false, unmountOnBlur: false }}
                tabBar={(props) => <BottomTab {...props} />}
                initialRouteName="Home"
            >
                <TabNavigator.Screen
                    name="Book a Session"
                    component={Home}
                    options={{ tabBarIcon: bottomTabIcons.BookASessionIcon }}
                />
                <TabNavigator.Screen
                    name="Events"
                    component={Favourites}
                    options={{ tabBarIcon: bottomTabIcons.EventsIcon }}
                />
                <TabNavigator.Screen
                    name="Home"
                    component={Home}
                    options={{ tabBarIcon: bottomTabIcons.HomeIcon }}
                />
                <TabNavigator.Screen
                    name="Community"
                    component={Home}
                    options={{ tabBarIcon: bottomTabIcons.CommunityIcon }}
                />
                <TabNavigator.Screen
                    name="Application Screen"
                    component={Home}
                    options={{ tabBarIcon: bottomTabIcons.ApplicationToolsIcon }}
                />
            </TabNavigator.Navigator>
        </View>
    );
}
