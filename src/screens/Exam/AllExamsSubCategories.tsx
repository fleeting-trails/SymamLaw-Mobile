import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { ScreenContainer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchExamCategories, fetchExamSubCategories } from "../../redux/slices/exam/examSlice";
import useAppTheme from "../../hooks/useAppTheme";
import { ExamCategoryIcon } from "../../assets/Icons";
import { TouchableRipple } from "react-native-paper";
import useAppNavigation from "../../hooks/useAppNavigation";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { RouteProp } from "@react-navigation/native";

function AllExamSubCategories({ route }: PropTypes.AllExamsSubCategories) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  const examState = useAppSelector((state) => state.exam);
  const examCategories = examState.examSubCategories.data;
  const loading = examState.loading.fetchExamCategories;
  const theme = useAppTheme();
  useEffect(() => {
    handleFetchExamSubCategory();
  }, []);

  const handleFetchExamSubCategory = async () => {
    try {
      dispatch(fetchExamSubCategories(id)).unwrap();
    } catch (error) {
      console.log("failed to fetch categories");
    }
  };
  const handlePress = (category: Store.ExamCategoryData) => {
    navigate("ExamsByCategories", { category });
  };
  return (
    <ScreenLoading isLoading={loading}>
      <View
        style={{ backgroundColor: theme.colors.background }}
        className="p-3 flex-1"
      >
        <FlatList
          data={examCategories}
          renderItem={({ item }) => (
            <CategoryCard category={item} onPress={handlePress} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </ScreenLoading>
  );
}

type CategoryCardProps = {
  category: Store.ExamCategoryData;
  onPress: (category: Store.ExamCategoryData) => void;
};
function CategoryCard({ category, onPress }: CategoryCardProps) {
  const theme = useAppTheme();
  return (
    <TouchableRipple
      style={{ borderColor: theme.colors.primary, borderWidth: 2 }}
      className="flex-1 rounded flex justify-center items-center mx-2 my-2"
      onPress={() => onPress(category)}
    >
      <View className="gap-2 justify-center items-center min-h-[100px] h-full w-full p-3">
        <ExamCategoryIcon color={theme.colors.primaryGray} />
        <CustomText className="text-center">{category.title}</CustomText>
      </View>
    </TouchableRipple>
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

export default AllExamSubCategories;
