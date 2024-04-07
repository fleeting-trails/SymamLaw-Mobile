import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnsEh_wtbXQUKDl5K2p6679w9trd1MaWc",
    authDomain: "symamlaw-de958.firebaseapp.com",
    projectId: "symamlaw-de958",
    storageBucket: "symamlaw-de958.appspot.com",
    messagingSenderId: "439529637268",
    appId: "1:439529637268:web:167fde3429d38b91ad7b81",
    measurementId: "G-LHWY1BMV1X"
};

export const firebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(firebaseApp)
export const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


// IOS: 626239332006-k98sctr0h0233lpbhqmc3fvulnd8c6kh.apps.googleusercontent.com
// Android: 626239332006-n3b6pqgepusum891u9lkg6j6mefq0hm0.apps.googleusercontent.com
