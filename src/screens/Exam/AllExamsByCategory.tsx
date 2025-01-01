import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { ScreenContainer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchExamCategories,
  fetchExamsByCategory,
} from "../../redux/slices/exam/examSlice";
import useAppTheme from "../../hooks/useAppTheme";
import { ExamCategoryIcon } from "../../assets/Icons";
import { TouchableRipple } from "react-native-paper";
import ExamCard from "../../components/ExamCard/ExamCard";
import useAppNavigation from "../../hooks/useAppNavigation";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";

function AllExamsByCategory({ route }: PropTypes.AllExamsByCategory) {
  const { category } = route.params;
  const { navigate } = useAppNavigation();
  const dispatch = useAppDispatch();
  const examState = useAppSelector((state) => state.exam);
  const examsByCategories = examState.examsByCategory.data;
  const loading = examState.loading.fetchExamsByCategory;
  const theme = useAppTheme();
  useEffect(() => {
    handleFetchExamsByCategory();
  }, []);

  const handleFetchExamsByCategory = async () => {
    try {
      dispatch(fetchExamsByCategory(category.slug)).unwrap();
    } catch (error) {
      console.log("failed to fetch categories");
    }
  };
  return (
    <ScreenLoading isLoading={loading}>
      <View
        style={{ backgroundColor: theme.colors.background }}
        className="flex-1 gap-3 p-3"
      >
        <View className="flex flex-row flex-wrap gap-2 py-5 border-b-slate-300 border-b-[1px]">
          <CustomText variant="300i">Showing Exams from</CustomText>
          <CustomText variant="500i">{category.title}</CustomText>
        </View>
        <FlatList
          data={examsByCategories}
          renderItem={({ item }) => (
            <ExamCard
              data={{
                id: `${item.id}`,
                slug: item.slug,
                name: item.title,
                duration: parseInt(item.duration),
                totalQuestions: parseInt(item.total_questions),
                package_items: item.package_items,
                is_free: item.is_free
              }}
              // onPress={handleExamCardPress}
            />
          )}
          numColumns={1}
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

export default AllExamsByCategory;
