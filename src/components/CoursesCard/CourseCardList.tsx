import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Divider, TouchableRipple } from "react-native-paper";
import CustomText from "../../atoms/CustomText/CustomText";
import HtmlRenderer from "../Renderer/HtmlRenderer";
import { ClockIcon, LockIcon, PriceIcon } from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import PrimaryButton from "../../atoms/Button/PrimaryButton";

export default function CourseCardList({
  data,
  onPress,
}: PropTypes.CourseCardList) {
  const theme = useAppTheme();
  const handlePress = () => {
    if (onPress) onPress(data);
  };
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
        {!data.is_user_purchased &&
          (data.price !== "0.00" ? (
            <View className="absolute flex-row gap-1 right-0 top-0">
              <View>
                <PriceIcon color={theme.colors.text} />
              </View>
              <CustomText>{data.price}৳</CustomText>
            </View>
          ) : (
            <View className="absolute flex-row gap-1 right-0 top-0">
              <CustomText>Free</CustomText>
            </View>
          ))}
        <View className="flex-1">
          <CustomText className="mr-10" variant="500" style={{ fontSize: 20 }}>
            {data.title}
          </CustomText>
          {data.excerpt !== "undefined" && <CustomText>{data.excerpt}</CustomText>}
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

          <View className="flex-row gap-1 mt-2">
            <ClockIcon color={theme.colors.text} />
            <CustomText>N/A</CustomText>
          </View>

          <View className="flex flex-row mt-2">
            {!data.is_user_purchased && (
              <PrimaryButton
                color="primary"
                icon={<LockIcon scale={0.8} color={theme.colors.textLight} />}
                text="Purchase"
                textStyle={{ fontSize: 14 }}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({});
