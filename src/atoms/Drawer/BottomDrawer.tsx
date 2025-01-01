import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CustomText from "../CustomText/CustomText";
import PrimaryButton from "../Button/PrimaryButton";
import useAppTheme from "../../hooks/useAppTheme";
import { CrossIcon } from "../../assets/Icons";

const SubText = ({
  borderWidth,
  borderColor,
  text,
  size,
  color,
  family,
  letterSpacing,
  align = "left",
  leading,
}: any) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontFamily: family,
        letterSpacing: letterSpacing ? letterSpacing : -0.02,
        textAlign: align,
        lineHeight: leading,
        borderWidth: borderWidth,
        borderColor: borderColor,
      }}
    >
      {text}
    </Text>
  );
};

export default function BottomDrawer({
  open,
  setOpen,
  children,
}: PropTypes.BottomDrawer) {
  const theme = useAppTheme();
  const styles = createStyles({ theme });

  // We need to get the height of the phone and use it relatively,
  // This is because height of phones vary
  const windowHeight = Dimensions.get("window").height;

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setOpen(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      // We use the state here to toggle visibility of Bottom Sheet
      visible={open}
      // We pass our function as default function to close the Modal
      onRequestClose={handleCloseBottomSheet}
    >
      <View
        className="bg-black/40"
        style={{ height: windowHeight }}
        onTouchEnd={handleCloseBottomSheet}
      ></View>
      <View style={[styles.bottomSheet, { height: windowHeight * 0.6 }]}>
        <View
          style={{
            flex: 0,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <SubText
            text={"Preview"}
            family={"Poppins-med"}
            size={16}
            color={"#86827e"}
          />
          <TouchableOpacity onPress={handleCloseBottomSheet}>
            <CrossIcon color="black" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomSheet: {
      position: "absolute",
      left: 0,
      right: 0,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "white",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingVertical: 23,
      paddingHorizontal: 25,
      bottom: 0,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
  });
};
