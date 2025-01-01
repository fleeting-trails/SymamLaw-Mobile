import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import HtmlRenderer from "../Renderer/HtmlRenderer";
import CustomText from "../../atoms/CustomText/CustomText";
import { Button } from "react-native-paper";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useAppTheme from "../../hooks/useAppTheme";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAppDispatch } from "../../redux/hooks";
import { getSubscriptionRedirectLink } from "../../redux/slices/packages/packageSlice";
import { getQueryParameters } from "../../utils/helpers";
import { fetchUserProfile } from "../../redux/slices/auth/auth";

export default function PackageCard({
  data,
  onPress,
  onPurchaseProcessEnd,
  onCancel,
}: PropTypes.PackageCard) {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handlePress = async (data: Store.PackageData) => {
    if (onPress) onPress(data);
    handleSubscribe(data);
  };
  const handleSubscribe = async (data: Store.PackageData) => {
    setLoading(true);
    try {
      const redirect_url = Linking.createURL("");
      console.log("Redirect url", redirect_url);
      const res = await dispatch(
        getSubscriptionRedirectLink({ id: data.id, redirect_url })
      ).unwrap();
      const paymentRes = await WebBrowser.openAuthSessionAsync(
        res,
        redirect_url
      );
      if (paymentRes.type !== "success") {
        if (onCancel) onCancel();
      } else {
        const purchaseData = getQueryParameters((paymentRes as any).url);
        dispatch(fetchUserProfile());
        if (onPurchaseProcessEnd) onPurchaseProcessEnd(data, purchaseData);
      }
      setLoading(false);
      return {
        success: true,
        data: res,
      };
    } catch (error) {
      setLoading(false);
      return Promise.reject({
        success: false,
        data: null,
      });
    }
  };
  return (
    <View style={[styles.shadow, { backgroundColor: theme.colors.background }]}>
      {data.image && (
        <Image style={{ height: 150 }} source={{ uri: data.image }} />
      )}
      <View className="p-3">
        <CustomText className="text-xl text-center" variant="700">
          {data.name}
        </CustomText>
        <View className="my-3">
          <CustomText
            variant="500"
            className="text-center"
          >{`${data.duration} Days`}</CustomText>
          <View className="flex flex-row gap-2 justify-center">
            <CustomText
              variant="500"
              className="text-center line-through"
            >{`${data.price} BDT`}</CustomText>
            <CustomText
              variant="500"
              className="text-center"
            >{`${data.final_price} BDT`}</CustomText>
          </View>
        </View>
        <View className="px-2">
          <HtmlRenderer html={data.description} />
        </View>
        <View className="my-2">
          <PrimaryButton
            loading={loading}
            text="Subscribe Now"
            color="primary"
            onPress={() => handlePress(data)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.17,
    shadowRadius: 1.65,

    elevation: 1,
  },
});
