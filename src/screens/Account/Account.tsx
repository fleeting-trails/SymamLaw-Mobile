import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { AvatarImagePicker, ScreenContainer } from "../../components";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { InputUnderlined } from "../../atoms";
import DateTimePickerPrimary from "../../atoms/Input/DateTimePickerPrimary";

export default function Account() {
  return (
    <ScreenContainer>
      <View>
        <AvatarImagePicker />
      </View>
      <View>
        <InputUnderlined
          label="Full Name"
          placeholder="Write your fullname..."
        />
        <InputUnderlined
          label="Current Institution"
          placeholder="Name of your university/college"
        />
        <InputUnderlined label="Phone Number" placeholder="01xxxxxxxxx" />
        <DateTimePickerPrimary label="Date Of Birth" />

        <InputUnderlined
          label="Bio"
          placeholder="Short description about yourself"
          multiline={true}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
