import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CaretRightIcon, ExamIcon, LockIcon } from "../../assets/Icons";
import CustomText from "../../atoms/CustomText/CustomText";
import { TouchableRipple, useTheme } from "react-native-paper";
import { Button } from "react-native-paper";
import { formatMinutesToHourMinute } from "../../utils/helpers";
import { useAppSelector } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";
import PrimaryButton from "../../atoms/Button/PrimaryButton";

export default function ExamCard({ data, onPress }: PropTypes.ExamCard) {
  const theme = useTheme<Config.Theme>();
  const { navigate } = useAppNavigation();
  const styles = createStyles({ theme });
  const user = useAppSelector((state) => state.auth.user);
  const [isExamLocked, setIsExamLocked] = useState(false);
  const handleStartPress = () => {
    if (onPress) {
      onPress(data.id, data.slug);
    }
    if (user) {
      if (isExamLocked) {
        navigate("PackageSingle", { ids: data.package_items.map(item => item.package_id) }) // Have to implement this navigate screen
      } else {
        navigate("ExamStart", { slug: data.slug })
      }
    } else {
      navigate("Login");
    }
  };

  useEffect(() => {
    if (user && data) {
      const foundSubscription = data.package_items?.find((pkg) =>
        user.current_subscriptions?.find(
          (sub) => `${pkg.package_id}` === `${sub.package_id}`
        )
          ? true
          : false
      );

      if (!data.is_free && data.package_items?.length !== 0) {
        setIsExamLocked(foundSubscription ? false : true);
      } else {
        setIsExamLocked(false);
      }
    }
  }, [user, data]);
  return (
    <TouchableRipple>
      <View style={styles.container}>
        <ExamIcon color={theme.colors.primary} />
        <View style={styles.details}>
          <CustomText variant="300" style={styles.title}>
            {data.name}
          </CustomText>
          <CustomText variant="300" style={styles.metaInfo}>
            {`Duration: ${formatMinutesToHourMinute(
              data.duration
            )} | Question: ${data.totalQuestions}`}
          </CustomText>
        </View>
        <View>
          {isExamLocked ? (
            <PrimaryButton
              text="Subscribe"
              icon={<LockIcon scale={0.8} />}
              color="primary"
              size="small"
              style={{ borderRadius: 30 }}
              onPress={handleStartPress}
            />
          ) : (
            <Button textColor={theme.colors.textPrimary} onPress={handleStartPress}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
              >
                <CustomText variant="300">Start Now</CustomText>
                <CaretRightIcon color={theme.colors.textPrimary} />
              </View>
            </Button>
          )}
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
      alignItems: "center",
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
