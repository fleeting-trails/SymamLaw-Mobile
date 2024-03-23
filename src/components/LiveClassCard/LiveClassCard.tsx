import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import CustomText from "../../atoms/CustomText/CustomText";
import { DateIcon, RegisterIcon, SpeakerIcon } from "../../assets/Icons";
import { useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { truncateString } from "../../utils/helpers";

export default function LiveClassCard() {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });
  return (
    <LinearGradient colors={[theme.colors.backgroundPrimary, theme.colors.backgroundPrimaryLight]} locations={[0, 0.4]} style={styles.container}>
      <Image style={styles.image} source={require("../../assets/dev/live-class.png")} />
      <View style={styles.content}>
        <CustomText variant="700" style={styles.heading}>Bar-at-law Exam Guides & Strategies</CustomText>
        <CustomText variant="300" style={styles.description} >
          {truncateString("In this session you will learn a lot of different strategies to excel in bar at law exam. Also expert suggestions about common mistakes and how to overcome those", 100)}
        </CustomText>
        <View style={styles.metaInfoContainer}>
          <SpeakerIcon color={'#ffffff'} />
          <CustomText variant="500" style={{ color: "#ffffff", fontSize: 10 }}>Speaker</CustomText>
          <CustomText style={{ color: "#ffffff", fontSize: 10 }}>Mr. Symam</CustomText>
        </View>
        <View style={styles.metaInfoContainer}>
          <DateIcon color={'#ffffff'} />
          <CustomText style={{ color: "#ffffff", fontSize: 10 }}>15th April, 2024</CustomText>
        </View>
        <View style={styles.actionContainer}>
            <PrimaryButton 
                text="Register Now"
                size="small"
                color="light"
                icon={<RegisterIcon color={theme.colors.text}/>}
                onPress={() => console.log("Something pressed")}
            />
        </View>
      </View>
    </LinearGradient>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 9,
      padding: 7,
      borderRadius: 3
    },
    image: {
      height: '100%',
      width: 150,
      objectFit: "cover",
    },
    content: {
        flex: 1,
        gap: 7
    },
    heading: {
        color: "#ffffff"
    },
    description: {
        color: "#ffffff",
        fontSize: 10
    },
    metaInfoContainer: {
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center'
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 7
    }
    
  });
};
