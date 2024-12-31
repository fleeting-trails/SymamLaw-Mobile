import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScreenContainer } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import useAppTheme from "../../hooks/useAppTheme";

export default function OrderDetails({ route }: PropTypes.OrderDetails) {
  const styles = createStyles();
  const theme = useAppTheme();
  const { data } = route.params as { data: Store.OrderListData };
  const {
    shipping_name,
    shipping_phone,
    shipping_address,
    shipping_zip,
    order_items,
    total_amount,
  } = data;

  return (
    <ScreenContainer>
      <View className="p-4 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.background }}>
        {/* Header */}
        <CustomText variant="500" className="font-bold text-lg mb-1">
          Order Information #{data.id}
        </CustomText>
        <CustomText className="text-green-500 font-medium mb-4">
          {data.order_status}
        </CustomText>

        {/* Shipping Address and Order Summary */}
        <View className="flex flex-row justify-between mb-4">
          <View>
            <CustomText variant="400" className="font-semibold mb-1">
              Shipping Address
            </CustomText>
            <CustomText className="">
              {shipping_name}
              {"\n"}
              {shipping_address}
              {"\n"}
              {data.shipping_district}, {shipping_zip}
              {"\n"}
              Mobile: {shipping_phone}
            </CustomText>
          </View>
          <View>
            <CustomText variant="400" className="font-semibold mb-1">
              Order Summary
            </CustomText>
            <CustomText className="">Sub-Total: {total_amount}৳</CustomText>
          </View>
        </View>

        {data.order_items.map((item) => (
          <View key={item.id} className="p-3 rounded-lg flex flex-row items-center" style={{ backgroundColor: theme.colors.backgroundGrayLight }}>
            <Image
              source={{ uri: item.book.book_image }} // Replace with actual image URL
              className="w-12 h-12 rounded"
            />
            <View className="flex-1 ml-3">
              <CustomText className="text-[16px] font-medium">
                {item.book.title}
              </CustomText>
              <CustomText style={{ color: theme.colors.textGray }}>{item.book.author}</CustomText>
            </View>
            <View className="items-end">
              <CustomText className="font-medium">
                {item.qty} x {item.price}৳
              </CustomText>
              <CustomText className="">Total: {item.item_total}৳</CustomText>
            </View>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
