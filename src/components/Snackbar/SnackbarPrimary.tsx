import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Snackbar, SnackbarProps } from "react-native-paper";
import CustomText from "../../atoms/CustomText/CustomText";
import useAppTheme from "../../hooks/useAppTheme";

export default function SnakbarPrimary({
  visible,
  setVisible,
  onActionBtnPress,
  actionBtnText,
  type,
  label
}: PropTypes.SnackbarPrimary) {
  const theme = useAppTheme();
  const styles = createStyles(theme, type);
  const [visibleLocal, setVisibleLocal] = React.useState(false);

  const onToggleSnackBar = () => {
    setVisibleLocal(!visibleLocal);
    if (setVisible)
      setVisible(visible !== undefined ? !visible : !visibleLocal);
  };

  const onDismissSnackBar = () => {
    setVisibleLocal(false);
    if (setVisible) setVisible(false);
  };

  return (
    <View>
      <Snackbar
        visible={visible !== undefined ? visible : visibleLocal}
        onDismiss={onDismissSnackBar}
        style={styles.container}
        
        action={{
          label: actionBtnText ?? "Close",
          onPress: () => {
            if (onActionBtnPress) onActionBtnPress()
          },
        }}
      >
        <CustomText className="text-white">{label}</CustomText>
      </Snackbar>
    </View>
  );
}

const createStyles = (theme : Config.Theme, type : PropTypes.SnackbarPrimaryTypes) => {
  return StyleSheet.create({
    container: {
      backgroundColor: type === "error" ? theme.colors.error : theme.colors.backgroundPrimary,
    }
  });
};
