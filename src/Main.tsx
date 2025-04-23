import { Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Appearance } from 'react-native';
import React, { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import useInitialize from "./hooks/useInitialize";
import HomeTabs from "./screens/HomeTabs";
import { CustomStatusBar, Sidenav, TopNavigation } from "./components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Auth/Login";
import { PaperProvider, useTheme } from "react-native-paper";
import { getTheme } from "./theme";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setDarkTheme } from "./redux/slices/config";
import Register from "./screens/Auth/Register";
import OTP from "./screens/Auth/OTP";
import ForgetPassword from "./screens/Auth/ForgetPassword";
import ForgetPasswordOTP from "./screens/Auth/ForgetPasswordOTP";
import ExamStart from "./screens/Exam/ExamStart";
import Exam from "./screens/Exam/Exam";
import AllExams from "./screens/Exam/AllExamsCategories";
import AllExamCategories from "./screens/Exam/AllExamsCategories";
import AllExamsByCategory from "./screens/Exam/AllExamsByCategory";
import PackageList from "./screens/Package/PackageList";
import ExamResult from "./screens/Exam/ExamResult";
import AllExamSubCategories from "./screens/Exam/AllExamsSubCategories";
import PackageBuyFeedback from "./screens/Package/PackageBuyFeedback";
import PackageSingle from "./screens/Package/PackageSingle";
import CourseListScreen from "./screens/Course/CourseListScreen";
import CourseSingleScreen from "./screens/Course/CourseSingleScreen";
import BlogSingle from "./screens/Resources/BlogSingle";
import Cart from "./screens/Checkout/Cart";
import Checkout from "./screens/Checkout/Checkout";
import Orders from "./screens/Orders/Orders";
import OrderDetails from "./screens/Orders/OrderDetails";
import Notices from "./screens/Notice/Notices";
import NoticeDetails from "./screens/Notice/NoticeDetails";
import Account from "./screens/Account/Account";
import ExamBrowse from "./screens/Exam/ExamBrowse";
import ExamsFree from "./screens/Exam/ExamsFree";
import ExamsArchived from "./screens/Exam/ExamsArchived";
import LibraryDetails from "./screens/Library/LibraryDetails";

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const Stack = createNativeStackNavigator<Config.ScreensStack>();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [appIsReady, setAppIsReady] = useState(false);
  const [sideNavOpen, setSidenavOpen] = useState(false);
  const darkMode = useAppSelector(state => state.config.darkMode)
  const { loading } = useInitialize();

  useEffect(() => {
    if (!loading) {
      setAppIsReady(true);
      SplashScreen.hideAsync();
    }
  }, [loading])

  return (
    appIsReady && (
      <PaperProvider theme={getTheme(darkMode)}>
        <CustomStatusBar />
        <TopNavigation loggedIn={false} setSidenavOpen={setSidenavOpen} />
        <Sidenav open={sideNavOpen} setOpen={setSidenavOpen} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="ForgetPasswordOTP" component={ForgetPasswordOTP} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="ExamStart" component={ExamStart} />
          <Stack.Screen name="Exam" component={Exam} />
          <Stack.Screen name="ExamBrowse" component={ExamBrowse} />
          <Stack.Screen name="ExamCategories" component={AllExamCategories} />
          <Stack.Screen name="ExamSubCategories" component={AllExamSubCategories} />
          <Stack.Screen name="ExamsByCategories" component={AllExamsByCategory} />
          <Stack.Screen name="ExamsFree" component={ExamsFree} />
          <Stack.Screen name="ExamsArchived" component={ExamsArchived} />
          <Stack.Screen name="PackageList" component={PackageList} />
          <Stack.Screen name="ExamResult" component={ExamResult} />
          <Stack.Screen name="PackageBuyFeedback" component={PackageBuyFeedback} />
          <Stack.Screen name="PackageSingle" component={PackageSingle} />
          <Stack.Screen name="CourseList" component={CourseListScreen} />
          <Stack.Screen name="CourseSingle" component={CourseSingleScreen} />
          <Stack.Screen name="BlogSingle" component={BlogSingle} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="Notices" component={Notices} />
          <Stack.Screen name="NoticeDetails" component={NoticeDetails} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="LibraryDetails" component={LibraryDetails} />
        </Stack.Navigator>
        {/* <HomeTabs /> */}
      </PaperProvider>
    )
  );
}
