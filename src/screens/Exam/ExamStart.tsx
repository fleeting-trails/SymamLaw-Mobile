import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
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
import { fetchExamDetails } from "../../redux/slices/exam/examSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { formatMinuteToTimestring } from "../../utils/helpers";
import AuthenticationRequired from "../Common/AuthenticationRequired";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";

export default function ExamStart({ route }: PropTypes.ExamStart) {
  const { slug } = route.params;
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const styles = createStyles({ theme });
  const { navigate } = useAppNavigation();
  const examState = useAppSelector((state) => state.exam);
  const currentExam = examState.currentExam;
  const loading = examState.loading.fetchExamDetails;
  const user = useAppSelector(state => state.auth.user)

  useEffect(() => {
    initializeExamDetails(slug);
  }, [slug]);

  const initializeExamDetails = async (slug: string) => {
    try {
      await dispatch(fetchExamDetails(slug));
    } catch (error) {
      console.log("Failed to fetch exam", error);
    }
  }

  return (
    user ? <ScreenContainer>
      <ScreenLoading isLoading={loading}>
        {currentExam && <>
          <Image
            className="h-[120px] max-w-full aspect-[4/1]"
            source={require("../../assets/dev/course-img-1.jpeg")}
          />
          <CustomText className="my-5 text-center text-2xl">
            {currentExam.title}
          </CustomText>
          <HtmlRenderer html={currentExam.description} />

          {/* Tags */}
          {/* <View className="flex flex-row gap-2 flex-wrap mb-3">
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
          </View> */}

          {/* Exam Info */}
          <View className="flex" style={{ gap: 11 }}>
            {/* Exam Info Row */}
            {currentExam.duration && <View className="flex-row gap-2 items-center">
              <DurationIcon color="black" scale={0.8} />
              <CustomText variant="500">Duration</CustomText>
              <CustomText variant="300">{formatMinuteToTimestring(parseInt(currentExam.duration))}</CustomText>
            </View>}
            {/* Exam Info Row */}
            {(currentExam.start_datetime || currentExam.end_datetime) && <View className="flex-row gap-2 items-center">
              <DateIcon color="black" scale={1.7} />
              <View>
                {currentExam.start_datetime && <View className="flex-row gap-2">
                  <CustomText variant="500">From:</CustomText>
                  {/* <CustomText variant="300">1st June, 2024, 02:50PM</CustomText> */}
                  <CustomText variant="300">{currentExam.start_datetime}</CustomText>
                </View>}
                {currentExam.end_datetime && <View className="flex-row gap-2">
                  <CustomText variant="500">To:</CustomText>
                  {/* <CustomText variant="300">3rd June, 2024, 02:50PM</CustomText> */}
                  <CustomText variant="300">{currentExam.end_datetime}</CustomText>
                </View>}
              </View>
            </View>}

            {/* Exam Info Row */}
            <View className="flex-row gap-2 items-center">
              <QuestionIcon color="black" scale={0.8} />
              <CustomText variant="500">{currentExam.question.length}</CustomText>
              <CustomText variant="300">Questions</CustomText>
            </View>
            {/* Exam Info Row */}
            {currentExam.subject?.title && <View className="flex-row gap-2 items-center">
              <TopicIcon color="black" scale={0.8} />
              <CustomText variant="500">Subject:</CustomText>
              <CustomText variant="300">{currentExam.subject?.title} </CustomText>
            </View>}
            {/* Exam Info Row */}
            <View className="flex-row gap-2 items-center">
              <CategoryIcon color="black" scale={0.8} />
              <CustomText variant="500">Category:</CustomText>
              <CustomText variant="300">{currentExam.exam_category.title}</CustomText>
            </View>
          </View>

          <View className="px-[30px] text-center">
            <CustomText style={{ color: theme.colors.errorText }}>
              N:B: Upon clicking start exam, if the exam has set duration, timer
              will be started immidiately
            </CustomText>
          </View>

          <PrimaryButton
            text="Start Exam"
            color="primary"
            onPress={() => navigate("Exam")}
          />
        </>}
      </ScreenLoading>
    </ScreenContainer> : <AuthenticationRequired message="Seems like you are not logged in! To start exam please login / create an account first" />
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({});
};
