import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableRipple, useTheme } from "react-native-paper";
import CustomText from "../CustomText/CustomText";

export default function PrimaryButton({
  text,
  icon,
  endIcon,
  color,
  size,
  lightText,
  style,
  textStyle,
  onPress,
  loading,
  ...props
}: PropTypes.PrimaryButton) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color, size });
  const [isLightText, setIsLightText] = useState(false);

  useEffect(() => {
    if (lightText) setIsLightText(true);
    else {
      if (color === "primary") {
        setIsLightText(true);
      } else if (color === "secondary") {
        if (theme.dark) {
          setIsLightText(true);
        } else {
          setIsLightText(false);
        }
      }
    }
  }, [color, theme.dark]);

  return (
    <TouchableRipple
      {...props}
      onPress={() => {
        if (onPress) onPress();
      }}
      disabled={loading}
    >
      <View style={[styles.container, style]}>
        {!loading ? (
          icon && <View className="">{icon}</View>
        ) : (
          <View>
            <Image
              source={require("../../assets/loading.gif")}
              style={{ height: 20, width: 20, objectFit: "contain" }}
            />
          </View>
        )}
        <CustomText lightText={isLightText} style={[styles.buttonText, textStyle]}>
          {text}
        </CustomText>
        {endIcon && <View className="">{endIcon}</View>}
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
      gap: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      ...(!color && { backgroundColor: theme.colors.accent }),
      ...(color === "light" && { backgroundColor: theme.colors.background }),
      ...(color === "primary" && { backgroundColor: theme.colors.primary }),
      ...(color === "secondary" && { backgroundColor: theme.colors.accent }),
      ...(!["light", "primary", "secondary"].includes(color as string) && {
        backgroundColor: color,
      }),
    },
    buttonText: {
      ...((!size || size === "medium") && { fontSize: 16 }),
      ...(size === "small" && { fontSize: 12 }),
      ...(size === "large" && { fontSize: 18 }),
    },
  });
};
