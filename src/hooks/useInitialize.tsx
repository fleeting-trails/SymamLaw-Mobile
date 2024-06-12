import React, { useState, useEffect } from 'react'
import {
    useFonts,
    Rubik_300Light,
    Rubik_300Light_Italic,
    Rubik_400Regular,
    Rubik_400Regular_Italic,
    Rubik_500Medium,
    Rubik_500Medium_Italic,
    Rubik_600SemiBold,
    Rubik_600SemiBold_Italic,
    Rubik_700Bold,
    Rubik_700Bold_Italic,
    Rubik_800ExtraBold,
    Rubik_800ExtraBold_Italic,
    Rubik_900Black,
    Rubik_900Black_Italic,
  } from "@expo-google-fonts/rubik";
import { setDarkTheme } from '../redux/slices/config';
import { Appearance, useColorScheme } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'
import { fetchUserProfile } from '../redux/slices/auth/auth';
import { useAppDispatch } from '../redux/hooks';

function useInitialize() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const colorScheme = Appearance.getColorScheme();
    
    // // Load all fonts
    let [fontsLoaded, fontError] = useFonts({
        Rubik_300Light,
        Rubik_300Light_Italic,
        Rubik_400Regular,
        Rubik_400Regular_Italic,
        Rubik_500Medium,
        Rubik_500Medium_Italic,
        Rubik_600SemiBold,
        Rubik_600SemiBold_Italic,
        Rubik_700Bold,
        Rubik_700Bold_Italic,
        Rubik_800ExtraBold,
        Rubik_800ExtraBold_Italic,
        Rubik_900Black,
        Rubik_900Black_Italic,
    });


    const initializeAuthExpirationListener = () => {
        return EventRegister.addEventListener('myCustomEvent', (data) => {
            console.log("Login session expired, navigate to login page and do necessary cleanups")
        })
    }
    const initializeUser = () => {
        dispatch(fetchUserProfile());
    }
    useEffect(() => {
        console.log("Color scheme", colorScheme)
      dispatch(setDarkTheme(colorScheme !== 'light'))
      Appearance.addChangeListener(({ colorScheme }) => console.log('New color scheme', colorScheme))
      const logoutListener = initializeAuthExpirationListener();

      initializeUser();
      
      return () => {
        EventRegister.removeEventListener(logoutListener as string);
      }
    }, [])
    useEffect(() => {
        if (fontError) console.log("Failed to load fonts", fontError)
    }, [fontError])

    useEffect(() => {
        if (fontsLoaded) console.log("Fonts loaded")
    }, [fontsLoaded])

    // Generate loading state combined with all other loading
    useEffect(() => {
        if (fontsLoaded) {
            setLoading(false)
        }
    }, [fontsLoaded])

    

    return { loading }
}

export default useInitialize