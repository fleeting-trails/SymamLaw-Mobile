import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Divider, TouchableRipple } from "react-native-paper";
import CustomText from "../../atoms/CustomText/CustomText";
import HtmlRenderer from "../Renderer/HtmlRenderer";
import { ClockIcon, LockIcon, PriceIcon } from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useCoursePurchaseAction from "../../hooks/useCoursePurchaseAction";
import useAppNavigation from "../../hooks/useAppNavigation";
import SnakbarPrimary from "../Snackbar/SnackbarPrimary";

export default function CourseCardList({
  data,
  onPress,
}: PropTypes.CourseCardList) {
  const theme = useAppTheme();
  const { navigate } = useAppNavigation();
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseFailedSnackbar, setPurchaseFailedSnakbar] = useState(false);
  const { onSubscribePress } = useCoursePurchaseAction({
    setLoading: setPurchaseLoading,
    onCancel: onPurchaseFailed,
    onPurchaseProcessEnd: onPurchaseSuccess,
  });
  const handlePress = () => {
    if (onPress) onPress(data);
  };
  function onPurchaseSuccess() {
    navigate("CourseSingle", { slug: data.slug });
  }
  function onPurchaseFailed() {
    setPurchaseFailedSnakbar(true);
  }
  return (
    <TouchableRipple onPress={handlePress}>
      <View className="p-2 flex-row gap-4 relative">
        <View className="w-12">
          <Image
            className="h-12 w-full bg-white"
            source={
              data.image
                ? { uri: data.image }
                : require("../../assets/placeholder-course-image.jpg")
            }
          />
        </View>
        {data.subscription_type === "free" && (
          <View className="absolute flex-row gap-1 right-0 top-0">
            <CustomText>Free</CustomText>
          </View>
        )}
        <View className="flex-1">
          <CustomText className="mr-20" variant="500" style={{ fontSize: 20 }}>
            {data.title}
          </CustomText>
          {data.excerpt !== "undefined" && (
            <CustomText>{data.excerpt}</CustomText>
          )}
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
          </View>

          {data.course_instructors && <View className="flex-row gap-2 mt-2 items-center">
            <Image 
              className="h-8 w-8 rounded-full p-2"
              style={{ borderColor: theme.colors.primaryGrayLight, borderWidth: 2 }} 
              source={{ uri: data.course_instructors.instructor.instructor_details.image }} />

            <CustomText>{data.course_instructors.instructor.instructor_details.name}</CustomText>
          </View>}

          {data.subscription_type === "paid" && !data.is_user_purchased && (
            <View className="flex flex-row items-center mt-2">
              <PrimaryButton
                color="primary"
                icon={<LockIcon scale={0.8} color={theme.colors.textLight} />}
                text={purchaseLoading ? "Purchasing" : "Purchase"}
                textStyle={{ fontSize: 14 }}
                onPress={() => onSubscribePress(data)}
                loading={purchaseLoading}
              />
              <View className="pl-3 flex-row gap-1 right-0 top-0">
                <View>
                  <PriceIcon color={theme.colors.text} />
                </View>
                <CustomText>BDT: {data.price}৳</CustomText>
              </View>
            </View>
          )}
        </View>
        <SnakbarPrimary
          type="error"
          visible={purchaseFailedSnackbar}
          setVisible={setPurchaseFailedSnakbar}
          label={"Purchase failed/cancelled! Please try again."}
        />
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({});
