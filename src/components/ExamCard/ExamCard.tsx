import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CaretRightIcon, ExamIcon } from "../../assets/Icons";
import CustomText from "../../atoms/CustomText/CustomText";
import { TouchableRipple, useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { formatMinutesToHourMinute } from "../../utils/helpers";

export default function ExamCard({ data } : PropTypes.ExamCard) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });
  return (
    <TouchableRipple>
      <View style={styles.container}>
        <ExamIcon color={theme.colors.primary} />
        <View style={styles.details}>
          <CustomText variant="300" style={styles.title}>
            {data.name}
          </CustomText>
          <CustomText variant="300" style={styles.metaInfo}>
            {`Duration: ${formatMinutesToHourMinute(data.duration)} | Question: ${(data.totalQuestions)}`}
          </CustomText>
        </View>
        <View>
          <Button textColor={theme.colors.textPrimary} onPress={() => console.log("Pressed")}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                <CustomText variant="300">Start Now</CustomText>
                <CaretRightIcon color={theme.colors.textPrimary} />
            </View>
          </Button>
        </View>
      </View>
    </TouchableRipple>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      padding: 14,
      flexDirection: "row",
      gap: 16,
      borderColor: theme.colors.primaryGray,
      borderWidth: 0.5,
      borderRadius: 2,
      alignItems: 'center'
    },
    details: {
      flex: 1,
    },
    title: {
      fontSize: 16,
    },
    metaInfo: {
      fontSize: 10,
    },
  });
};
