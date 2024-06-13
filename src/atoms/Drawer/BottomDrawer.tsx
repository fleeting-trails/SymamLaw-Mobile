import { useState } from "react";
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

export default function BottomDrawer() {
  const theme = useAppTheme();
  const styles = createStyles({ theme });

  // We need to get the height of the phone and use it relatively,
  // This is because height of phones vary
  const windowHeight = Dimensions.get("window").height;

  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };
  return (
    <View>
      <PrimaryButton text="Open Modal" onPress={handleOpenBottomSheet} />

      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
        // We pass our function as default function to close the Modal
        onRequestClose={handleCloseBottomSheet}
      >
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
              <CrossIcon color="black"/>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 16 }}>
            <SubText
              text={"Unyime Emmanuel"}
              family={"PoppinsSBold"}
              color={"#292929"}
              size={18}
            />
            <SubText
              text={`I'm a Software Engineer and Technical Writer, I've had the TypeScript epiphany!. Oh, I play Chess too!`}
              family={"Poppins"}
              color={"#86827e"}
              size={14}
            />

            <View
              style={{
                opacity: 0.2,
                height: 1,
                borderWidth: 1,
                borderColor: "#86827e",
                marginVertical: 16,
              }}
            />
            <View
              style={{
                flex: 0,
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SubText
                text={"24"}
                color={"#292929"}
                family={"PoppinsSBold"}
                size={24}
              />
              <SubText
                text={" articles written"}
                color={"#86827e"}
                size={14}
                family={"Poppins-med"}
              />
            </View>

            <View style={{ paddingTop: 16 }}>
              <SubText
                text={"Views (30 days)"}
                color={"#86827e"}
                size={12}
                family={"Poppins-med"}
              />
              <SubText
                text={"4,904"}
                color={"#292929"}
                family={"PoppinsSBold"}
                size={18}
              />
            </View>

            <View style={{ paddingTop: 16 }}>
              <SubText
                text={"Views (30 days)"}
                color={"#86827e"}
                size={12}
                family={"Poppins-med"}
              />
            </View>

            <View style={{ paddingTop: 16 }}>
              <SubText
                text={"Reads (30 days)"}
                color={"#86827e"}
                size={12}
                family={"Poppins-med"}
              />
            </View>

            <View style={{ paddingTop: 16, flex: 0, flexDirection: "row" }}>
              <View style={{ paddingLeft: 12 }} />
              <SubText
                text={"Medium"}
                color={"#86827e"}
                size={14}
                family={"Poppins-med"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
      borderColor: "red",
    },
  });
};
