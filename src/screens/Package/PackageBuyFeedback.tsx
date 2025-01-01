import React from "react";
import { View, Image } from "react-native";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import CustomText from "../../atoms/CustomText/CustomText";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { HomeIcon } from "../../assets/Icons";
import useAppNavigation from "../../hooks/useAppNavigation";
import useAppTheme from "../../hooks/useAppTheme";
import { Divider } from "react-native-paper";

function PackageBuyFeedback({ route }: PropTypes.PackageBuyFeedback) {
  const { packageData, purchaseData } = route.params;
  const { navigate } = useAppNavigation();
  const theme = useAppTheme();
  return (
    <View
      className="flex-1 justify-center items-center gap-5"
      style={{ backgroundColor: theme.colors.background }}
    >
      {purchaseData.status === "success" ? (
        <Image
          source={require("../../assets/confetti.png")}
          className="h-[150px] w-[150px] object-contain"
        />
      ) : (
        <Image
          source={require("../../assets/internal_error2.png")}
          className="h-[150px] w-[150px] object-contain"
        />
      )}
      {purchaseData.status === "success" ? (
        <View className="gap-2 max-w-[250px]">
          <CustomText className="text-center text-md">
            You have successully registered to package{" "}
            <CustomText variant="500">{packageData.name}</CustomText>
          </CustomText>
        </View>
      ) : (
        <View className="gap-2 max-w-[250px]">
          <CustomText className="text-center text-md">
            Failed to buy package{" "}
            <CustomText variant="500">{packageData.name}</CustomText>
          </CustomText>
        </View>
      )}
      <Divider />
      {purchaseData.status === "success" && (
        <View>
          <CustomText>
            <CustomText variant="500">Transaction ID: </CustomText>
            {purchaseData.tran_id}
          </CustomText>
        </View>
      )}
      <PrimaryButton
        onPress={() => navigate("HomeTabs")}
        text="Back to Home"
        icon={<HomeIcon color={"#ffffff"} />}
        color="primary"
      />
    </View>
  );
}

export default PackageBuyFeedback;
