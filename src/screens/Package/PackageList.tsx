import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { ScreenContainer } from "../../components";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import CustomText from "../../atoms/CustomText/CustomText";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getSubscriptionRedirectLink,
  listPackages,
  listUnsubscribedPackages,
} from "../../redux/slices/packages/packageSlice";
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from "react-native-render-html";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import PackageCard from "../../components/PackageCard/PackageCard";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking';
import useAppNavigation from "../../hooks/useAppNavigation";

export default function PackageList() {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const { navigate } = useAppNavigation();
  const packageState = useAppSelector((state) => state.package);
  const loading = packageState.loading.listUnsubscribedPackages;
  const packages = packageState.unSubscribedPackages;

  useEffect(() => {
    fetchPackageList();
  }, []);

  const fetchPackageList = async () => {
    try {
      await dispatch(listUnsubscribedPackages()).unwrap();
    } catch (error) {
      console.log("Failed to fetch package", error);
    }
  };

  const onPurchaseProcessEnd = (data : Store.PackageData, purchaseData: Store.PurchaseResponseData) => {
    console.log("Purchase data", purchaseData)
    navigate("PackageBuyFeedback", {
      success: purchaseData.status,
      packageData: data,
      purchaseData: purchaseData
    })
  }

  return (
    <ScreenLoading isLoading={loading}>
      <ScreenContainer>
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            data={pkg}
            onPurchaseProcessEnd={onPurchaseProcessEnd}
          />
        ))}
      </ScreenContainer>
    </ScreenLoading>
  );
}

const styles = StyleSheet.create({});
