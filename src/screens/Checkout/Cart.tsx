import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScreenContainer } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import { TouchableRipple } from "react-native-paper";
import useAppTheme from "../../hooks/useAppTheme";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";
import {
  addCheckoutItem,
  removeCheckoutItem,
  removeCheckoutItemFull,
} from "../../redux/slices/checkout/checkoutSlice";
import { calculateDiscount } from "../../utils/helpers";
import { DeleteIcon } from "../../assets/Icons";

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
      <CartItems />
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
  const { navigate } = useAppNavigation();
  return (
    <View
      className="rounded-xl shadow-lg p-4 m-1 mx-0"
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
          {amount.subtotal}৳
        </CustomText>
      </View>

      {/* Shipping Fee */}
      <View className="flex-row justify-between mt-2">
        <CustomText className={!theme.dark ? "text-gray-600" : "text-white"}>
          Delivery Fee:
        </CustomText>
        <CustomText className={!theme.dark ? "text-gray-800" : "text-white"}>
          {amount.delivery}৳
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
          {amount.subtotal + amount.delivery}৳
        </CustomText>
      </View>

      {/* Proceed to Checkout Button */}
      <TouchableRipple
        className="rounded-md py-3 mt-6"
        style={{ backgroundColor: theme.colors.backgroundPrimary }}
        onPress={() => navigate("Checkout")}
      >
        <CustomText className="text-white text-center font-medium text-lg">
          Proceed To Checkout →
        </CustomText>
      </TouchableRipple>
    </View>
  );
};

const CartItems = () => {

  const cartItems = useAppSelector((state) => state.checkout.items);

  return cartItems.map((item) => (
    <CartProductCard key={item.id} product={item} />
  ));
};

const CartProductCard = ({ product }: { product: Store.CheckoutItem }) => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();

  const handleIncrement = () => {
    dispatch(addCheckoutItem(product));
  };
  const handleDecrement = () => {
    dispatch(removeCheckoutItem(product.id));
  };
  const handleDelete = () => {
    dispatch(removeCheckoutItemFull(product.id))
  }

  return (
    <View className="relative flex-row items-center bg-white rounded-lg shadow-md px-4 py-4 mb-1">
      {/* Product Image */}
      <Image source={{ uri: product.image }} className="w-20 h-20 rounded" />
      {/* Product Info */}
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">{product.title}</Text>
        <Text className="text-lg" style={{ color: theme.colors.textPrimary }}>
          {calculateDiscount(
            product.discountType,
            product.originalPrice,
            product.discount
          )}
        </Text>
        <Text className="text-gray-500 text-sm">
          {product.details.description}
        </Text>
      </View>
      {/* Quantity Controls */}
      <View className="items-center">
        <TouchableRipple
          onPress={handleIncrement}
          className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center"
          style={{ backgroundColor: theme.colors.primaryLight[1] }}
        >
          <Text className="text-white text-lg font-bold">+</Text>
        </TouchableRipple>
        <CustomText className="my-2 text-lg font-bold">
          {product.quantity}
        </CustomText>
        <TouchableRipple
          onPress={handleDecrement}
          className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
        >
          <Text className="text-lg font-bold">-</Text>
        </TouchableRipple>
      </View>
      <View className="absolute -right-3 -top-3">
        <TouchableRipple
          onPress={handleDelete}
          className="w-8 h-8 bg-orange-500 rounded-full items-center justify-center"
          style={{ backgroundColor: theme.colors.error }}
        >
          <DeleteIcon scale={0.8} color={theme.colors.textLight} />
        </TouchableRipple>
      </View>
    </View>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
