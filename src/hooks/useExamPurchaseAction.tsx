import React from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useAppDispatch } from "../redux/hooks";
import { getSubscriptionRedirectLink } from "../redux/slices/exam/examSlice";
import { getQueryParameters } from "../utils/helpers";

function useExamPurchaseAction({
  setLoading,
  onCancel,
  onPurchaseProcessEnd,
}: PropTypes.useExamPurchaseAction) {
  const dispatch = useAppDispatch();
  const onSubscribePress = async (id: number) => {
    handleSubscribe(id);
  };

  const handleSubscribe = async (
    id: number
  ) => {
    if (setLoading) setLoading(true);
    try {
      const redirect_url = Linking.createURL("");
      const res: string = await dispatch(
        getSubscriptionRedirectLink({ id, redirect_url })
      ).unwrap();
      const paymentRes = await WebBrowser.openAuthSessionAsync(
        res,
        redirect_url
      );
      if (paymentRes.type !== "success") {
        if (onCancel) onCancel();
      } else {
        const purchaseData = getQueryParameters((paymentRes as any).url);
        if (onPurchaseProcessEnd) onPurchaseProcessEnd(id, purchaseData);
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

export default useExamPurchaseAction;
