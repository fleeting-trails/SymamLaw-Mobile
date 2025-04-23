import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { listMyCourses } from "../../redux/slices/course/courseSlice";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import CourseCardList from "../../components/CoursesCard/CourseCardList";
import { Divider } from "react-native-paper";
import CustomText from "../../atoms/CustomText/CustomText";
import useAppNavigation from "../../hooks/useAppNavigation";

export default function MyCourses() {
  const styles = createStyles();
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  const courseState = useAppSelector((state) => state.course);
  const courses = courseState.myCourses.data;
  const loading = courseState.loading.listMyCourses;

  useEffect(() => {
    dispatch(listMyCourses());
  }, []);

  const handlePress = (data: Store.CourseListData) => {
    navigate("CourseSingle", { slug: data.slug });
  }

  return (
    <ScreenLoading isLoading={loading}>
      <ScreenContainerNonScroll>
        <CustomText variant="600" className="text-2xl">My Courses</CustomText>
        <FlatList
          data={courses}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item }) => (
            <View>
              <CourseCardList data={item} onPress={handlePress} />
              <Divider className="my-2" />
            </View>
          )}
          numColumns={1}
        />
      </ScreenContainerNonScroll>
    </ScreenLoading>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
