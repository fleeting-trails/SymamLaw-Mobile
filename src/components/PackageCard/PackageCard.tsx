import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import HtmlRenderer from "../Renderer/HtmlRenderer";
import CustomText from "../../atoms/CustomText/CustomText";
import { Button } from "react-native-paper";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import useAppTheme from "../../hooks/useAppTheme";

export default function PackageCard({ data }: PropTypes.PackageCard) {
    const theme = useAppTheme();
    
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

            <PrimaryButton text="Subscribe Now" color="primary" />
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
