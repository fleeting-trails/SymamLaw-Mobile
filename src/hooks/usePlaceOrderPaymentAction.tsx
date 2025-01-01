import React from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAppDispatch } from "../redux/hooks";
import { getSubscriptionRedirectLink } from "../redux/slices/course/courseSlice";
import { getQueryParameters } from "../utils/helpers";

function usePlaceOrderPaymentAction({
  setLoading,
  onCancel,
  onPaymentProcessEnd,
}: PropTypes.usePlaceOrderPaymentAction) {
  const dispatch = useAppDispatch();
  const onSubscribePress = async (data: Store.CourseData | Store.CourseListData) => {
    handleSubscribe(data);
  };

  const handleSubscribe = async (
    data: Store.CourseData | Store.CourseListData
  ) => {
    if (setLoading) setLoading(true);
    try {
      const redirect_url = Linking.createURL("");
      console.log("Redirect url", redirect_url);
      const res = await dispatch(
        getSubscriptionRedirectLink({ course_id: data.id, redirect_url })
      ).unwrap();
      console.log("REs redirect link", res.data);
      const paymentRes = await WebBrowser.openAuthSessionAsync(
        res,
        redirect_url
      );
      if (paymentRes.type !== "success") {
        if (onCancel) onCancel();
      } else {
        const purchaseData = getQueryParameters((paymentRes as any).url);
        if (onPaymentProcessEnd) onPaymentProcessEnd(data, purchaseData);
      }
      if (setLoading) setLoading(false);
      return {
        success: true,
        data: res,
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return Promise.reject({
        success: false,
        data: null,
      });
    }
  };

  return { onSubscribePress };
}

export default usePlaceOrderPaymentAction;
