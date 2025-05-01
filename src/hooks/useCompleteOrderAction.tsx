import React from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAppDispatch } from "../redux/hooks";
import { getSubscriptionRedirectLink } from "../redux/slices/course/courseSlice";
import { getQueryParameters } from "../utils/helpers";
import { createOrder } from "../redux/slices/order/orderSlice";

function useCompleteOrderAction({
  setLoading,
  onCancel,
  setError,
  onPurchaseProcessEnd,
}: PropTypes.useCompleteOrderAction) {
  const dispatch = useAppDispatch();
  const orderPressAction = async (data: Store.CreateOrderAPIPayload) => {
    handlePay(data);
  };

  const handlePay = async (
    data: Store.CreateOrderAPIPayload,
  ) => {
    if (setLoading) setLoading(true);
    try {
      console.log("Redirect url", data.redirect_url);
      const res = await dispatch(
        createOrder(data)
      ).unwrap();
      console.log("REs redirect link", res.data);
      const paymentRes = await WebBrowser.openAuthSessionAsync(
        res.data.data.payment_link,
        data.redirect_url
      );
      if (paymentRes.type !== "success") {
        if (onCancel) onCancel();
      } else {
        const purchaseData = getQueryParameters((paymentRes as any).url);
        if (onPurchaseProcessEnd) onPurchaseProcessEnd(res.data, purchaseData);
      }
      if (setLoading) setLoading(false);
      return {
        success: true,
        data: res,
      };
    } catch (error: any) {
      if (setLoading) setLoading(false);
      const errObj = {
        success: false,
        error: error?.error ?? "Failed to place book order",
        data: null,
      }
      if (setError) {
        setError({
          isError: true,
          message: errObj.error
        })
      }
      return Promise.reject(errObj);
    }
  };

  return { orderPressAction, redirectUrl: Linking.createURL("") };
}

export default useCompleteOrderAction
