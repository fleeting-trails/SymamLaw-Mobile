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

function useInitialize() {
    const [loading, setLoading] = useState(true);
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