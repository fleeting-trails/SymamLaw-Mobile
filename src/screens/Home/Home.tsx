import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-paper";
import { ScreenContainer, Section } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import LiveClassCard from "../../components/LiveClassCard/LiveClassCard";
import CourseCard from "../../components/CoursesCard/CourseCard";
import { FlatList } from "react-native";
import ExamCard from "../../components/ExamCard/ExamCard";
import useAppNavigation from "../../hooks/useAppNavigation";
import useAppTheme from "../../hooks/useAppTheme";
import PrimaryButton from "../../atoms/Button/PrimaryButton";

export default function Home() {
  const { navigate } = useAppNavigation();
  const theme = useAppTheme();
  const courseData: Array<PropTypes.CourseCardData> = [
    {
      id: "1",
      title: "Constitutional Law of Bangladesh (Full Course)",
      description:
        "In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome thosex",
      thumbnail: require("../../assets/dev/course-img-1.jpeg"),
      courseHour: "21h 45min",
      author: {
        name: "Andrew Mead",
        image: require("../../assets/dev/headshot.jpeg"),
      },
    },
    {
      id: "2",
      title: "Labor Law Bangladesh",
      description:
        "In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome thosex",
      thumbnail: require("../../assets/dev/course-img-2.jpeg"),
      courseHour: "21h 45min",
      author: {
        name: "Andrew Mead",
        image: require("../../assets/dev/headshot.jpeg"),
      },
    },
    {
      id: "3",
      title: "Constitutional Law of Bangladesh (Full Course)",
      description:
        "In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome thosex",
      thumbnail: require("../../assets/dev/course-img-1.jpeg"),
      courseHour: "21h 45min",
      author: {
        name: "Andrew Mead",
        image: require("../../assets/dev/headshot.jpeg"),
      },
    },
  ];
  const examData: Array<PropTypes.ExamCardData> = [
    {
      id: "1",
      name: "Daily Exam",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "2",
      name: "Labor Law Exam",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "3",
      name: "Constituion Law Exam",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "4",
      name: "Bar-At-Law Preperation",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "5",
      name: "Special Exams",
      duration: 50,
      totalQuestions: 40,
    },
  ];
  const handleExamCardPress = (id: string) => {
    navigate("ExamStart", { id });
  };
  return (
    <ScreenContainer>
      <Section title="Upcoming Live Class">
        <LiveClassCard />
      </Section>
      <Section title="Explore Our Courses">
        <FlatList
          horizontal={true}
          data={courseData}
          renderItem={({ item }) => (
            <View style={{ width: 250, paddingHorizontal: 5 }}>
              <CourseCard data={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </Section>

      <View
        style={{ backgroundColor: theme.colors.backgroundPrimary }}
        className="p-6 justify-center items-center gap-3 m-1"
      >
        <CustomText variant="500" className="text-center" lightText>
          Want to find exams in more categorized fashion? Visit all exams
          category page
        </CustomText>
        <PrimaryButton 
          text="Exam Categories Page"
          onPress={() => navigate('ExamCategories')}
          color="light"
        />
      </View>

      <Section title="Recommended Exams For You">
        <View style={{ gap: 8 }}>
          {examData.map((exam) => (
            <ExamCard onPress={handleExamCardPress} key={exam.id} data={exam} />
          ))}
        </View>
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
