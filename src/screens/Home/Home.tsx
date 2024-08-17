import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Switch, TouchableRipple } from "react-native-paper";
import { ScreenContainer, Section } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import LiveClassCard from "../../components/LiveClassCard/LiveClassCard";
import CourseCard from "../../components/CoursesCard/CourseCard";
import { FlatList } from "react-native";
import ExamCard from "../../components/ExamCard/ExamCard";
import useAppNavigation from "../../hooks/useAppNavigation";
import useAppTheme from "../../hooks/useAppTheme";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { useAppSelector } from "../../redux/hooks";

export default function Home() {
  const { navigate } = useAppNavigation();
  const theme = useAppTheme();
  const recommendedExam = useAppSelector(state => state.exam.recommendedExams);
  const [recommendedExamCardData, setRecommendedExamCardData] = useState<PropTypes.ExamCardData[]>([]);

  useEffect(() => {
    setRecommendedExamCardData(recommendedExam.map(exam => ({
      id: `${exam.id}`,
      name: exam.title,
      slug: exam.slug,
      duration: parseInt(exam.duration),
      totalQuestions: parseInt(exam.total_questions),
    })))
  }, [recommendedExam])
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
      slug: "daily",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "2",
      name: "Labor Law Exam",
      slug: "labor",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "3",
      name: "Constituion Law Exam",
      slug: "constituion",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "4",
      name: "Bar-At-Law Preperation",
      slug: "baratlaw",
      duration: 50,
      totalQuestions: 40,
    },
    {
      id: "5",
      name: "Special Exams",
      slug: "special",
      duration: 50,
      totalQuestions: 40,
    },
  ];
  const handleExamCardPress = (id: string, slug: string) => {
    navigate("ExamStart", { slug });
  };
  return (
    <ScreenContainer>
      <Section title="Browse">
        <View className="flex flex-row gap-2 justify-center flex-wrap">
          <TouchableRipple
            className="w-[45%] h-[100px] rounded border-[1px]"
            style={{ borderColor: theme.colors.textPrimary }}
            onPress={() => navigate("ExamCategories")}
          >
            <>
              <Image
                className="absolute inset-0 w-full h-full opacity-20"
                source={require("../../assets/exam-graphic.png")}
              />
              <View className="w-full h-full p-4 flex justify-center items-center">
                <CustomText className="text-xl text-center" variant="600">
                  Exams
                </CustomText>
              </View>
            </>
          </TouchableRipple>
          <TouchableRipple
            className="w-[45%] h-[100px] rounded border-[1px]"
            style={{ borderColor: theme.colors.textPrimary }}
            onPress={() => navigate("PackageList")}
          >
            <>
              <Image
                className="absolute inset-0 w-full h-full opacity-20"
                source={require("../../assets/packages-graphic.png")}
              />
              <View className="w-full h-full p-4 flex justify-center items-center">
                <CustomText className="text-xl text-center" variant="600">
                  Packages
                </CustomText>
              </View>
            </>
          </TouchableRipple>
        </View>
      </Section>
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

      {/* <View
        style={{ backgroundColor: theme.colors.backgroundPrimary }}
        className="p-6 justify-center items-center gap-3 m-1"
      >
        <CustomText variant="500" className="text-center" lightText>
          Want to find exams in more categorized fashion? Visit all exams
          category page
        </CustomText>
        <PrimaryButton
          text="Exam Categories Page"
          onPress={() => navigate("ExamCategories")}
          color="light"
        />
      </View> */}

      <Section title="Recommended Exams For You">
        <View style={{ gap: 8 }}>
          {recommendedExamCardData.map((exam) => (
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
