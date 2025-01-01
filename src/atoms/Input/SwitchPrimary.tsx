import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../CustomText/CustomText";

export default function SwitchPrimary({
  label,
  containerStyle,
  ...props
}: PropTypes.SwitchPrimary) {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CustomText style={styles.labelStyle} variant="300">
          {label}
        </CustomText>
      )}
      <Switch {...props} />
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      gap: 6,
    },
    labelStyle: {
      fontSize: 16,
    },
    textStyle: {
      padding: 15,
      borderColor: theme.colors.primaryGray,
      borderWidth: 1,
      borderRadius: 3,
      color: theme.colors.text,
    },
  });
};
