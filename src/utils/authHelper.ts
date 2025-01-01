import { EventRegister } from 'react-native-event-listeners'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getAuthData() {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await AsyncStorage.getItem('token')
            resolve({ token: token ?? null })
        } catch (error) {
            reject({ error })
        }
    })
}
export function clearLoginData() {
    localStorage.clear();
    sessionStorage.clear();
    // window.location.href = "/login";
    EventRegister.emit('logout', true)
}