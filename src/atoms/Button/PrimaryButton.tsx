import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableRipple, useTheme } from "react-native-paper";
import CustomText from "../CustomText/CustomText";

export default function PrimaryButton({
  text,
  icon,
  color,
  size,
  lightText,
  style,
  onPress,
  ...props
}: PropTypes.PrimaryButton) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color, size });
  const [isLightText, setIsLightText] = useState(false);

  useEffect(() => {
    if (lightText) setIsLightText(true);
    else {
      if (color === 'primary') {
        setIsLightText(true);
      } else if (color === 'secondary') {
        if (theme.dark) {
          setIsLightText(true);
        } else {
          setIsLightText(false);
        }
      }
    }
  }, [color, theme.dark])

  return (
    <TouchableRipple
      {...props}
      onPress={() => {
        if (onPress) onPress();
      }}
    >
      <View style={[style, styles.container]}>
        {icon}
        <CustomText
          lightText={isLightText}
          style={styles.buttonText}
        >
          {text}
        </CustomText>
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
      paddingVertical: 10,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
      ...(!color && { backgroundColor: theme.colors.accent }),
      ...(color === "light" && { backgroundColor: theme.colors.background }),
      ...(color === "primary" && { backgroundColor: theme.colors.primary }),
      ...(color === "secondary" && { backgroundColor: theme.colors.accent }),
      ...(!["light", "primary", "secondary"].includes(color as string) && { backgroundColor: color }),
    },
    buttonText: {
      ...((!size || size === "medium") && { fontSize: 16 }),
      ...(size === "small" && { fontSize: 12 }),
      ...(size === "large" && { fontSize: 18 }),
    },
  });
};
