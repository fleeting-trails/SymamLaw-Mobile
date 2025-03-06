import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";
import { setTopNavigationEnabled } from "../../redux/slices/header";
import {
  BackgroundDesignBlock,
  FacebookIcon,
  GoogleIcon,
  HomeIcon,
  LogoWithText,
} from "../../assets/Icons";
import { useTheme, Divider } from "react-native-paper";
import { ScreenContainer } from "../../components";
import InputPrimary from "../../atoms/Input/InputPrimary";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import CustomText from "../../atoms/CustomText/CustomText";
import { useIsFocused } from "@react-navigation/native";

import { firebaseApp, auth } from "../../firebase/config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { login } from "../../redux/slices/auth/auth";

export default function Login() {
  const screenFoncused = useIsFocused();
  const { navigate } = useAppNavigation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const loginLoading = authState.loading.login;
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });
  // const [request, response, prompAsync] = Google.useAuthRequest({
  //   // clientId: '439529637268-idtchlgch2mgv92ep26900pn62agitd7.apps.googleusercontent.com',
  //   // clientSecret: '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',
  //   iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
  //   androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
  //   // redirectUri: 'https://symamlaw-de958.firebaseapp.com/__/auth/handler',
  //   // redirectUri: AuthSession.makeRedirectUri(),
  //   // scopes: ['profile', 'email']
  // });

  WebBrowser.maybeCompleteAuthSession();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (screenFoncused) {
      dispatch(setTopNavigationEnabled(false));
    }
  }, [screenFoncused]);

  // useEffect(() => {
  //   if (response?.type == "success") {
  //     const { id_token } = response.params;
  //     const credentials = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credentials);
  //   } else {
  //     console.log("Response", JSON.stringify(response));
  //   }
  // }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User exists");
      } else {
        console.log("No User");
      }
    });

    return () => unsub();
  }, []);

  const handleLogin = async () => {
    if (!input.email || !input.password) {
      setErrorMessage("Please fillup both email and password field");
      return;
    }
    const body = {
      user_input: input.email,
      password: input.password,
    };

    try {
      const res = await dispatch(login(body)).unwrap();
      navigate("HomeTabs");
    } catch (error: any) {
      console.log("ERROR", JSON.stringify(error));
      setErrorMessage(error?.error as string);
    }
  };
  const handleInput = (key: "email" | "password", value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.backgroundDesignBlock1}>
        <BackgroundDesignBlock />
      </View>
      <View style={styles.backgroundDesignBlock2}>
        <BackgroundDesignBlock />
      </View>

      <View style={styles.container}>
        <LogoWithText
          color={theme.colors.primary}
          secondaryColor={theme.colors.primaryLight[0]}
        />
        <View style={styles.contentContainer}>
          <View>
            <CustomText style={styles.loginLabel} variant="800">
              Login
            </CustomText>
            <View style={styles.loginHintContainer}>
              <CustomText variant="300">Don't have an acconut?</CustomText>
              <CustomText
                variant="300"
                style={styles.registerNowLink}
                onPress={() => navigate("Register")}
              >
                Register Here
              </CustomText>
            </View>
          </View>
          <View style={styles.loginContainer}>
            <InputPrimary
              autoCapitalize="none"
              label="Email"
              placeholder="example@gmail.com"
              value={input.email}
              onChangeText={(text) => handleInput("email", text)}
            />
            <InputPrimary
              secureTextEntry
              label="Password"
              value={input.password}
              onChangeText={(text) => handleInput("password", text)}
            />
            <PrimaryButton
              text={!loginLoading ? "Login" : "Logging In..."}
              color="primary"
              onPress={handleLogin}
              loading={loginLoading}
            />
            {errorMessage && (
              <CustomText style={{ color: theme.colors.error }}>
                {errorMessage}
              </CustomText>
            )}
            <CustomText
              style={styles.registerNowLink}
              onPress={() => navigate("ForgetPassword")}
            >
              Forgot Password
            </CustomText>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <CustomText
              variant="600"
              style={{ color: theme.colors.primaryGray }}
            >
              Or Login With
            </CustomText>
            <View style={styles.divider} />
          </View>

          {/* <PrimaryButton
            text="Google"
            icon={<GoogleIcon />}
            color="#DB4437"
            lightText={true}
            onPress={() => prompAsync()}
          />
          <PrimaryButton
            text="Facebook"
            icon={<FacebookIcon />}
            color="#4267B2"
            lightText={true}
          /> */}
        </View>
        <PrimaryButton
          style={styles.backToHomeButton}
          // color="secondary"
          text="Back To Home"
          icon={<HomeIcon />}
          onPress={() => {
            navigate("HomeTabs");
          }}
        />
      </View>
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backgroundDesignBlock1: {
      position: "absolute",
      right: -40,
      top: 140,
    },
    backgroundDesignBlock2: {
      position: "absolute",
      left: -40,
      top: 540,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: 40,
    },
    contentContainer: {
      width: "100%",
      gap: 10,
    },
    loginContainer: {
      gap: 12,
    },
    backToHomeButton: {
      marginTop: 30,
    },
    loginLabel: {
      fontSize: 24,
    },
    loginHintContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 5,
    },
    registerNowLink: {
      color: theme.colors.primaryLight[1],
      borderBottomColor: theme.colors.primaryLight[1],
      borderBottomWidth: 1,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 18,
      marginVertical: 30,
    },
    divider: {
      height: 1,
      flex: 1,
      backgroundColor: theme.colors.primaryGray,
    },
  });
};
