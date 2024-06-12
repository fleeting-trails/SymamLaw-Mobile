import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { AvatarImagePicker, ScreenContainer } from "../../components";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { InputUnderlined } from "../../atoms";
import DateTimePickerPrimary from "../../atoms/Input/DateTimePickerPrimary";
import ListInput from "../../atoms/Input/ListInput";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomText from "../../atoms/CustomText/CustomText";
import useAppNavigation from "../../hooks/useAppNavigation";
import SwitchPrimary from "../../atoms/Input/SwitchPrimary";
import { ImagePickerResult } from "expo-image-picker";
import { updateProfile } from "../../redux/slices/auth/auth";
import AlertPrimary from "../../atoms/Alert/AlertPrimary";

type ProfileInputType = {
  name: string,
  phone: string,
  address: string,
  institute: string,
  department: string,
  is_graduated: boolean
}

export default function Account() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const user = authState.user;
  const storeError = authState.error;
  const submitLoading = authState.loading.updateProfile
  
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [input, setInput] = useState<ProfileInputType>({
    name: "",
    phone: "",
    address: "",
    institute: "",
    department: "",
    is_graduated: false
  })

  useEffect(() => {
    if (user) {
      setInput({
        name: user.name,
        phone: user.phone,
        address: user.address,
        institute: user.student_details.institute,
        department: user.student_details.department,
        is_graduated: user.student_details.is_graduated === '1' ? true : false
      })
    }
  }, [user])

  const handleSubmit = async () => {
    const formData = new FormData();
    if (!input.name) {
      setError("Name Cannot be empty");
      return;
    }
    if (input.name) formData.append("name", input.name);
    formData.append("phone", input.phone ?? "");
    formData.append("address", input.address ?? "");
    formData.append("institute", input.institute ?? "");
    formData.append("department", input.department ?? "");
    formData.append("is_graduated", input.is_graduated ? '1' : '0');
    try {
      await dispatch(updateProfile(formData)).unwrap();
      
    } catch (error) {
      console.log("Error", error)
      setError(storeError)
    }
  }


  const handleInputChange = (key: keyof ProfileInputType, value: string ) => {
    setInput({
      ...input,
      [key]: value
    })
  }
  const { navigate } = useAppNavigation();
  return user ? (
    <ScreenContainer style={styles.container}>
      <View style={styles.imageUploadContainer}>
        <AvatarImagePicker existingImage={user.image} onUpload={(res) => setAvatar(res?.blob ?? null)} />
      </View>
      {error && <AlertPrimary label={error} type="error" />}
      <InputUnderlined
        value={input.name}
        onChangeText={(text) => handleInputChange("name", text)}
        label="Full Name"
        placeholder="Write your fullname..."
      />
      <InputUnderlined
        value={input.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
        label="Phone Number"
        placeholder="01xxxxxxxxx"
      />
      <InputUnderlined
        value={input.address}
        onChangeText={(text) => handleInputChange("address", text)}
        label="Address"
        placeholder="Address Line"
      />
      <InputUnderlined
        value={input.institute}
        onChangeText={(text) => handleInputChange("institute", text)}
        label="Current Institution"
        placeholder="Name of your university/college"
      />
      <InputUnderlined
        value={input.department}
        onChangeText={(text) => handleInputChange("department", text)}
        label="Department"
        placeholder="Name of the department at your current institute"
      />
      <SwitchPrimary 
        label="Are You Graduated?"
        value={input.is_graduated}
        onValueChange={() => setInput({ ...input, is_graduated: !input.is_graduated })}
      />
      {/* <DateTimePickerPrimary label="Date Of Birth" />

      <ListInput label="Interests" />
      <InputUnderlined
        label="Bio"
        placeholder="Short description about yourself"
        multiline={true}
      /> */}
      <PrimaryButton text="Update" color="primary" loading={submitLoading} onPress={handleSubmit} />
    </ScreenContainer>
  ) : (
    <ScreenContainer
      style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <CustomText>Please Login First</CustomText>
      <PrimaryButton
        onPress={() => navigate("Login")}
        color="primary"
        text="Login"
      />
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
