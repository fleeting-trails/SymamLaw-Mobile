import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { useDispatch } from "react-redux";
import { getCourseSingle } from "../../redux/slices/course/courseSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CourseSingleEnrolled from "./CourseSingleEnrolled";
import CourseSingleUnenrolled from "./CourseSingleUnenrolled";
import CustomText from "../../atoms/CustomText/CustomText";
import { ScreenContainer } from "../../components";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useAppNavigation from "../../hooks/useAppNavigation";
import useAppTheme from "../../hooks/useAppTheme";
import AuthenticationRequired from "../Common/AuthenticationRequired";

export default function CourseSingleScreen({ route }: { route: any }) {
  const styles = createStyles();
  const { navigate } = useAppNavigation();
  const { slug } = route.params;
  const theme = useAppTheme();

  const courseState = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const course = courseState.currentCourse;
  const loading = courseState.loading.getCourseSingle;

  useEffect(() => {
    dispatch(getCourseSingle(slug));
  }, []);

  return user ? (
    <ScreenLoading isLoading={loading}>
      {course ? (
        <>
          {course.is_user_purchased || course.subscription_type === "free" ? (
            <CourseSingleEnrolled data={course} />
          ) : (
            <CourseSingleUnenrolled data={course} />
          )}
        </>
      ) : (
        <CustomText>No Course Found</CustomText>
      )}
    </ScreenLoading>
  ) : (
    // <View
    //   className="gap-2 justify-center items-center flex-1"
    //   style={{ backgroundColor: theme.colors.background }}
    // >
    //   <CustomText className="text-2xl w-[300px] text-center">Please Login to view the course</CustomText>
    //   <PrimaryButton
    //     className="w-[300px]"
    //     textStyle={{ fontSize: 20 }}
    //     onPress={() => navigate("Login")}
    //     color="primary"
    //     text="Login"
    //   />
    // </View>
    <AuthenticationRequired
      message="Seems like you are not signed in! Please login to view course details."
    />
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
