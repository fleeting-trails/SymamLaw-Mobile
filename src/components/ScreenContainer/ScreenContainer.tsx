import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export function ScreenContainer({
  children,
  style,
  nestedScrollEnabled,
  ...props
}: PropTypes.ScreenContainer) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });
  return (
    <View style={[style, styles.container]} {...props}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ rowGap: 30 }}
        nestedScrollEnabled={nestedScrollEnabled ? true : false}
      >
        {children}
        <View style={{ height: 30 }}></View>
      </ScrollView>
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      position: "relative",
    },
    scrollView: {
      flex: 1,
      padding: 20,
      rowGap: 30,
    },
  });
};
