import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import CustomText from "../CustomText/CustomText";
import useAppTheme from "../../hooks/useAppTheme";

export default function InputPrimary({
  label,
  containerStyle,
  inputStyle,
  ...props
}: PropTypes.InputPrimary) {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <CustomText style={styles.labelStyle} variant="300">{label}</CustomText>}
      <TextInput
        {...props}
        style={[styles.textStyle, inputStyle]}
      />
    </View>
  );
}

const createStyles = ({ theme }: Config.ThemedStyle) => {
  return StyleSheet.create({
    container: {
      gap: 6
    },
    labelStyle: {
      fontSize: 16,
    },
    textStyle: {
      padding: 15,
      borderColor: theme.colors.primaryGray,
      borderWidth: 1,
      borderRadius: 3,
      color: theme.colors.text
    }
  });
};
