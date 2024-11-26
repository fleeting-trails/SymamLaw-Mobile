import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { listCourses } from "../../redux/slices/course/courseSlice";
import CourseList from "../../components/CourseList/CourseList";
import useAppTheme from "../../hooks/useAppTheme";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";

export default function CourseListScreen() {
  const styles = createStyles();
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const courseState = useAppSelector((state) => state.course);
  const courseList = courseState.courses.data;
  const pagination = courseState.courses.pagination;
  const loading = courseState.loading.listCourses;

  useEffect(() => {
    dispatch(
      listCourses({
        page: 1,
        limit: 100,
      })
    );
  }, []);
  return (
    <ScreenLoading isLoading={loading}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingHorizontal: 16,
        }}
      >
        <CourseList courses={courseList} />
      </View>
    </ScreenLoading>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
