import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { useDispatch } from "react-redux";
import { getCourseSingle } from "../../redux/slices/course/courseSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CourseSingleEnrolled from "./CourseSingleEnrolled";
import CourseSingleUnenrolled from "./CourseSingleUnenrolled";
import CustomText from "../../atoms/CustomText/CustomText";

export default function CourseSingleScreen({
  route,
}: { route: any }) {
  const styles = createStyles();
  const { slug } = route.params;

  const courseState = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  const course = courseState.currentCourse;
  const loading = courseState.loading.getCourseSingle;

  useEffect(() => {
    dispatch(getCourseSingle(slug));
  }, []);

  return (
    <ScreenLoading isLoading={loading}>
      {course ? (
        <>
          {(course.is_user_purchased || course.subscription_type === "free") ? (
            <CourseSingleEnrolled data={course} />
          ) : (
            <CourseSingleUnenrolled data={course} />
          )}
        </>
      ) : <CustomText>No Course Found</CustomText>}
    </ScreenLoading>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
