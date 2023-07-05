import * as React from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import Constants from "expo-constants";
import { useDispatch } from "react-redux";
import { gql, useQuery } from "@apollo/client";
import LoadingSuspense from "@components/LoadingSuspense";

const GET_USERS = gql`
    query {
        users {
            name
        }
    }
`;
type User = {
    name: string;
};

function Favourites() {
    // const dispatch = useDispatch();
    const { data, loading } = useQuery(GET_USERS);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <LoadingSuspense loading={loading} fallback={<Text>This is loading</Text>}>
                {(data?.users as User[])?.map((user, i) => (
                    <Text key={i}>{user.name}</Text>
                ))}
            </LoadingSuspense>
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
                        // dispatch(baseSlice.actions.toggleTheme());
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
