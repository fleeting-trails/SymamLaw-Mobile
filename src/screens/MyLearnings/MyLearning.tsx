import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import CustomText from "../../atoms/CustomText/CustomText";
import TabPrimary from "../../atoms/Tab/TabPrimary";
import Exams from "./Exams";
import { useAppSelector } from "../../redux/hooks";
import { ScreenContainer } from "../../components";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import AuthenticationRequired from "../Common/AuthenticationRequired";
import { DataTable } from "react-native-paper";

export default function MyLearning() {
  const user = useAppSelector(state => state.auth.user);
  const FirstRoute = () => (
    <Exams />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
    </View>
  );


  const tabs = [
    { key: "exams", title: "Exams", children: FirstRoute },
    { key: "courses", title: "Courses", children: SecondRoute },
  ]

  return (
    user ? <TabPrimary 
      tabs={tabs}
    /> : <AuthenticationRequired message="Login to your account or create a new account to track the progress of your courses, exams and other" />
  );
}

const styles = StyleSheet.create({});
