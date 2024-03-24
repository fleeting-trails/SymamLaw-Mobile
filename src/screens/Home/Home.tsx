import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-paper";
import { ScreenContainer, Section } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import LiveClassCard from "../../components/LiveClassCard/LiveClassCard";
import CourseCard from "../../components/CoursesCard/CourseCard";
import { FlatList } from "react-native";

export default function Home() {
  const courseData: Array<PropTypes.CourseCardData> = [
    {
      id: "1",
      title: "Constitutional Law of Bangladesh (Full Course)",
      description:
        "In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome thosex",
      thumbnail: require("../../assets/dev/course-img-1.jpeg"),
      courseHour: "21h 45min",
      author: {
        name: "Andrew Mead",
        image: require("../../assets/dev/headshot.jpeg"),
      },
    },
    {
      id: "2",
      title: "Labor Law Bangladesh",
      description:
        "In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome thosex",
      thumbnail: require("../../assets/dev/course-img-2.jpeg"),
      courseHour: "21h 45min",
      author: {
        name: "Andrew Mead",
        image: require("../../assets/dev/headshot.jpeg"),
      },
    },
    {
      id: "3",
      title: "Constitutional Law of Bangladesh (Full Course)",
      description:
        "In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome thosex",
      thumbnail: require("../../assets/dev/course-img-1.jpeg"),
      courseHour: "21h 45min",
      author: {
        name: "Andrew Mead",
        image: require("../../assets/dev/headshot.jpeg"),
      },
    },
  ];
  return (
    <ScreenContainer>
      <Section title="Upcoming Live Class">
        <LiveClassCard />
      </Section>
      <Section title="Explore Our Courses">
        <FlatList
          horizontal={true}
          data={courseData}
          renderItem={({ item }) => (
            <View style={{ width: 250, paddingHorizontal: 5 }}>
              <CourseCard data={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </Section>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
