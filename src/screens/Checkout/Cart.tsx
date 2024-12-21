import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScreenContainer } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import { TouchableRipple } from "react-native-paper";
import useAppTheme from "../../hooks/useAppTheme";
import { useAppSelector } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";

export default function Cart() {
  const styles = createStyles();
  const theme = useAppTheme();
  const { navigate } = useAppNavigation();
  const user = useAppSelector((state) => state.auth.user);
  const checkoutState = useAppSelector((state) => state.checkout);

  useEffect(() => {
    if (!user) {
      // Navigate to login
      navigate("Login");
    }
  }, []);

  return checkoutState.items?.length !== 0 ? (
    <ScreenContainer>
      <CartSummary />
    </ScreenContainer>
  ) : (
    <View
      className="flex-1 gap-6 justify-center items-center"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Image
        source={require("../../assets/empty-search-graphics.png")}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <View className="text-center items-center">
        <CustomText className="text-center text-2xl w-[200px]" variant="500">
          {"No Items Found!!"}
        </CustomText>
        <CustomText className="text-center">
          Start shopping and add items to your cart
        </CustomText>
      </View>
    </View>
  );
}

const CartSummary = () => {
  const theme = useAppTheme();
  const checkoutState = useAppSelector((state) => state.checkout);
  const amount = checkoutState.amount;
  return (
    <View
      className="rounded-xl shadow-lg p-4 m-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <CustomText className="text-lg font-semibold" variant="500">
        Cart Summary
      </CustomText>

      {/* Subtotal */}
      <View className="flex-row justify-between mt-4">
        <CustomText className={!theme.dark ? "text-gray-600" : "text-white"}>
          Subtotal
        </CustomText>
        <CustomText className={!theme.dark ? "text-gray-800" : "text-white"}>
          ৳{amount.subtotal}
        </CustomText>
      </View>

      {/* Shipping Fee */}
      <View className="flex-row justify-between mt-2">
        <CustomText className={!theme.dark ? "text-gray-600" : "text-white"}>
          Delivery Fee:
        </CustomText>
        <CustomText className={!theme.dark ? "text-gray-800" : "text-white"}>
          ৳{amount.delivery}
        </CustomText>
      </View>

      {/* Total */}
      <View className="flex-row justify-between mt-4 border-t border-gray-300 pt-4">
        <CustomText
          variant="500"
          className={!theme.dark ? "text-gray-800" : "text-white"}
        >
          Total
        </CustomText>
        <CustomText
          variant="500"
          className={!theme.dark ? "text-gray-800" : "text-white"}
        >
          ৳{amount.subtotal + amount.delivery} BDT
        </CustomText>
      </View>

      {/* Proceed to Checkout Button */}
      <TouchableRipple
        className="rounded-md py-3 mt-6"
        style={{ backgroundColor: theme.colors.backgroundPrimary }}
      >
        <CustomText className="text-white text-center font-medium text-lg">
          Proceed To Checkout →
        </CustomText>
      </TouchableRipple>
    </View>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
