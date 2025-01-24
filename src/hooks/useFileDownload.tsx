import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { Buffer } from "buffer";
import { useState } from "react";

const useFileDownload = ({ extension }: PropTypes.useFileDownload) => {
  const [fileUri, setFileUri] = useState<string | null>(null);
  async function requestMediaLibraryPermission() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to access the Media Library is required!");
    }

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    return permissions;
  }

  async function download(data: string | ArrayBuffer) {
    try {
      const permissions = await requestMediaLibraryPermission();

      const directoryUri = `${FileSystem.documentDirectory}temp_certs/`;
      const path = `${directoryUri}${new Date().getTime()}.${extension}`;
      const publicFilePath = `${FileSystem.cacheDirectory}file.pdf`;
      const dirInfo = await FileSystem.getInfoAsync(directoryUri);
      if (!dirInfo.exists) {
        // Create the directory
        console.log("Directory does not exist. Creating...");
        await FileSystem.makeDirectoryAsync(directoryUri, {
          intermediates: true,
        });
        console.log("Directory created:", directoryUri);
      } else {
        console.log("Directory already exists:", directoryUri);
      }
      // const reader = new FileReader();
      // reader.onload = async () => {
      //     const base64 = reader.result as string;
      //     console.log("Converted to base64", base64)
      //     await FileSystem.writeAsStringAsync(path, base64, {
      //         encoding: FileSystem.EncodingType.Base64,
      //     });
      //     Alert.alert("Download complete", `File saved to ${path}`);
      // };

      // Convert ArrayBuffer to Base64 if necessary
      let base64Data;
      if (data instanceof ArrayBuffer) {
        const buffer = Buffer.from(data);
        base64Data = buffer.toString("base64");
        if (base64Data.startsWith("data:application/pdf;base64,")) {
          base64Data = base64Data.replace("data:application/pdf;base64,", "");
        }
      } else {
        base64Data = data;
      }

      // Save the file
      await FileSystem.writeAsStringAsync(path, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Check if the file exists
      const fileExists = await FileSystem.getInfoAsync(path);
      if (!fileExists.exists) {
        throw new Error(`File does not exist at path: ${path}`);
      }
      console.log("Saving file to path", path);
      const fileInfo = await FileSystem.getInfoAsync(path);
      console.log("File info:", fileInfo);
      setFileUri(fileInfo.uri);
      if (!permissions)
        Alert.alert("Failed to save file", `Permission denied to save file`);
      console.log("Directory uri", permissions!.directoryUri);
      const assetUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions!.directoryUri,
        fileInfo.uri,
        "application/pdf"
      );
      // Write the Base64 content to the public asset
      await FileSystem.writeAsStringAsync(assetUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // await Sharing.shareAsync(path);

      Alert.alert("Download complete", `File saved to ${publicFilePath}`);
    } catch (error) {
      console.error("Error saving the file:", error);
      //   Alert.alert("Error", "Failed to save the file.");
    }
  }

  return { download, fileUri };
};

export default useFileDownload;
