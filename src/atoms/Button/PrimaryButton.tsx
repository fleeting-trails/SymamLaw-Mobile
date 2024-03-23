import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableRipple, useTheme } from "react-native-paper";
import CustomText from "../CustomText/CustomText";

export default function PrimaryButton({
  text,
  icon,
  color,
  size,
  ...props
}: PropTypes.PrimaryButton) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color, size });
  return (
    <TouchableRipple {...props}>
      <View style={styles.container}>
        {icon}
        <CustomText style={styles.buttonText}>{text}</CustomText>
      </View>
    </TouchableRipple>
  );
}

type StyleType = {
  theme: Config.Theme;
  color: PropTypes.ButtonColorEnum | undefined;
  size: PropTypes.ButtonSizeEnum | undefined;
};
const createStyles = ({ theme, color, size }: StyleType) => {
  return StyleSheet.create({
    container: {
      borderRadius: 2,
      paddingVertical: 3,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      ...(color === "light" && { backgroundColor: theme.colors.background }),
      ...(color === "primary" && { backgroundColor: theme.colors.primary }),
      ...(color === "secondary" && { backgroundColor: theme.colors.accent }),
      ...(!color && { backgroundColor: theme.colors.accent }),
    },
    buttonText: {
        ...((!size || size === 'medium') && { fontSize: 16 }),
        ...(size === 'small' && { fontSize: 12 }),
        ...(size === 'large' && { fontSize: 18 }),
    },
  });
};
