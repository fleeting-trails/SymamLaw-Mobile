import React, { useState, useEffect } from "react";
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
import { setDarkTheme } from "../redux/slices/config";
import { Appearance, NativeEventEmitter, NativeModules } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { fetchUserProfile } from "../redux/slices/auth/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { listRecommendedExams } from "../redux/slices/exam/examSlice";
import { initializeCheckout, resetCart } from "../redux/slices/checkout/checkoutSlice";

function useInitialize() {
  // const eventEmitter = new NativeEventEmitter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [loadingBySection, setLoadingBySection] = useState({
    fonts: true,
    user: true,
    recommendedExams: true,
  });
  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    if (
      !loadingBySection.fonts &&
      !loadingBySection.user &&
      !loadingBySection.recommendedExams
    ) {
      setLoading(false);
    }
  }, [loadingBySection]);

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
    return EventRegister.addEventListener("token-expired", (data) => {
      console.log("Testing Event rn");
    });
  };
  const initializeUser = async () => {
    try {
      await dispatch(fetchUserProfile()).unwrap();
    } catch (error) {
      console.log("Failed to load users profile", error);
    }
    setLoadingBySection((prevState) => ({
      ...prevState,
      user: false,
    }));
  };
  const initializeRecommendedExams = async () => {
    try {
      await dispatch(listRecommendedExams()).unwrap();
    } catch (error) {
      console.log("Failed to load recommended exams", error);
    }
    setLoadingBySection((prevState) => ({
      ...prevState,
      recommendedExams: false,
    }));
  };

  const initializeCart = async () => {
    try {
      dispatch(initializeCheckout())
    } catch (error) {
      console.log("Failed while initializing cart", error);
    }
  }

  useEffect(() => {
    dispatch(setDarkTheme(colorScheme !== "light"));
    Appearance.addChangeListener(({ colorScheme }) =>
      console.log("New color scheme", colorScheme)
    );
    const logoutListener = initializeAuthExpirationListener();

    initializeUser();
    return () => {
      EventRegister.removeEventListener(logoutListener as string);
    };
  }, []);

  useEffect(() => {
    if (user) {
      initializeRecommendedExams();
      initializeCart();
    } else if (!user && !loadingBySection.user) {
      setLoadingBySection((prevState) => ({
        ...prevState,
        recommendedExams: false,
      }));
    }
  }, [user, loadingBySection.user])
  useEffect(() => {
    if (fontError) console.log("Failed to load fonts", fontError);
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) console.log("Fonts loaded");
  }, [fontsLoaded]);

  // Generate loading state combined with all other loading
  useEffect(() => {
    if (fontsLoaded) {
      // setLoading(false);
      setLoadingBySection((prevState) => ({
        ...prevState,
        fonts: false,
      }));
    }
  }, [fontsLoaded]);

  return { loading };
}

export default useInitialize;
