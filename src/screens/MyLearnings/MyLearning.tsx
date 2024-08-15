import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "../../atoms/CustomText/CustomText";
import TabPrimary from "../../atoms/Tab/TabPrimary";
import Exams from "./Exams";

export default function MyLearning() {
  const FirstRoute = () => (
    <Exams />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
      <CustomText>Makchuuuu</CustomText>
    </View>
  );


  const tabs = [
    { key: "exams", title: "Exams", children: FirstRoute },
    { key: "courses", title: "Courses", children: SecondRoute },
  ]

  return (
    <TabPrimary 
      tabs={tabs}
    />
  );
}

const styles = StyleSheet.create({});
