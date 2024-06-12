import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import { BackIcon, BackgroundDesignBlock } from "../../assets/Icons";
import { LogoWithText } from "../../assets/Icons";
import InputPrimary from "../../atoms/Input/InputPrimary";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import CustomText from "../../atoms/CustomText/CustomText";
import useAppNavigation from "../../hooks/useAppNavigation";
import useDisableNavbar from "../../hooks/useDisableNavbar";
import { useAppDispatch } from "../../redux/hooks";
import { forgetPasswordGetOtp } from "../../redux/slices/auth/auth";

export default function ForgetPassword() {
  useDisableNavbar();
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  const [email, setEmail] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const handleSubmit = async () => {
    if (!email) {
        setErrorMessage("Please Enter Email");
    }
    setSubmitLoading(true);
    try {
        await dispatch(forgetPasswordGetOtp({ email })).unwrap();
        navigate("ForgetPasswordOTP", { email });
    } catch (error) {
        setErrorMessage("Something went wrong");
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
      <View>
        <LogoWithText
          style={styles.logoContainer}
          color={theme.colors.primary}
          secondaryColor={theme.colors.primaryLight[0]}
        />
        <View style={styles.formContainer}>
          <InputPrimary
            autoCapitalize="none"
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <PrimaryButton
            text={!submitLoading ? "Next" : "Loading..."}
            color="primary"
            onPress={handleSubmit}
            loading={submitLoading}
          />
          {errorMessage && (
            <CustomText style={{ color: theme.colors.error }}>
              {errorMessage}
            </CustomText>
          )}
        </View>
        <PrimaryButton
          style={styles.backButton}
          // color="secondary"
          text="Back To Login"
          icon={<BackIcon color={theme.colors.textPrimary} />}
          onPress={() => {
            navigate("Login");
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
      width: "100%",
      padding: 40,
      justifyContent: "center",
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
    logoContainer: {
      alignSelf: "center",
    },
    formContainer: {
      gap: 12,
    },
    backButton: {
      marginTop: 30,
    },
  });
};
