import moment from "moment";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { TouchableRipple } from "react-native-paper";

export default function BlogCard({ data, onPress }: PropTypes.BlogCard) {
  const styles = createStyles();

  const handlePress = () => {
    if (onPress) {onPress(data);}
  }

  return (
    <TouchableRipple onPress={handlePress}>
      <View className="shadow-xl bg-white m-1">
        {/* Image */}
        <Image
          source={{ uri: data.image }}
          className="h-40 w-full"
          resizeMode="cover"
        />

        {/* Category Tag */}
        {/* <CustomText className="text-xs uppercase bg-blue-200 text-blue-600 px-2 py-1 rounded-full w-auto mt-2">
        {data.category}
      </CustomText> */}
        <View className="p-3">
          {/* Title */}
          <CustomText className="text-lg font-semibold mt-2 text-gray-800">
            {data.title}
          </CustomText>

          {/* Description */}
          <CustomText className="text-sm text-gray-600 mt-1">
            {data.sub_title}
          </CustomText>

          {/* Footer */}
          <View className="flex-row items-center justify-between mt-4">
            <View className="flex-row items-center">
              <Image
                source={require("../../assets/empty-avatar.jpg")}
                className="h-8 w-8 rounded-full"
              />
              <CustomText className="ml-2 text-sm text-gray-800">
                {data.author}
              </CustomText>
            </View>
            <CustomText className="text-xs text-gray-500">
              {moment(data.created_at).format("Do MMMM, YYYY")}
            </CustomText>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
