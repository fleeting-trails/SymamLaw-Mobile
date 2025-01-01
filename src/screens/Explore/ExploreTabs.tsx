import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import CourseList from "../../components/CourseList/CourseList";
import CustomText from "../../atoms/CustomText/CustomText";
import ExamCard from "../../components/ExamCard/ExamCard";
import PackageCard from "../../components/PackageCard/PackageCard";
import useAppNavigation from "../../hooks/useAppNavigation";

type ExploreCoursesProps = {
  courses: null | Store.CourseListData[];
};
export function ExploreCourses({ courses }: ExploreCoursesProps) {
  const styles = createStyles();
  return courses && courses.length ? (
    <CourseList courses={courses} />
  ) : (
    <NoSearchResult label="No courses found!" />
  );
}

type ExploreExamsProps = {
  exams: null | Store.ExamDataShort[];
};
export function ExploreExams({ exams }: ExploreExamsProps) {
  const styles = createStyles();
  return exams && exams.length ? (
    <FlatList
      data={exams}
      renderItem={({ item }) => (
        <ExamCard
          data={{
            id: `${item.id}`,
            slug: item.slug,
            name: item.title,
            duration: parseInt(item.duration),
            totalQuestions: parseInt(item.total_questions),
            package_items: item.package_items,
            is_free: item.is_free,
          }}
          // onPress={handleExamCardPress}
        />
      )}
      numColumns={1}
    />
  ) : (
    <NoSearchResult label="No exams found!" />
  );
}
export function ExploreBooks() {
  const styles = createStyles();
  return (
    <View>
      <Text>ExploreTabs</Text>
    </View>
  );
}

type ExplorePackagesProps = {
  packages: null | Store.PackageData[];
};
export function ExplorePackages({ packages }: ExplorePackagesProps) {
  const styles = createStyles();
  const { navigate } = useAppNavigation();
  const onPurchaseProcessEnd = (
    data: Store.PackageData,
    purchaseData: Store.PurchaseResponseData
  ) => {
    console.log("Purchase data", purchaseData);
    navigate("PackageBuyFeedback", {
      success: purchaseData.status,
      packageData: data,
      purchaseData: purchaseData,
    });
  };
  return packages && packages.length ? (
    <FlatList
      data={packages}
      renderItem={({ item }) => (
        <PackageCard
          key={item.id}
          data={item}
          onPurchaseProcessEnd={onPurchaseProcessEnd}
        />
      )}
      numColumns={1}
    />
  ) : (
    <NoSearchResult label="No exams found!" />
  );
}

const NoSearchResult = ({ label }: { label: string }) => {
  return (
    <View className="flex-1 gap-6 justify-center items-center">
      <Image
        source={require("../../assets/empty-search-graphics.png")}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <View className="text-center">
        <CustomText className="text-center text-2xl w-[200px]" variant="500">
          {label ?? "No results found"}
        </CustomText>
      </View>
    </View>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
