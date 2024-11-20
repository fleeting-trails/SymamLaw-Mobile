import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CourseCard from "../CoursesCard/CourseCard";
import CourseCardList from "../CoursesCard/CourseCardList";
import { Divider } from "react-native-paper";

export default function CourseList({ courses }: PropTypes.CourseList) {
  const styles = createStyles();
  return (
    <FlatList
      data={courses}
      keyExtractor={(item, index) => `${item.id}`}
      renderItem={({ item }) => (
        <View>
          <CourseCardList data={item} />
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
