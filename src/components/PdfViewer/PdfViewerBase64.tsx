import * as FileSystem from "expo-file-system";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const { cacheDirectory, writeAsStringAsync, deleteAsync, getInfoAsync, EncodingType } = FileSystem;

const pdfPath = `${cacheDirectory}file.pdf`;

async function writePDFAsync(base64: string) {
  await writeAsStringAsync(
    pdfPath,
    base64.replace("data:application/pdf;base64,", ""),
    { encoding: EncodingType.Base64 }
  );
}

async function removePdfFile() {
  const { exists } = await getInfoAsync(pdfPath);
  if (exists) {
    await deleteAsync(pdfPath, { idempotent: true });
  }
}

const Loader = () => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
    }}
  >
    <ActivityIndicator size="large" />
  </View>
);

const PdfViewerBase64 = ({
  base64,
  style,
  webviewStyle,
  webviewProps,
  noLoader = false,
  onLoad,
  onLoadEnd,
  onError = console.error,
}: {
  base64: string;
  style?: View["props"]["style"];
  webviewStyle?: WebView["props"]["style"];
  webviewProps?: WebView["props"];
  noLoader?: boolean;
  onLoad?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: any) => void;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        var altered = base64;
        if (!base64.startsWith("data:application/pdf;base64,")) {
            altered = "data:application/pdf;base64," + base64
        }
        await writePDFAsync(altered);
        setReady(true);
        // if (base64.startsWith("data:application/pdf;base64,")) {
        //   await writePDFAsync(base64);
        //   setReady(true);
        // } else {
        //   throw new Error("Invalid Base64 PDF format");
        // }
      } catch (error) {
        onError(error);
      }
    };

    initialize();

    return () => {
      removePdfFile();
    };
  }, [base64]);

  const source = useMemo(() => ({ uri: pdfPath }), [ready]);

  return ready ? (
    <View style={[styles.container, style]}>
      <WebView
        {...{
          onError,
          onHttpError: onError,
          onLoad: () => {
            if (onLoad) onLoad();
          },
          onLoadEnd,
          originWhitelist: ["*"],
          source,
          style: [styles.webview, webviewStyle],
        }}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        scalesPageToFit={Platform.select({ android: false })}
        mixedContentMode="always"
        sharedCookiesEnabled={false}
        startInLoadingState={!noLoader}
        renderLoading={() => (!noLoader ? <Loader /> : <View />)}
        {...webviewProps}
      />
    </View>
  ) : (
    <View style={styles.loaderContainer}>{!noLoader && <Loader />}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300
  },
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  webview: {
    flex: 1,
  },
});

export default PdfViewerBase64;
