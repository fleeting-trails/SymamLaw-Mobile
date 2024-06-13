import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import FormData from "form-data";
import {
  CameraIcon,
  CrossIcon,
  DeleteIcon,
  GalleryIcon,
} from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import { ImagePickerOptions, ImagePickerResult } from "expo-image-picker";
import { CameraType } from "expo-image-picker";
import { base64ToBlob } from "../../utils/helpers";
import { useAppDispatch } from "../../redux/hooks";
import {
  updateProfile,
  updateProfileImage,
} from "../../redux/slices/auth/auth";
import AlertPrimary from "../../atoms/Alert/AlertPrimary";

export function AvatarImagePicker({
  existingImage,
  onUpload,
}: PropTypes.AvatarImagePicker) {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { height, width } = Dimensions.get("screen");
  const styles = createStyles({ theme, height, width });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [asset, setAsset] = useState<null | ImagePicker.ImagePickerAsset>(null);
  const [image, setImage] = useState<ImagePickerResult | null>(null);
  const [blob, setBlob] = useState<null | Blob>(null);
  const [uploadError, setUploadError] = useState("");
  const [currentScreen, setCurrentScreen] = useState<
    "upload" | "loading" | "save"
  >("upload");

  useEffect(() => {
    if (existingImage) {
      setImagePreview(existingImage);
    }
  }, [existingImage]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const pickImage = async (mode: "gallery" | "camera") => {
    // No permissions request is necessary for launching the image library
    const config: ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      cameraType: CameraType.front,
      base64: true,
    };
    if (mode === "gallery") {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCurrentScreen("loading");
      let result = await ImagePicker.launchImageLibraryAsync(config);
      afterUpload(result);
    } else if (mode === "camera") {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync(config);
      afterUpload(result);
    }
    setCurrentScreen("save");
  };
  const afterUpload = (result: ImagePickerResult) => {
    if (!result.canceled) {
      setImage(result);
      const asset = result.assets[0];
      const blob = base64ToBlob(asset.base64 as string, asset.mimeType);
      
      setAsset(result.assets[0]);
      setBlob(blob);
      if (onUpload) onUpload({ result: result, blob: blob });
      setImagePreview(result.assets[0].uri);
    }
  };
  const deleteImage = () => {
    setImagePreview(null);
    setImage(null);
    if (onUpload) onUpload(null);
  };
  const cancelImageUpload = () => {
    setImagePreview(existingImage ?? null);
    setImage(null);
    if (onUpload) onUpload(null);
    setCurrentScreen("upload");
  };
  const saveImageToProfile = async () => {
    if (blob) {
      const formData = new FormData();
      formData.append("image", {
        uri: asset?.uri,
        type: asset?.mimeType,
        name: asset?.fileName
      });
      try {
        await dispatch(updateProfileImage(formData));
        setCurrentScreen("upload");
        setPickerOpen(false);
      } catch (error) {
        setUploadError("Failed to upload profile image");
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        {imagePreview ? (
          <Image style={styles.image} source={{ uri: imagePreview }} />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/empty-avatar.jpg")}
          />
        )}
        <TouchableRipple
          style={styles.cameraButton}
          onPress={() => setPickerOpen(true)}
        >
          <CameraIcon color={theme.colors.textLight} />
        </TouchableRipple>
      </View>

      <Modal visible={pickerOpen} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.overlayHeading}>
            <TouchableRipple
              style={styles.overlayCrossButton}
              onPress={() => setPickerOpen(false)}
            >
              <CrossIcon />
            </TouchableRipple>
            <CustomText style={styles.overlayTitle}>Profile Photo</CustomText>
          </View>
          <View style={styles.overlayAvatarContainer}>
            {imagePreview ? (
              <Image
                style={styles.overlayAvatar}
                source={{ uri: imagePreview }}
              />
            ) : (
              <Image
                style={styles.overlayAvatar}
                source={require("../../assets/empty-avatar.jpg")}
              />
            )}
          </View>
          {currentScreen === "upload" && (
            <View style={styles.overlayActionsContainer}>
              <TouchableRipple onPress={() => pickImage("camera")}>
                <View style={styles.overlayActionButtonContainer}>
                  <CameraIcon />
                  <CustomText lightText={!theme.dark}>Camera</CustomText>
                </View>
              </TouchableRipple>
              <View style={styles.overlayActionButtonsDivider}></View>
              <TouchableRipple onPress={() => pickImage("gallery")}>
                <View style={styles.overlayActionButtonContainer}>
                  <GalleryIcon scale={0.85} />
                  <CustomText lightText={!theme.dark}>Choose</CustomText>
                </View>
              </TouchableRipple>
              <View style={styles.overlayActionButtonsDivider}></View>
              <TouchableRipple onPress={deleteImage}>
                <View style={styles.overlayActionButtonContainer}>
                  <DeleteIcon />
                  <CustomText lightText={!theme.dark}>Delete</CustomText>
                </View>
              </TouchableRipple>
            </View>
          )}
          {currentScreen === "loading" && (
            <View style={styles.overlayLoadingContainer}>
              <ActivityIndicator />
              <CustomText lightText>Uploading</CustomText>
            </View>
          )}
          {currentScreen === "save" && (
            <>
              {uploadError && (
                <View style={{ marginBottom: 20 }}>
                  <AlertPrimary
                    lightText={true}
                    label="Failed to upload image"
                    type="error"
                  />
                </View>
              )}
              <View style={styles.overlaySaveContainer}>
                <TouchableRipple onPress={saveImageToProfile}>
                  <View style={styles.overlaySaveButton}>
                    <CustomText>Save Profile Image</CustomText>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={cancelImageUpload}>
                  <View style={styles.overlayCancelButton}>
                    <CustomText style={{ color: theme.colors.textLight }}>
                      Cancel
                    </CustomText>
                  </View>
                </TouchableRipple>
              </View>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}

const createStyles = ({
  theme,
  height,
  width,
}: {
  theme: Config.Theme;
  height: number;
  width: number;
}) => {
  return StyleSheet.create({
    container: {
      position: "relative",
      height: 110,
      width: 110,
    },
    image: {
      height: 110,
      width: 110,
      objectFit: "contain",
      backgroundColor: "white",
      borderRadius: 100,
    },
    cameraButton: {
      position: "absolute",
      height: 32,
      width: 32,
      borderRadius: 30,
      backgroundColor: theme.colors.primary,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      height: height,
      width,
      backgroundColor: theme.colors.backgroundPrimaryLight,
      position: "absolute",
      paddingVertical: 100,
      paddingHorizontal: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 3000,
    },
    overlayHeading: {
      flexDirection: "row",
      alignItems: "center",
    },
    overlayCrossButton: {
      height: 28,
      width: 28,
      borderRadius: 28,
      backgroundColor: theme.colors.primaryGray,
      justifyContent: "center",
      alignItems: "center",
    },
    overlayTitle: {
      flex: 1,
      color: "white",
      fontSize: 18,
      textAlign: "center",
    },
    overlayAvatarContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    overlayAvatar: {
      height: 300,
      width: 300,
      borderRadius: 300,
      objectFit: "contain",
      backgroundColor: "white",
    },
    overlayActionsContainer: {
      flexDirection: "row",
      gap: 30,
      alignItems: "center",
      alignSelf: "center",
    },
    overlayActionButtonContainer: {
      gap: 4,
      alignItems: "center",
    },
    overlayActionButtonsDivider: {
      height: 24,
      width: 1,
      backgroundColor: theme.colors.primaryGray,
    },
    overlayLoadingContainer: {
      alignItems: "center",
    },
    overlaySaveContainer: {
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
    },
    overlaySaveButton: {
      backgroundColor: theme.colors.background,
      color: theme.colors.textLight,
      width: 150,
      paddingVertical: 15,
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
    },
    overlayCancelButton: {
      backgroundColor: theme.colors.error,
      width: 150,
      paddingVertical: 15,
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
    },
  });
};
