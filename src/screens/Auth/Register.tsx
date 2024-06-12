import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";
import { setTopNavigationEnabled } from "../../redux/slices/header";
import {
  BackgroundDesignBlock,
  HomeIcon,
  LogoWithText,
} from "../../assets/Icons";
import { useTheme } from "react-native-paper";
import { ScreenContainer } from "../../components";
import InputPrimary from "../../atoms/Input/InputPrimary";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import CustomText from "../../atoms/CustomText/CustomText";
import { useIsFocused } from "@react-navigation/native";
import { register } from "../../redux/slices/auth/auth";
import { axiosExternal } from "../../axios/axios";

export default function Register() {
  const screenFoncused = useIsFocused();
  const { navigate } = useAppNavigation();
  const dispatch = useAppDispatch();
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [failed, setFailed] = useState(false);
  const [errorData, setErrorData] = useState<{
    email: Array<string>;
    phone: Array<string>;
  }>();

  useEffect(() => {
    if (screenFoncused) {
      dispatch(setTopNavigationEnabled(false));
    }
  }, [screenFoncused]);

  const handleInput = (name: string, value: string) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    setSubmitLoading(true);
    const body = {
      ...input,
      password_confirmation: input.password,
    };
    try {
      const res = await dispatch(register(body)).unwrap();
      console.log("Data", JSON.stringify(res));
      navigate("OTP");
    } catch (error: any) {
      console.log("Error", error);
      setErrorData(error?.error);
    }
    setSubmitLoading(false);
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
              Register
            </CustomText>
            <View style={styles.loginHintContainer}>
              <CustomText variant="300">Already have an acconut?</CustomText>
              <CustomText
                variant="300"
                style={styles.registerNowLink}
                onPress={() => navigate("Login")}
              >
                Login Here
              </CustomText>
            </View>
          </View>
          <View style={styles.loginContainer}>
            <InputPrimary
              label="Name"
              placeholder="Full Name"
              value={input.name}
              onChangeText={(text) => handleInput("name", text)}
            />
            <InputPrimary
              autoCapitalize="none"
              label="Email"
              placeholder="example@gmail.com"
              value={input.email}
              onChangeText={(text) => handleInput("email", text)}
            />
            {errorData?.email && (
              <CustomText style={{ color: theme.colors.error }}>
                {errorData.email.map((item) => item).join(", ")}
              </CustomText>
            )}
            <InputPrimary
              label="Phone"
              placeholder="017xxxxxxxx"
              value={input.phone}
              onChangeText={(text) => handleInput("phone", text)}
            />
            {errorData?.phone && (
              <CustomText style={{ color: theme.colors.error }}>
                {errorData.phone.map((item) => item).join(", ")}
              </CustomText>
            )}
            <InputPrimary
              secureTextEntry={true}
              label="Password"
              value={input.password}
              onChangeText={(text) => handleInput("password", text)}
            />
            <PrimaryButton
              loading={submitLoading}
              text="Register"
              color="primary"
              onPress={onSubmit}
            />
          </View>
        </View>
        <PrimaryButton
          style={styles.backToHomeButton}
          //   color="secondary"
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
  });
};
