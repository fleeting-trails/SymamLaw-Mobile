import AsyncStorage from "@react-native-async-storage/async-storage";

export function createAuthCredentials () {
    AsyncStorage.removeItem("token")
}