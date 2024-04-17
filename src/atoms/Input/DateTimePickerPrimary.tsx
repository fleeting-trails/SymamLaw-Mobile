import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../CustomText/CustomText";
import moment from "moment";

export default function DateTimePickerPrimary({
  label,
}: PropTypes.DateTimePickerPrimary) {
  const [date, setDate] = useState<Date | null>(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const handleDateChange = (date: Date) => {
    if (date) {
      setDate(date);
      setDatePickerVisible(false);
    }
  };
  return (
    <>
      <View style={styles.container}>
        {label && (
          <CustomText style={styles.labelStyle} variant="400">
            {label}
          </CustomText>
        )}
        <View style={styles.textContainerStyle}>
          <CustomText
            style={styles.textStyle}
            onPress={() => setDatePickerVisible(true)}
          >{`${
            date ? moment(date).format("LL") : "Month (Date), Year"
          }`}</CustomText>
        </View>
      </View>
      {Platform.OS === "ios" ? (
        <Modal visible={datePickerVisible} transparent={true}>
          <View
            style={styles.modalOverlay}
            onTouchEnd={() => setDatePickerVisible(false)}
          />
          <View style={styles.modalContentContainer}>
            <View style={styles.modalContent}>
              <CustomText>Pick Birth Date</CustomText>
              <DateTimePicker
                value={date ?? new Date()}
                onChange={(e, date) => {
                  if (date) handleDateChange(date);
                }}
                mode="date"
                style={{
                  marginLeft: -15,
                }}
              />
            </View>
          </View>
        </Modal>
      ) : (
        datePickerVisible && <DateTimePicker
          value={date ?? new Date()}
          onChange={(e, date) => {
            if (date) handleDateChange(date);
          }}
          mode="date"
          style={{
            marginLeft: -15,
          }}
        />
      )}
    </>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      justifyContent: "flex-start",
    },
    labelStyle: {
      fontSize: 14,
      color: theme.colors.primaryGray,
    },
    textStyle: {
      paddingVertical: 6,
      color: theme.colors.text,
    },
    textContainerStyle: {
      paddingTop: 6,
      borderBottomColor: theme.colors.primaryGrayLight,
      //   borderWidth: 1,
      borderRadius: 3,
      borderBottomWidth: 1.5,
    },
    modalOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "#00000057",
    },
    modalContentContainer: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      height: 300,
      width: "80%",
      backgroundColor: theme.colors.background,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      gap: 12,
    },
  });
};
