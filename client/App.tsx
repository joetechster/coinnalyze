import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "react-native";
import useStatusBarStyle from "@custom_hooks/useStatusBarStyle";
import Base from "@pages/Base";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "@components/Drawer/Drawer";
import { useSelector, Provider } from "react-redux";
import { store } from "@redux_store/store";
import { selectTheme } from "@redux_store/selectors";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import useSetRootBg from "@custom_hooks/useSetRootBg";
import { url } from "@utils/globals";

const DrawerNavigator = createDrawerNavigator();

function App() {
    const theme = useSelector(selectTheme);
    const statusBarTheme = useStatusBarStyle(theme);
    useSetRootBg();

    return (
        <>
            <StatusBar barStyle={statusBarTheme.content} backgroundColor={statusBarTheme.background} />
            <NavigationContainer>
                <DrawerNavigator.Navigator
                    drawerContent={Drawer}
                    screenOptions={{
                        drawerPosition: "right",
                        drawerType: "front",
                        headerShown: false,
                    }}
                >
                    <DrawerNavigator.Screen name="Index" component={Base} />
                </DrawerNavigator.Navigator>
            </NavigationContainer>
        </>
    );
}

// Initialize Apollo Client
const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
});

export default ((App: React.FC) => {
    return () => (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    );
})(App);
