import { baseSlice, store } from "@redux_store/store";
import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { useDispatch } from "react-redux";

const { toggleTheme } = baseSlice.actions;

function Favourites() {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            <Text>Favourites</Text>
            <Pressable
                style={{
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "black",
                    padding: 4,
                    borderRadius: 10,
                }}
                onPress={() => {
                    dispatch(toggleTheme());
                }}
            >
                <Text>click me</Text>
            </Pressable>
        </View>
    );
}

export default Favourites;
