import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { AvatarImagePicker, ScreenContainer } from "../../components";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { InputUnderlined } from "../../atoms";
import DateTimePickerPrimary from "../../atoms/Input/DateTimePickerPrimary";
import ListInput from "../../atoms/Input/ListInput";
import PrimaryButton from "../../atoms/Button/PrimaryButton";

export default function Account() {
  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.imageUploadContainer}>
        <AvatarImagePicker />
      </View>
      <InputUnderlined label="Full Name" placeholder="Write your fullname..." />
      <InputUnderlined
        label="Current Institution"
        placeholder="Name of your university/college"
      />
      <InputUnderlined label="Phone Number" placeholder="01xxxxxxxxx" />
      <DateTimePickerPrimary label="Date Of Birth" />
      <ListInput label="Interests" />
      <InputUnderlined
        label="Bio"
        placeholder="Short description about yourself"
        multiline={true}
      />
      <PrimaryButton text="Update" color="primary" />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 22,
  },
  imageUploadContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
