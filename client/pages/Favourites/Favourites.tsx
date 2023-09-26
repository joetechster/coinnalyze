import * as React from "react";
import { Text, View, TouchableNativeFeedback } from "react-native";
import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import LoadingSuspense from "@components/LoadingSuspense";
import { useDispatch } from "react-redux";
import { toggleTheme } from "@redux_schema/theme/themeSlice";
import { domain } from "@utils/globals";

const GET_USERS = gql`
    query {
        users {
            name
        }
    }
`;
const USER_SUBSCRIPTION = gql`
    subscription {
        newUser {
            name
        }
    }
`;
const CREATE_USER = gql`
    mutation {
        addUser(name: "Joeseph") {
            name
        }
    }
`;
type User = {
    name: string;
};

function Favourites() {
    const dispatch = useDispatch();
    // const [createUser, { error, data: newUserData }] = useMutation(CREATE_USER);
    const { data, loading, error } = useSubscription(USER_SUBSCRIPTION);

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
