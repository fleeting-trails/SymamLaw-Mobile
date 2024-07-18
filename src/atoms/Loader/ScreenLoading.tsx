import React from "react";
import { Image, View } from "react-native";
import CustomText from "../CustomText/CustomText";

function ScreenLoading({
  isLoading,
  children,
  label = "Loading Data...",
}: PropTypes.ScreenLoading) {
  return isLoading ? (
    <View className="flex-1 justify-center items-center gap-3">
      <Image
        source={require("../../assets/loading.gif")}
        className="w-[100px] h-[100px] object-contain"
      />
      <CustomText variant="300" className="text-xl">{label}</CustomText>
    </View>
  ) : (
    children
  );
}

export default ScreenLoading;
