import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import useDisableNavbar from "../../hooks/useDisableNavbar";
import useAppTheme from "../../hooks/useAppTheme";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import CustomText from "../../atoms/CustomText/CustomText";
import OTPTextView from "react-native-otp-textinput";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useAppNavigation from "../../hooks/useAppNavigation";

const RESEND_COUNTDOWN = 10;

export default function OTP() {
  useDisableNavbar();
  const theme = useAppTheme();
  const { navigate } = useAppNavigation();
  const styles = createStyles({ theme });
  const [code, setCode] = useState("1000");
  const [resendCountdown, _setResendCountdown] = useState(RESEND_COUNTDOWN);
  const resendCountdownRef = useRef(RESEND_COUNTDOWN);
  const [failed, setFailed] = useState(false);
  const setResendCountdown = (value: number) => {
    resendCountdownRef.current = value;
    _setResendCountdown(value);
  };
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handleSubmit = () => {
    navigate('Account')
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/otp-graphics.png')} style={styles.image} />
      <CustomText centerText>
        An 5 digit, OTP has sent to your email. Use this code to verify your
        email.
      </CustomText>
      {failed && <CustomText style={{ color: 'red' }}>
        Wrong OTP!
      </CustomText>}
        <OTPTextView
          inputCount={5}
          handleTextChange={(text) => setCode(text)}
          tintColor={theme.colors.primary}
        />
      <PrimaryButton text="Submit" color="primary" style={{ width: 200 }} onPress={handleSubmit}  />
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
