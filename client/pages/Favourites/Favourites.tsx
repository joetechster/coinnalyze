import * as React from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import Constants from "expo-constants";
const { manifest } = Constants;

export const url = manifest?.packagerOpts?.dev
    ? `http://${manifest?.debuggerHost?.split(":").shift()}:4000/graphql`
    : "api.example.com";

function Favourites() {
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
                        console.log(url);
                        fetch(url)
                            .then((res) => res.json())
                            .then((data) => {
                                console.log("successful");
                                console.log(data);
                            })
                            .catch((err) => {
                                console.log("error occured");
                                console.error(err);
                            });
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
