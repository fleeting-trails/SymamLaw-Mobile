import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { useTheme } from "react-native-paper";

export default function CustomText({ variant = "300", children, color = "default", style, ...props }: PropTypes.CustomText) {
  const darkMode = useAppSelector((state) => state.config.darkMode);
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color });
  return (
    <>
      {variant === "300" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_300Light" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "300i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_300Light_Italic" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "400" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_400Regular" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "400i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_400Regular_Italic" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "500" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_500Medium" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "500i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_500Medium_Italic" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "600" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_600SemiBold" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "600i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_600SemiBold_Italic" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "700" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_700Bold" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "700i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_700Bold_Italic" }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "800" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_800ExtraBold", transform: [{ scaleX: 1 }, { scaleY: 1.1 }] }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "800i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_800ExtraBold_Italic", transform: [{ scaleX: 1 }, { scaleY: 1.1 }] }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "900" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_900Black", transform: [{ scaleX: 1 }, { scaleY: 1.1 }] }]} {...props}>
          {children}
        </Text>
      )}
      {variant === "900i" && (
        <Text style={[styles.textStyle, style, { fontFamily: "Rubik_900Black_Italic", transform: [{ scaleX: 1 }, { scaleY: 1.1 }] }]} {...props}>
          {children}
        </Text>
      )}
    </>
  );
}

const createStyles = ({ theme, color }: { theme: Config.Theme; color: PropTypes.CustomTextColorEnum }) => {
  console.log("Theme colors text", theme.colors.text);
  return StyleSheet.create({
    textStyle: {
      color: color === "default" ? theme.colors.text : theme.colors.textPrimary,
    },
  });
};
