import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { ScreenContainer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchExamCategories,
  fetchExamsByCategory,
  fetchFreeExams,
  fetchFreeExamsMore,
} from "../../redux/slices/exam/examSlice";
import useAppTheme from "../../hooks/useAppTheme";
import { ExamCategoryIcon } from "../../assets/Icons";
import { TouchableRipple } from "react-native-paper";
import ExamCard from "../../components/ExamCard/ExamCard";
import useAppNavigation from "../../hooks/useAppNavigation";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";

function ExamsFree() {
  const { navigate } = useAppNavigation();
  const dispatch = useAppDispatch();
  const examState = useAppSelector((state) => state.exam);
  const exams = examState.freeExams.data;
  const loading = examState.loading.fetchFreeExams;
  const loadMore = examState.loading.fetchFreeExamsMore;
  const theme = useAppTheme();
  useEffect(() => {
    handleFetchFreeExams();
  }, []);

  const handleFetchFreeExams = async () => {
    try {
      dispatch(fetchFreeExams()).unwrap();
    } catch (error) {
      console.log("failed to fetch categories");
    }
  };

  const handleLoadMore = () => {
      try {
        dispatch(fetchFreeExamsMore());
      } catch (error) {
        console.log("Failed to load more blogs", error);
      }
    };

  return (
    <ScreenLoading isLoading={loading}>
      <View
        style={{ backgroundColor: theme.colors.background }}
        className="flex-1 gap-3 p-3"
      >
        <View className="flex flex-row flex-wrap gap-2 py-5 border-b-slate-300 border-b-[1px]">
          <CustomText variant="300i">Free Exams</CustomText>
        </View>
        <FlatList
          data={exams}
          renderItem={({ item }) => (
            <ExamCard
              data={{
                id: `${item.id}`,
                slug: item.slug,
                name: item.title,
                duration: parseInt(item.duration),
                totalQuestions: parseInt(item.total_questions),
                package_items: item.package_items,
                is_free: item.is_free,
              }}
              // onPress={handleExamCardPress}
            />
          )}
          keyExtractor={(item, i) => `${item.id}_${i}`}
          numColumns={1}
          ListFooterComponent={() =>
            loadMore && (
              <View className="w-full items-center justify-center">
                <Image
                  source={require("../../assets/loading.gif")}
                  className="w-[30px] h-[30px] object-contain"
                />
              </View>
            )
          }
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          // columnWrapperStyle={styles.row}
        />
      </View>
    </ScreenLoading>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    //   justifyContent: 'space-between',
    // marginBottom: 8,
    // marginHorizontal: 8
  },
});

export default ExamsFree;
