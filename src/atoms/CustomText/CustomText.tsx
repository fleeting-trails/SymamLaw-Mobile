import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { useTheme } from "react-native-paper";
import { truncateString } from "../../utils/helpers";

export default function CustomText({
  variant = "300",
  children,
  lightText = false,
  color = "default",
  style,
  truncate,
  ...props
}: PropTypes.CustomText) {
  const darkMode = useAppSelector((state) => state.config.darkMode);
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color, lightText });
  return (
    <>
      {variant === "300" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_300Light" }]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "300i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            { fontFamily: "Rubik_300Light_Italic" },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "400" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_400Regular" }]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "400i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            { fontFamily: "Rubik_400Regular_Italic" },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "500" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_500Medium" }]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "500i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            { fontFamily: "Rubik_500Medium_Italic" },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "600" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_600SemiBold" }]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "600i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            { fontFamily: "Rubik_600SemiBold_Italic" },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "700" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_700Bold" }]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "700i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            { fontFamily: "Rubik_700Bold_Italic" },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "800" && (
        <Text
          style={[
            styles.textStyle,
            style,
            {
              fontFamily: "Rubik_800ExtraBold",
              transform: [{ scaleX: 1 }, { scaleY: 1.1 }],
            },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "800i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            {
              fontFamily: "Rubik_800ExtraBold_Italic",
              transform: [{ scaleX: 1 }, { scaleY: 1.1 }],
            },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "900" && (
        <Text
          style={[
            styles.textStyle,
            style,
            {
              fontFamily: "Rubik_900Black",
              transform: [{ scaleX: 1 }, { scaleY: 1.1 }],
            },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "900i" && (
        <Text
          style={[
            styles.textStyle,
            style,
            {
              fontFamily: "Rubik_900Black_Italic",
              transform: [{ scaleX: 1 }, { scaleY: 1.1 }],
            },
          ]}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
    </>
  );
}

const createStyles = ({
  theme,
  color,
  lightText,
}: {
  theme: Config.Theme;
  color: PropTypes.CustomTextColorEnum;
  lightText: boolean;
}) => {

  return StyleSheet.create({
    textStyle: {
      color: !lightText
        ? color === "default"
          ? theme.colors.text
          : theme.colors.textPrimary
        : color === "default"
        ? theme.colors.textLight
        : theme.colors.textLightPrimary,
    },
  });
};
