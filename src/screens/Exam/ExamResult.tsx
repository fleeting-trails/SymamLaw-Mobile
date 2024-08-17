import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getExamResult } from "../../redux/slices/exam/examSlice";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { ScreenContainer } from "../../components";
import { View } from "moti";
import CustomText from "../../atoms/CustomText/CustomText";
import useAppTheme from "../../hooks/useAppTheme";
import { useWindowDimensions } from "react-native";
import { CheckmarkRounded, CrossIconRounded } from "../../assets/Icons";

function ExamResult({ route }: PropTypes.ExamResult) {
  const { id } = route.params;
  const theme = useAppTheme();
  const dimensions = useWindowDimensions();
  const dispatch = useAppDispatch();
  const examState = useAppSelector((state) => state.exam);
  const loading = examState.loading.getExamResult;
  const currentExamResult = examState.currentExamResult;

  useEffect(() => {
    dispatch(getExamResult(id));
  }, []);

  useEffect(() => {
    console.log("Current exam result", currentExamResult);
  }, [currentExamResult]);

  return (
    <ScreenLoading isLoading={loading}>
      {currentExamResult && (
        <ScreenContainer>
          <View
            className="p-3 rounded border-[1px]"
            style={{
              borderColor: theme.colors.primary,
              backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.15)`,
            }}
          >
            <CustomText variant="500" className="text-lg">
              Result Overview
            </CustomText>
            <View className="flex-row gap-2">
              <CustomText>Total Marks:</CustomText>
              <CustomText>{currentExamResult.exam.total_marks}</CustomText>
            </View>
            <View className="flex-row gap-2">
              <CustomText>Obtained Score:</CustomText>
              <CustomText>{`${currentExamResult.total_score}`}</CustomText>
            </View>
          </View>
          <View className="flex flex-col gap-2">
            {currentExamResult.exam.question.map((q, i) => (
              <View>
                <View key={q.id} className="flex flex-row justify-between">
                  <CustomText
                    variant="500"
                    style={{ width: dimensions.width - 100 }}
                  >
                    {q.question_text}
                  </CustomText>
                  <CustomText>
                    {`${q.assigned_marks ?? "-"} / ${q.marks}`}
                  </CustomText>
                </View>
                <View className="mt-2">
                  {q.question_type === "mcq" ? (
                    <MCQQuestionViewer options={q.option} />
                  ) : (
                    <WrittenQuestionViewer
                      written_answer={
                        currentExamResult.submission.submitted_answers[i]
                          .written_answer
                      }
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScreenContainer>
      )}
    </ScreenLoading>
  );
}

type MCQQuestionViewerProps = {
  options: Store.ExamOptionsResultVariant[];
};
function MCQQuestionViewer({ options }: MCQQuestionViewerProps) {
  const renderCorrectionMarkings = (option: Store.ExamOptionsResultVariant) => {
    if (option.is_correct === "1") {
      return <CheckmarkRounded className="text-green-500 h-2 w-2" />;
    } else if (option.is_correct === "0" && option.is_user_submitted) {
      return <CrossIconRounded className="text-red-500 h-2 w-2" />;
    } else {
      return <View></View>;
    }
  };
  return (
    <View className="gap-1">
      {options.map((op) => (
        <View className="flex flex-row gap-1 items-center">
          <View className="h-4 w-4 mr-2">{renderCorrectionMarkings(op)}</View>
          <CustomText key={op.id}>{op.option_text}</CustomText>
        </View>
      ))}
    </View>
  );
}
type WrittenQuestionViewerProps = {
  written_answer: string | null;
};
function WrittenQuestionViewer({ written_answer } : WrittenQuestionViewerProps) {
  return (
    <View>
      {written_answer ? (
        <CustomText>{written_answer}</CustomText>
      ) : (
        <CustomText>N/A</CustomText>
      )}
    </View>
  );
}

export default ExamResult;
