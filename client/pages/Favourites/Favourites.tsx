import * as React from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import { baseSlice } from "@redux_store/store";
const { manifest } = Constants;

export const url = manifest?.packagerOpts?.dev
    ? `http://${manifest?.debuggerHost?.split(":").shift()}:4000/graphql`
    : "api.example.com";

function Favourites() {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Favourites</Text>
            <View
                style={{
                    borderRadius: 10,
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "black",
                }}
            >
                <TouchableNativeFeedback
                    onPress={() => {
                        dispatch(baseSlice.actions.toggleTheme());
                    }}
                    background={TouchableNativeFeedback.Ripple("#aaa", true)}
                >
                    <View style={{ flex: 1 }} />
                </TouchableNativeFeedback>
            </View>
        </View>
    );
}

export default Favourites;
