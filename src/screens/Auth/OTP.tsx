import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useDisableNavbar from "../../hooks/useDisableNavbar";
import useAppTheme from "../../hooks/useAppTheme";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import CustomText from "../../atoms/CustomText/CustomText";
import OTPTextView from "react-native-otp-textinput";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useAppNavigation from "../../hooks/useAppNavigation";
import { verifyEmail } from "../../redux/slices/auth/auth";

const RESEND_COUNTDOWN = 10;

export default function OTP() {
  useDisableNavbar();
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  const styles = createStyles({ theme });
  const [code, setCode] = useState("");
  const [resendCountdown, _setResendCountdown] = useState(RESEND_COUNTDOWN);
  const resendCountdownRef = useRef(RESEND_COUNTDOWN);
  const [failed, setFailed] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  
  const setResendCountdown = (value: number) => {
    resendCountdownRef.current = value;
    _setResendCountdown(value);
  };
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const registerResponse = useAppSelector(state => state.auth.registerResponse)

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

  const handleResend = () => {
    setResendCountdown(RESEND_COUNTDOWN);
    countdownRef.current = setInterval(() => {
      if (resendCountdown !== 0) {
        setResendCountdown(resendCountdown - 1);
      }
    }, 100);
  };

  const handleSubmit = async () => {
    setSubmitLoading(false);
    const body = {
      email: registerResponse?.email as string,
      otp: code
    }
    try {
      await dispatch(verifyEmail(body)).unwrap();
      navigate("Account")
    } catch (error) {
      console.log("ERROR", error)
      setFailed(true);
    }
    setSubmitLoading(false);
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/otp-graphics.png')} style={styles.image} />
      <CustomText centerText>
        An 5 digit, OTP has sent to your email. Use this code to verify your
        email.
      </CustomText>
      {failed && <CustomText style={{ color: theme.colors.error }}>
        Wrong OTP!
      </CustomText>}
        <OTPTextView
          inputCount={6}
          handleTextChange={(text) => setCode(text)}
          tintColor={theme.colors.primary}
        />
      <PrimaryButton text="Submit" color="primary" style={{ width: 200 }} onPress={handleSubmit} loading={submitLoading}  />
      {resendCountdown !== 0 ? (
        <View>
          <CustomText>{`Resend OTP within 00:${resendCountdown} seconds`}</CustomText>
        </View>
      ) : (
        <View style={styles.hint}>
          <CustomText>Didn't get the OTP? </CustomText>
          <CustomText linkStyle={true}>Resend</CustomText>
        </View>
      )}
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 50,
      gap: 30,
      backgroundColor: 'white'
    },
    image: {
      width: 300,
      height: 200,
      objectFit: 'scale-down'
    },
    hint: {
      flexDirection: 'row'
    }
  });
};
