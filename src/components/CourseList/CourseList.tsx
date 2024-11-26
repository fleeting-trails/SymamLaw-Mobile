import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CourseCard from "../CoursesCard/CourseCard";
import CourseCardList from "../CoursesCard/CourseCardList";
import { Divider } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import useAppNavigation from "../../hooks/useAppNavigation";
import useCoursePurchaseAction from "../../hooks/useCoursePurchaseAction";

export default function CourseList({ courses }: PropTypes.CourseList) {
  const styles = createStyles();
  const { navigate } = useAppNavigation();

  const handlePress = (data : Store.CourseListData) => {
    navigate("CourseSingle", { slug: data.slug })
  }
  return (
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
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
