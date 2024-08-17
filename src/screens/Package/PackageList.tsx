import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { ScreenContainer } from "../../components";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import CustomText from "../../atoms/CustomText/CustomText";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { listPackages } from "../../redux/slices/packages/packageSlice";
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from "react-native-render-html";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import PackageCard from "../../components/PackageCard/PackageCard";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";

export default function PackageList() {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const packageState = useAppSelector((state) => state.package);
  const loading = packageState.loading.listPackages;
  const packages = packageState.packages;

  useEffect(() => {
    fetchPackageList();
  }, []);

  const fetchPackageList = async () => {
    try {
      await dispatch(listPackages()).unwrap();
    } catch (error) {
      console.log("Failed to fetch package", error);
    }
  };

  return (
    <ScreenLoading isLoading={loading}>
      <ScreenContainer>
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} data={pkg} />
        ))}
      </ScreenContainer>
    </ScreenLoading>
  );
}

const styles = StyleSheet.create({});
