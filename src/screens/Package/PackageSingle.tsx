import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScreenContainer } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getPackageSingle,
  listPackages,
} from "../../redux/slices/packages/packageSlice";
import CustomText from "../../atoms/CustomText/CustomText";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { Divider } from "react-native-paper";
import PackageCard from "../../components/PackageCard/PackageCard";
import useAppNavigation from "../../hooks/useAppNavigation";

function PackageSingle({ route }: PropTypes.PackageSingle) {
  const { ids } = route.params;
  const { navigate } = useAppNavigation();
  const dispatch = useAppDispatch();
  const packageState = useAppSelector((state) => state.package);
  const packages = packageState.packages;
  const loading = packageState.loading.listPackages;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await dispatch(listPackages()).unwrap();
    } catch (error) {
      console.log("Failed to fetch package", error);
    }
  };

  const handleAfterPurchase = (
    data: Store.PackageData,
    purchaseData: Store.PurchaseResponseData
  ) => {
    navigate("PackageBuyFeedback", {
      success: purchaseData.status,
      packageData: data,
      purchaseData: purchaseData,
    });
  };

  return (
    <ScreenLoading isLoading={loading}>
      <ScreenContainer>
        <CustomText>
          Buy following package to use your desired feature
        </CustomText>
        <Divider />
        <View className="gap-2">
          {packages
            .filter((p) => ids.includes(`${p.id}`))
            .map((pkg) => (
              <PackageCard
                key={pkg.id}
                data={pkg}
                onPurchaseProcessEnd={handleAfterPurchase}
              />
            ))}
        </View>
      </ScreenContainer>
    </ScreenLoading>
  );
}

export default PackageSingle;
