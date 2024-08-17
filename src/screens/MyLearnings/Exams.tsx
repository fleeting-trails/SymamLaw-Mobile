import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { ScreenContainer } from "../../components";
import { DataTable, Divider, TouchableRipple } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { listAttemptedExams } from "../../redux/slices/exam/examSlice";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import useAppTheme from "../../hooks/useAppTheme";
import PrimaryButton from "../../atoms/Button/PrimaryButton";

function Exams() {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const examState = useAppSelector((state) => state.exam);
  const loading = examState.loading.listAttemptedExams;
  const attemptedExam = examState.attemptedExams;

  useEffect(() => {
    dispatch(listAttemptedExams());
  }, []);

  return (
    <ScreenLoading isLoading={loading}>
      <View className="p-3 flex-1" style={{ backgroundColor: theme.colors.background }}>
        <CustomText className="text-lg">Attempted Exams</CustomText>
        <Divider className="my-2" />
        <FlatList
          data={attemptedExam}
          renderItem={({ item }) => (
            <View className="my-1">
              <View className="flex flex-row justify-between items-center p-3 rounded-tl rounded-tr" style={{ backgroundColor: theme.colors.primaryGrayLight }}>
                <CustomText variant="500">{item.exam.title}</CustomText>
                <TouchableRipple>
                  <View className="px-3 py-1" style={{ backgroundColor: theme.colors.backgroundPrimary }}>
                    <CustomText style={{ color: theme.colors.textLight }}>View Result</CustomText>
                  </View>
                </TouchableRipple>
              </View>
              <View className="p-3 rounded-bl rounded-br border-[0.5px]" style={{ borderColor: theme.colors.primaryGrayLight }}>
                <CustomText>{`Obtained Marks: ${item.total_score} / ${item.exam.total_marks}`}</CustomText>
                <CustomText>{`Percentage: ${parseFloat(item.total_score) / parseFloat(item.exam.total_marks) * 100}%`}</CustomText>
              </View>
            </View>
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </ScreenLoading>
  );
}

export default Exams;
