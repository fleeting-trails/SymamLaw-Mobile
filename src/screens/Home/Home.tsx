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
import { LinearGradient } from "expo-linear-gradient";
import { DateIcon, RegisterIcon, SpeakerIcon } from "../../assets/Icons";
import { truncateString } from "../../utils/helpers";

export default function Home() {
  const { navigate } = useAppNavigation();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppTheme();

  const recommendedExam = useAppSelector(
    (state) => state.exam.recommendedExams
  );
  const recommendedCourses = useAppSelector(
    (state) => state.course.recommendedCourses
  );
  const [recommendedExamCardData, setRecommendedExamCardData] = useState<
    PropTypes.ExamCardData[]
  >([]);
  const [recommendedCoruseCardData, setRecommendedCoruseCardData] = useState<
    PropTypes.CourseCardData[]
  >([]);

  useEffect(() => {
    if (recommendedExam) {
      setRecommendedExamCardData(
        recommendedExam.map((exam) => ({
          id: `${exam.id}`,
          name: exam.title,
          slug: exam.slug,
          duration: parseInt(exam.duration),
          totalQuestions: parseInt(exam.total_questions),
          package_items: exam.package_items,
          is_free: exam.is_free,
        }))
      );
    }
  }, [recommendedExam]);

  useEffect(() => {
    if (recommendedCourses) {
      setRecommendedCoruseCardData(
        recommendedCourses.map((course) => ({
          id: `${course.id}`,
          title: `${course.title}`,
          description: course.excerpt,
          thumbnail: course.image
            ? { uri: course.image }
            : require("../../assets/placeholder-course-image.jpg"),
          slug: course.slug,
          courseHour: "N/A",
          author: {
            name: "Anonymous Author",
            image: require("../../assets/blank-avatar.jpeg"),
          },
        }))
      );
    }
  }, [recommendedCourses]);

  const handlePress = (slug: string) => {
    navigate("CourseSingle", { slug });
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
            onPress={() => navigate("CourseList")}
          >
            <>
              <Image
                className="absolute inset-0 w-full h-full opacity-20"
                source={require("../../assets/course-graphics.png")}
              />
              <View className="w-full h-full p-4 flex justify-center items-center">
                <CustomText className="text-xl text-center" variant="600">
                  Courses
                </CustomText>
              </View>
            </>
          </TouchableRipple>
          <TouchableRipple
            className="w-[92%] h-[100px] rounded border-[1px]"
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
      <Section title="Notice">
        <LinearGradient
          colors={[
            theme.colors.backgroundPrimary,
            theme.colors.backgroundPrimaryLight,
          ]}
          locations={[0, 0.4]}
          style={noticeCardStyle.container}
        >
          <Image
            style={noticeCardStyle.image}
            source={require("../../assets/notice-board.png")}
          />
          <View style={noticeCardStyle.content}>
            <CustomText variant="700" style={noticeCardStyle.heading}>
              Stay Up to date with notice board!
            </CustomText>
            <CustomText variant="300" style={noticeCardStyle.description}>
              Stay informed with the latest updates and announcements from our
              notice board. Don't miss out on important information and events.
              Whether it's exam schedules, course updates, or special events,
              our notice board has got you covered.
            </CustomText>
            <View style={noticeCardStyle.actionContainer}>
              <PrimaryButton
                text="View Notice Board"
                size="small"
                color="light"
                icon={<RegisterIcon color={theme.colors.text} />}
                onPress={() => navigate("Notices")}
              />
            </View>
          </View>
        </LinearGradient>
      </Section>
      {recommendedCoruseCardData.length !== 0 && (
        <Section title="Explore Our Courses">
          <FlatList
            horizontal={true}
            data={recommendedCoruseCardData}
            renderItem={({ item }) => (
              <View style={{ width: 250, paddingHorizontal: 5 }}>
                <CourseCard onPress={handlePress} data={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </Section>
      )}

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

      {user && (
        <Section title="Recommended Exams For You">
          <View style={{ gap: 8 }}>
            {recommendedExamCardData.map((exam) => (
              <ExamCard key={exam.id} data={exam} />
            ))}
          </View>
        </Section>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

const noticeCardStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 9,
    padding: 7,
    borderRadius: 3,
  },
  image: {
    height: "100%",
    width: 150,
    objectFit: "cover",
  },
  content: {
    flex: 1,
    gap: 7,
  },
  heading: {
    color: "#ffffff",
  },
  description: {
    color: "#ffffff",
    fontSize: 10,
  },
  metaInfoContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 7,
  },
});
