import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useDisableNavbar from "../../hooks/useDisableNavbar";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import OTPTextView from "react-native-otp-textinput";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { useAppDispatch } from "../../redux/hooks";
import { forgetPasswordPostOtp } from "../../redux/slices/auth/auth";
import useAppNavigation from "../../hooks/useAppNavigation";
const RESEND_COUNTDOWN = 10;
export default function ForgetPasswordOTP({ route }: { route: any }) {
  useDisableNavbar();
  const { email } = route.params;
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  const styles = createStyles({ theme });
  const [failedOTP, setFailedOTP] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [code, setCode] = useState("");
  const [input, setInput] = useState({
    password: "",
    password_confirmation: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resendCountdown, _setResendCountdown] = useState(RESEND_COUNTDOWN);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resendCountdownRef = useRef(RESEND_COUNTDOWN);
  const handleSubmit = async () => {
    if (input.password !== input.password_confirmation) {
      setError("Both password doesn't match");
      return;
    }
    setSubmitLoading(true);
    try {
      await dispatch(
        forgetPasswordPostOtp({
          email,
          otp: code,
          password: input.password,
          password_confirmation: input.password_confirmation,
        })
      ).unwrap();
      navigate("Login");
    } catch (error) {
      setError("Something went wrong");
    }
    setSubmitLoading(false);
  };
  const setResendCountdown = (value: number) => {
    resendCountdownRef.current = value;
    _setResendCountdown(value);
  };
  useEffect(() => {
    countdownRef.current = setInterval(() => {
      if (resendCountdownRef.current !== 0) {
        setResendCountdown(resendCountdownRef.current - 1);
      }
    }, 1000);

    if (resendCountdown === 0) {
      clearInterval(countdownRef.current);
    }

    return () => {
      if (countdownRef.current) return clearInterval(countdownRef.current);
    };
  }, []);
  const handleInput = (
    key: "password" | "password_confirmation",
    value: string
  ) => {
    setInput({
      ...input,
      [key]: value,
    });
  };
  return (
    <View style={styles.container}>
      <CustomText centerText>
        An 5 digit, OTP has sent to your email. Enter your OTP here and create
        new password.
      </CustomText>
      {failedOTP && (
        <CustomText style={{ color: theme.colors.error }}>
          Wrong OTP!
        </CustomText>
      )}
      <OTPTextView
        inputCount={6}
        handleTextChange={(text) => setCode(text)}
        tintColor={theme.colors.primary}
        containerStyle={{ alignSelf: "center" }}
      />
      <InputPrimary
        secureTextEntry
        autoCapitalize="none"
        label="Password"
        value={input.password}
        onChangeText={(text) => handleInput("password", text)}
      />
      <InputPrimary
        secureTextEntry
        label="Confirm Password"
        autoCapitalize="none"
        value={input.password_confirmation}
        onChangeText={(text) => handleInput("password_confirmation", text)}
      />
      {error && (
        <CustomText style={{ color: theme.colors.error }}>{error}</CustomText>
      )}
      <PrimaryButton
        text="Submit"
        color="primary"
        style={{ width: 200, alignSelf: "center" }}
        onPress={handleSubmit}
        loading={submitLoading}
      />
      {/* {resendCountdown !== 0 ? (
        <View style={{ alignSelf: 'center' }}>
          <CustomText>{`Resend OTP within 00:${resendCountdown} seconds`}</CustomText>
        </View>
      ) : (
        <View style={styles.hint}>
          <CustomText>Didn't get the OTP? </CustomText>
          <CustomText linkStyle={true}>Resend</CustomText>
        </View>
      )} */}
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      //   alignItems: "center",
      padding: 50,
      gap: 30,
      backgroundColor: "white",
    },
    image: {
      width: 300,
      height: 200,
      objectFit: "scale-down",
    },
    hint: {
      flexDirection: "row",
      alignSelf: "center",
    },
  });
};
