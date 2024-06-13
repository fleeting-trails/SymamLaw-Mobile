import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import { Chip } from "react-native-paper";

export default function ExamStart() {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  return (
    <View className="pt-5 px-5 flex gap-y-2">
      <CustomText className="my-5 text-center text-2xl">Constitutional Law of Bangladesh (Full Course)</CustomText>
      <CustomText>
        In this session you will learn a lot of different strategies to excel in
        bar at law exam. Also expert suggestions about common mistakes and how
        to overcome those In this session you will learn a lot of different
        strategies to excel in bar at law exam. Also expert suggestions about
        common mistakes and how to overcome those In this session you will learn
        a lot of different strategies to excel in bar at law exam. Also expert
        suggestions about common mistakes and how to overcome those
      </CustomText>
      
      {/* Tags */}
      <View className="flex flex-row gap-2 flex-wrap">
        <View className={`py-1 px-3`} style={{ backgroundColor: theme.colors.primary }}>
            <CustomText lightText>preperation</CustomText>
        </View>
        <View className={`py-1 px-3`} style={{ backgroundColor: theme.colors.primary }}>
            <CustomText lightText>liveexam</CustomText>
        </View>
        <View className={`py-1 px-3`} style={{ backgroundColor: theme.colors.primary }}>
            <CustomText lightText>bjspreperation</CustomText>
        </View>
      </View>
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({});
};
