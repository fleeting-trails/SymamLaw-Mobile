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
  linkStyle = false,
  centerText = false,
  className,
  ...props
}: PropTypes.CustomText) {
  const darkMode = useAppSelector((state) => state.config.darkMode);
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme, color, lightText, linkStyle, centerText });
  return (
    <>
      {variant === "300" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_300Light" }]}
          className={className}

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
          className={className}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "400" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_400Regular" }]}
          className={className}
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
          className={className}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "500" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_500Medium" }]}
          className={className}
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
          className={className}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "600" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_600SemiBold" }]}
          className={className}
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
          className={className}
          {...props}
        >
          {truncate ? truncateString(children, truncate) : children}
        </Text>
      )}
      {variant === "700" && (
        <Text
          style={[styles.textStyle, style, { fontFamily: "Rubik_700Bold" }]}
          className={className}
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
          className={className}
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
          className={className}
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
          className={className}
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
          className={className}
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
          className={className}
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
  linkStyle,
  centerText
}: {
  theme: Config.Theme;
  color: PropTypes.CustomTextColorEnum;
  lightText: boolean;
  linkStyle: boolean;
  centerText: boolean
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
      
      ...(linkStyle && {
        color: theme.colors.primaryLight[1],
        borderBottomColor: theme.colors.primaryLight[1],
        borderBottomWidth: 1,
      }),
      ...(centerText && {
        textAlign: 'center'
      })
    },
  });
};
