import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useInitialize from "./hooks/useInitialize";
import HomeTabs from "./screens/HomeTabs";

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { loading } = useInitialize();

  useEffect(() => {
    if (!loading) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [loading])
  return (
    appIsReady && <HomeTabs />
  );
}
