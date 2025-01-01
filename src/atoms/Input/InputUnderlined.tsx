import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import React from "react";
import CustomText from "../CustomText/CustomText";
import useAppTheme from "../../hooks/useAppTheme";

export function InputUnderlined({
  label,
  containerStyle,
  inputStyle,
  numberOfLines = 5,
  multiline,
  ...props
}: PropTypes.InputUnderlined) {
  const theme = useAppTheme();
  const styles = createStyles({ theme, multiline, numberOfLines });
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CustomText style={styles.labelStyle} variant="400">
          {label}
        </CustomText>
      )}
      {!multiline ? (
        <TextInput {...props} style={[styles.textStyle, inputStyle]} />
      ) : (
        <TextInput 
          {...props} 
          style={[styles.textStyle, inputStyle]} 
          numberOfLines={Platform.OS === "ios" ? 1 : numberOfLines}
          multiline={multiline}
        />
      )}
    </View>
  );
}

const createStyles = ({ theme, multiline, numberOfLines }: Config.ThemedStyle) => {
  return StyleSheet.create({
    container: {
      gap: 6,
    },
    labelStyle: {
      fontSize: 14,
      color: theme.colors.primaryGray,
    },
    textStyle: {
      paddingVertical: 6,
      borderBottomColor: theme.colors.primaryGrayLight,
      //   borderWidth: 1,
      borderRadius: 3,
      borderBottomWidth: 1.5,
      color: theme.colors.text,
      ...((multiline && Platform.OS === 'ios') && {
        minHeight: numberOfLines * 20,
      })
    },
  });
};
