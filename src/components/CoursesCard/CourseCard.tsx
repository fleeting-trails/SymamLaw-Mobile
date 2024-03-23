import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import CustomText from "../../atoms/CustomText/CustomText";
import { ClockIcon } from "../../assets/Icons";
import { useTheme } from "react-native-paper";

export default function CourseCard() {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/dev/course-img-1.jpeg")}
        style={styles.thumbnail}
      />
      <View style={styles.saveButtonContainer}>
        <PrimaryButton text="Save" />
      </View>

      {/* Author Block */}
      <View style={styles.authorContainer}>
        <Image
          source={require("../../assets/dev/headshot.jpeg")}
          style={styles.authorAvatar}
        />
        <CustomText variant="500">Andrew Mead</CustomText>
      </View>
      {/* Course Title */}
      <CustomText variant="300">
        Constitutional Law of Bangladesh (Full Course)
      </CustomText>
      <CustomText variant="300" truncate={200} style={{ fontSize: 10, color: theme.colors.textGray }}>
        In this session you will learn a lot of different strategies to excel in
        bar at law exam. Also expert suggestions about common mistakes and how
        to overcome thosex
      </CustomText>

      {/* Meta Data */}
      <View style={styles.metaInfoContainer}>
        {/* Total course hour */}
        <View style={styles.metaInfoItem}>
          <ClockIcon />
          <CustomText variant="300">21h 45min</CustomText>
        </View>
      </View>

      {/* Action container */}
      <View style={styles.actionContainer}>
        <PrimaryButton text="Start Now" color="primary" />
      </View>
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      borderColor: theme.colors.primaryGray,
      borderWidth: 0.5,
      borderRadius: 2,
      padding: 7,
      position: "relative",
      width: 250,
      gap: 8,
    },
    thumbnail: {
      height: 120,
      width: "100%",
      objectFit: "cover",
    },
    saveButtonContainer: {
      position: "absolute",
      right: 13,
      top: 13,
    },
    authorContainer: {
      flexDirection: "row",
      gap: 3,
    },
    authorAvatar: {
      height: 16,
      width: 16,
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: theme.colors.primaryLight[0],
    },
    metaInfoContainer: {
        flexDirection: 'row',
        gap: 8
    },
    metaInfoItem: {
        flexDirection: 'row',
        gap: 6
    },
    actionContainer: {
        flexDirection: 'column',
        gap: 3
    }
  });
};
