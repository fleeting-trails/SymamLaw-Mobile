import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { MoneyIcon } from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addCheckoutItem,
  removeCheckoutItem,
  removeCheckoutItemFull,
} from "../../redux/slices/checkout/checkoutSlice";
import { calculateDiscount } from "../../utils/helpers";
import useAppNavigation from "../../hooks/useAppNavigation";
import { TouchableRipple } from "react-native-paper";

export default function BookCard({ data, onPress }: PropTypes.BookCard) {
  const styles = createStyles();
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  /**
   * Handler functions
   */
  const handleAddToCheckout = () => {
    if (onPress) onPress(data); // Call the onPress function if it exists
    dispatch(
      addCheckoutItem({
        id: data.id,
        title: data.title,
        originalPrice: data.price,
        discount: data.discount,
        discountType: data.discount_type,
        image: data.book_image,
        details: data,
        quantity: 1,
        type: "book",
      })
    );
  };
  /* 
   * Handle full press
   */
  const handleCardPress = () => {
    navigate("LibraryDetails", { data });
  }
  const handleRemoveFromCheckout = () => {
    dispatch(removeCheckoutItemFull(data.id));
  };
  /**
   * End Handler functions
   */

  return (
    <TouchableRipple onPress={handleCardPress}>
      <View className="bg-[#f8f1e7] shadow-md p-4 m-4">
        {/* Image Section */}
        <Image
          source={{ uri: data.book_image }} // Replace with the actual image
          className="h-60 w-full object-cover"
        />

        {/* Content Section */}
        <View className="mt-4">
          {/* Tag */}
          <CustomText className="text-sm text-[#9E9E9E] bg-[#e8dcb7] px-3 py-1 rounded-full self-start font-semibold">
            {data.book_category.title}
          </CustomText>

          {/* Title */}
          <CustomText className="text-xl font-bold text-[#4a3b3a] mt-2">
            {data.title}
          </CustomText>

          {/* Author */}
          <CustomText className="text-base text-[#333333] mt-1">
            {data.author}
          </CustomText>

          {/* Meta Info */}
          <View className="flex-row items-center mt-4 space-x-4">
            {/* Amount */}
            <View className="flex-row items-center gap-2">
              <MoneyIcon scale={0.7} color={theme.colors.text} />
              {/* <CustomText>BDT </CustomText> */}
              <RenderPrice data={data} />
            </View>
            {/* Reading Time */}
            {/* <CustomText className="text-sm text-gray-600">
            ⏱ 19-minute read
          </CustomText> */}
          </View>

          <View className="mt-3">
            <RenderCheckoutButton
              data={data}
              handleAddToCheckout={handleAddToCheckout}
              handleRemoveFromCheckout={handleRemoveFromCheckout}
            />
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

const RenderPrice = ({ data }: { data: Store.BookListData }) => {
  if (!data.discount || data.discount === 0) {
    return (
      <View className="gap-2 mt-[2px] ml-[2px]">
        <CustomText className="text-[#333333] font-bold">
          {data.price}৳
        </CustomText>
      </View>
    );
  } else {
    const finalPrice = calculateDiscount(data.discount_type, data.price, data.discount);
    return (
      <View className="flex-row items-center gap-2 mt-[2px] ml-[2px]">
        <CustomText className="text-[#333333] line-through">
          {data.price}৳
        </CustomText>
        <CustomText className="text-[#333333] font-bold">
          {finalPrice}৳
        </CustomText>
      </View>
    );
  }
};

const RenderCheckoutButton = ({
  data,
  handleAddToCheckout,
  handleRemoveFromCheckout,
}: {
  data: Store.BookListData;
  handleAddToCheckout: () => void;
  handleRemoveFromCheckout: () => void;
}) => {
  const checkoutItems = useAppSelector((state) => state.checkout.items);
  const thisItem = checkoutItems.find((item) => item.id === data.id);
  if (thisItem) {
    return (
      <View className="flex-row items-center gap-2">
        <View className="relative flex-1">
          <PrimaryButton
            color="primary"
            text={`Add More`}
            onPress={handleAddToCheckout}
          />
          <View className="absolute -top-2 -right-2 bg-red-600 items-center justify-center h-5 w-5 rounded-full">
            <CustomText className="text-white">{thisItem.quantity}</CustomText>
          </View>
        </View>
        <View className="flex-1">
          <PrimaryButton
            color="secondary"
            text="Remove Item"
            onPress={handleRemoveFromCheckout}
          />
        </View>
      </View>
    );
  } else {
    return (
      <PrimaryButton
        //   className="mt-3"
        color="primary"
        text="Add to Cart"
        onPress={handleAddToCheckout}
      />
    );
  }
};

const createStyles = () => {
  return StyleSheet.create({});
};
