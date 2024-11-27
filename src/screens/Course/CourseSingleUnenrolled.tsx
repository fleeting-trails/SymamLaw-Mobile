import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { ScreenContainer } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import moment from "moment";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import { Divider } from "react-native-paper";
import TabPrimary from "../../atoms/Tab/TabPrimary";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import { ScrollView } from "moti";
import { LiveIcon, RecordedIcon } from "../../assets/Icons";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { useAppSelector } from "../../redux/hooks";
import useCoursePurchaseAction from "../../hooks/useCoursePurchaseAction";
import SnakbarPrimary from "../../components/Snackbar/SnackbarPrimary";
import useAppNavigation from "../../hooks/useAppNavigation";

export default function CourseSingleUnenrolled({
  data,
}: PropTypes.CourseSingleUnenrolled) {
  const styles = createStyles();
  const theme = useAppTheme();
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const { onSubscribePress } = useCoursePurchaseAction({
    setLoading: setPurchaseLoading,
    onCancel: handlePurchaseCancel,
    onPurchaseProcessEnd: handlePurchaseSuccess,
  });
  const { navigate } = useAppNavigation();
  const [purchaseFailedSnackbar, setPurchaseFailedSnakbar] = useState(false);

  const tabs = [
    {
      key: "details",
      title: "Details",
      children: () => <CourseDetails data={data} />,
    },
    {
      key: "outline",
      title: "Outline",
      children: () => <CourseOutline data={data} />,
    },
  ];

  function handlePurchaseCancel() {
    setPurchaseFailedSnakbar(true);
  }

  function handlePurchaseSuccess(
    res: Store.CourseListData | Store.CourseData,
    purchaseData: Store.PurchaseResponseData
  ) {
    navigate("CourseSingle", { slug: data.slug })
  }

  const handlePurchasePress = () => {
    onSubscribePress(data);
  };
  return (
    <View className="flex-1 relative">
      <ScreenContainer>
        <View
          style={{
            borderWidth: 2,
            borderColor: theme.colors.primary,
            padding: 8,
          }}
        >
          <Image
            className="w-full h-[150px] object-contain"
            source={
              data.image
                ? { uri: data.image }
                : require("../../assets/placeholder-course-image.jpg")
            }
          />
        </View>
        <LinearGradient
          colors={[
            theme.colors.backgroundPrimary,
            theme.colors.backgroundPrimaryLight,
          ]}
          locations={[0.6, 1]}
          className="p-3 relative"
        >
          <View className="absolute right-3 top-3 bg-red-600 rounded-[20px] px-3 py-1 flex-row items-center">
            {data.course_type === "recorded" ? (
              <RecordedIcon color={"#fff"} />
            ) : (
              <LiveIcon color={"#fff"} />
            )}
            <CustomText className="text-white ml-2">
              {data.course_type === "recorded" ? "Recorded" : "Live"}
            </CustomText>
          </View>
          <CustomText
            variant="600"
            lightText={true}
            className="text-white text-xl mr-[130px]"
          >
            {" "}
            {data.title}
          </CustomText>

          <View className="mt-3 ml-1">
            <CustomText
              variant="400"
              style={{ fontSize: 16 }}
              className="text-white"
            >
              {data.excerpt}
            </CustomText>
            <CustomText variant="300" className="text-white">
              Last updated on {moment(data.updated_at).format("Do MMMM, YYYY")}
            </CustomText>
          </View>
        </LinearGradient>
        <View className="min-h-[500px]">
          <TabPrimary tabs={tabs} />
        </View>
      </ScreenContainer>
      <View className="h-[60px] bg-white shadow shadow-black flex-row justify-between items-center px-4">
        <CustomText>Price: {data.price}৳</CustomText>
        <View className="flex-1 ml-4">
          <PrimaryButton
            loading={purchaseLoading}
            text="Purchase"
            color="primary"
            className="w-full"
            onPress={handlePurchasePress}
          />
        </View>
      </View>
      <SnakbarPrimary
        type="error"
        visible={purchaseFailedSnackbar}
        setVisible={setPurchaseFailedSnakbar}
        label={"Purchase failed/cancelled! Please try again."}
      />
    </View>
  );
}

function CourseDetails({ data }: { data: Store.CourseData }) {
  return (
    <ScrollView className="my-3">
      <View>
        <CustomText variant="600" className="text-xl">
          Description
        </CustomText>
        <HtmlRenderer html={data.description} />
      </View>
      <View className="mt-2">
        {data.subject && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Subject: </CustomText>
            <CustomText>{data.subject.title}</CustomText>
          </View>
        )}
        {data.category && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Category: </CustomText>
            <CustomText>{data.category.title}</CustomText>
          </View>
        )}
        {(data.total_lecture || data.total_lecture === 0) && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Total Lectures: </CustomText>
            <CustomText>{data.total_lecture}</CustomText>
          </View>
        )}
        {(data.total_section || data.total_section === 0) && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Total Sections: </CustomText>
            <CustomText>{data.total_section}</CustomText>
          </View>
        )}
        {data.course_type && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Course Type: </CustomText>
            <CustomText>{data.course_type}</CustomText>
          </View>
        )}
        {data.course_start_date && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Starting From: </CustomText>
            <CustomText>
              {moment(data.course_start_date).format("MMMM Do YYYY, h:mm:ss a")}
            </CustomText>
          </View>
        )}
        {data.course_end_date && (
          <View className="flex-row flex-wrap gap-2">
            <CustomText variant="500">Ending At: </CustomText>
            <CustomText>
              {moment(data.course_end_date).format("MMMM Do YYYY, h:mm:ss a")}
            </CustomText>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function CourseOutline({ data }: { data: Store.CourseData }) {
  const theme = useAppTheme();
  return data.course_sections ? (
    <ScrollView>
      {data.course_sections.map((item) => (
        <View
          key={item.id}
          className="px-4 py-3 my-1 flex-row justify-between"
          style={{ backgroundColor: theme.colors.backgroundGray }}
        >
          <CustomText variant="400">{item.title}</CustomText>
          <CustomText style={{ color: theme.colors.textGray }}>
            {item.lectures.length} Lectures
          </CustomText>
        </View>
      ))}
    </ScrollView>
  ) : (
    <View>
      <CustomText>No sections present!</CustomText>
    </View>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
