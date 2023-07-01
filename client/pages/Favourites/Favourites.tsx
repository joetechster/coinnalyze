import { baseSlice, store } from "@redux_store/store";
import * as React from "react";
import { Text, View, Pressable, TouchableNativeFeedback } from "react-native";
import { useDispatch } from "react-redux";

const { toggleTheme } = baseSlice.actions;

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
                        dispatch(toggleTheme());
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
