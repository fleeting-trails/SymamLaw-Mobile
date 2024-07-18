import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import { Chip } from "react-native-paper";
import {
  CategoryIcon,
  DateIcon,
  DurationIcon,
  QuestionIcon,
  TopicIcon,
} from "../../assets/Icons";
import { ScreenContainer } from "../../components";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useAppNavigation from "../../hooks/useAppNavigation";

export default function ExamStart() {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const { navigate } = useAppNavigation();
  return (
    <ScreenContainer>
      <Image className="h-[120px] max-w-full aspect-[4/1]" source={require("../../assets/dev/course-img-1.jpeg")} />
      <CustomText className="my-5 text-center text-2xl">
        Constitutional Law of Bangladesh (Full Course)
      </CustomText>
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
      <View className="flex flex-row gap-2 flex-wrap mb-3">
        <View
          className={`py-1 px-3`}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <CustomText lightText>preperation</CustomText>
        </View>
        <View
          className={`py-1 px-3`}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <CustomText lightText>liveexam</CustomText>
        </View>
        <View
          className={`py-1 px-3`}
          style={{ backgroundColor: theme.colors.primary }}
        >
          <CustomText lightText>bjspreperation</CustomText>
        </View>
      </View>

      {/* Exam Info */}
      <View className="flex" style={{ gap: 11 }}>
        {/* Exam Info Row */}
        <View className="flex-row gap-2 items-center">
          <DurationIcon color="black" scale={0.8} />
          <CustomText variant="500">Duration</CustomText>
          <CustomText variant="300">1h 30m</CustomText>
        </View>
        {/* Exam Info Row */}
        <View className="flex-row gap-2 items-center">
          <DateIcon color="black" scale={1.7} />
          <View>
            <View className="flex-row gap-2">
              <CustomText variant="500">From:</CustomText>
              <CustomText variant="300">1st June, 2024, 02:50PM</CustomText>
            </View>
            <View className="flex-row gap-2">
              <CustomText variant="500">To:</CustomText>
              <CustomText variant="300">3rd June, 2024, 02:50PM</CustomText>
            </View>
          </View>
        </View>

        {/* Exam Info Row */}
        <View className="flex-row gap-2 items-center">
          <QuestionIcon color="black" scale={0.8} />
          <CustomText variant="500">50</CustomText>
          <CustomText variant="300">Questions</CustomText>
        </View>
        {/* Exam Info Row */}
        <View className="flex-row gap-2 items-center">
          <TopicIcon color="black" scale={0.8} />
          <CustomText variant="500">Topic:</CustomText>
          <CustomText variant="300">Constitutional Law</CustomText>
        </View>
        {/* Exam Info Row */}
        <View className="flex-row gap-2 items-center">
          <CategoryIcon color="black" scale={0.8} />
          <CustomText variant="500">Category:</CustomText>
          <CustomText variant="300">BJS Preperation</CustomText>
        </View>
      </View>

      <View className="px-[30px] text-center">
        <CustomText style={{ color: theme.colors.errorText }}>
          N:B: Upon clicking start exam, if the exam has set duration, timer
          will be started immidiately
        </CustomText>
      </View>

      <PrimaryButton text="Start Exam" color="primary" onPress={() => navigate('Exam')} />
    </ScreenContainer>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({});
};