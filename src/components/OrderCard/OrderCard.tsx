import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import moment from "moment";
import { TouchableRipple } from "react-native-paper";
import useAppTheme from "../../hooks/useAppTheme";

export default function OrderCard({ data, onViewPress }: PropTypes.OrderCard) {
  const styles = createStyles();
  const theme = useAppTheme();
  const getStatusClasses = (status: number) => {
    if (status === 1) return "text-green-500";
    if (status === 0) return "text-yellow-500";
    return "";
  };

  const handlePress = () => {
    if (onViewPress) onViewPress(data);
  };

  return (
    <View
      key={data.id}
      className="flex flex-row justify-between items-center border-b border-gray-200 py-4"
    >
      <View>
        <CustomText className="font-medium">Order# {data.id}</CustomText>
        <CustomText className="">
          Date Added: {moment(data.created_at).format("Do MMM, YY")}
        </CustomText>
      </View>
      <View className="flex items-end">
        <CustomText className="font-bold">{data.total_amount}</CustomText>
        <CustomText className={`font-medium ${getStatusClasses(data.status)}`}>
          {data.status == 1 ? "pending" : "confirmed"}
        </CustomText>
      </View>
      <TouchableRipple
        className="px-4 py-2 rounded bg-red-100"
        style={{ backgroundColor: theme.colors.backgroundPrimary }}
        onPress={handlePress}
      >
        <CustomText className="text-white font-medium">View</CustomText>
      </TouchableRipple>
    </View>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
