import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { ScreenContainer } from "../../components";
import SelectPrimary from "../../atoms/Input/SelectPrimary";
import Districts from "../../utils/districts.json";
import SwitchPrimary from "../../atoms/Input/SwitchPrimary";
import { Divider, RadioButton, TouchableRipple } from "react-native-paper";
import useAppTheme from "../../hooks/useAppTheme";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useCompleteOrderAction from "../../hooks/useCompleteOrderAction";
import useAppNavigation from "../../hooks/useAppNavigation";
import { resetCart } from "../../redux/slices/checkout/checkoutSlice";

type InputState = Omit<
  Store.CreateOrderAPIPayload,
  "user_id" | "products" | "redirect_url"
>;
const REQUIRED_FIELDS = [
  "shipping_name",
  "shipping_phone",
  "shipping_district",
  "shipping_address",
];

export default function Checkout() {
  const styles = createStyles();
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { navigate } = useAppNavigation();
  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.checkout.items);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState({
    open: false,
    message: "",
  });

  const { orderPressAction, redirectUrl } = useCompleteOrderAction({
    setLoading: setOrderLoading,
    onCancel: handleOrderCancel,
    onPurchaseProcessEnd: handleOrderComplete,
  });

  const [input, setInput] = useState<InputState>({
    shipping_name: "",
    shipping_email: "",
    shipping_phone: "",
    shipping_district: "",
    shipping_address: "",
    shipping_zip: "",
    order_note: "",
    payment_method: "ssl",
    order_from: "",
  });

  /** Hanlder functions */
  const handleSetInput = (key: string, value: string) => {
    setInput({
      ...input,
      [key]: value,
    });
  };

  function handleOrderCancel() {
    console.log("Order cancelled")
  }

  async function handleOrderComplete(orderData: Store.CreateOrderAPIResponse) {
    console.log("Order completed", orderData);
    await dispatch(resetCart());
    navigate("Orders");
  }

  const handlePlaceOrder = () => {
    const allRequiredFiledsCompleted = REQUIRED_FIELDS.reduce(
      (acc: boolean, curr: string) => {
        // @ts-ignore
        if (!input[curr] || input[curr] === "") {
          return acc && false;
        }
        return acc && true;
      },
      true
    );

    if (!allRequiredFiledsCompleted) {
      console.log("Validation error");
      setValidationError({
        open: true,
        message: "Please fillout all the required fields",
      });
      return;
    }

    orderPressAction({
      ...input,
      user_id: (user as Store.UserData).id,
      products: cartItems.map((item) => ({
        book_id: item.id,
        qty: item.quantity,
      })),
      redirect_url: redirectUrl,
    });
  };
  /** End handler functions */
  return (
    <ScreenContainer nestedScrollEnabled={true}>
      <CustomText className="text-2xl" variant="600">
        Delivery Details
      </CustomText>
      <View style={{ rowGap: 8 }}>
        {/* Full Name */}
        <InputPrimary
          label="Full Name*"
          placeholder="Full Name"
          value={input.shipping_name}
          onChangeText={(value) => handleSetInput("shipping_name", value)}
        />
        {/* Email */}
        <InputPrimary
          label="Email"
          placeholder="youremail@gmail.com"
          value={input.shipping_email}
          onChangeText={(value) => handleSetInput("shipping_email", value)}
        />
        {/* Phone */}
        <InputPrimary
          label="Phone*"
          placeholder="01xxxxxxxx"
          value={input.shipping_phone}
          onChangeText={(value) => handleSetInput("shipping_phone", value)}
        />

        {/* Select district */}
        <SelectPrimary
          label="District*"
          options={Districts.map((dist) => ({
            label: `${dist.name} (${dist.bn_name})`,
            value: dist.name,
          }))}
          placeholder="Select District"
          onSelect={(value) => handleSetInput("shipping_district", value)}
        />

        {/* ZipCode */}
        <InputPrimary
          label="Zip Code"
          placeholder="xxxx"
          value={input.shipping_zip}
          onChangeText={(value) => handleSetInput("shipping_zip", value)}
        />

        {/* Address */}
        <InputPrimary
          label="Address*"
          placeholder="Enter address details"
          value={input.shipping_address}
          onChangeText={(value) => handleSetInput("shipping_address", value)}
        />

        {/* Address */}
        <InputPrimary
          label="Order Notes"
          placeholder="Tell us if you have any notes/concerns"
          value={input.order_note}
          onChangeText={(value) => handleSetInput("order_note", value)}
          multiline={true}
          inputStyle={{ height: 75 }}
        />

        <View
          className="p-3"
          style={{ backgroundColor: theme.colors.backgroundGrayLight }}
        >
          <CustomText className="text-xl">Payment Method</CustomText>
          <Divider className="my-2" />
          <RadioButton.Group
            value={input.payment_method}
            onValueChange={(value) => handleSetInput("payment_method", value)}
          >
            <RadioButton.Item label="Online Payment" value="ssl" />
            <RadioButton.Item
              disabled
              label="Pay On Delivery"
              value="delivery"
            />
          </RadioButton.Group>
        </View>

        <OrderSummary loading={orderLoading} onPlaceOrder={handlePlaceOrder} />
      </View>
    </ScreenContainer>
  );
}

type OrderSummaryProps = {
  onPlaceOrder: () => void;
  loading: boolean;
};
const OrderSummary = ({ onPlaceOrder, loading }: OrderSummaryProps) => {
  const theme = useAppTheme();
  const checkoutState = useAppSelector((state) => state.checkout);
  const amount = checkoutState.amount;

  return (
    <View
      className="rounded-xl shadow-lg p-4 m-1 mx-0"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <CustomText className="text-lg font-semibold" variant="500">
        Order Summary
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
      {/* Text */}
      <View className="flex-row justify-between mt-2">
        <CustomText className={!theme.dark ? "text-gray-600" : "text-white"}>
          Text:
        </CustomText>
        <CustomText className={!theme.dark ? "text-gray-800" : "text-white"}>
          0৳
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
        style={{
          backgroundColor: loading
            ? theme.colors.backgroundGray
            : theme.colors.backgroundPrimary,
        }}
        onPress={onPlaceOrder}
      >
        <CustomText className="text-white text-center font-medium text-lg">
          {loading ? "Placing Order..." : "Place Order"}
        </CustomText>
      </TouchableRipple>
    </View>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
