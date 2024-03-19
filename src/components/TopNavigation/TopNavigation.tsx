import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import React from "react";
import { HamburgerIcon, NotificationIcon, UserIcon } from "../../assets/Icons";
import { Button, IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { IconButtonCustom } from "../../atoms";

const BlankAvatar = require('../../assets/blank-avatar.jpeg');

export function TopNavigation({ loggedIn, setSidenavOpen }: PropTypes.TopNavigation) {
  const theme = useTheme<Config.Theme>();
  const styles = createStyles({ theme });
  const handleNotificationIconPress = () => {
    console.log("Notification icon pressed");
  };
  const handleHamburgerClick = () => {
    setSidenavOpen(true)
  }
  return (
    <View style={styles.container}>
      <IconButtonCustom onPress={handleHamburgerClick}>
        <HamburgerIcon color={theme.colors.primary} />
      </IconButtonCustom>
      <View style={styles.actionIconsContainer}>
        {loggedIn && <IconButtonCustom onPress={handleNotificationIconPress}>
          <NotificationIcon color={theme.colors.primaryGray} />
        </IconButtonCustom> }
        {!loggedIn ? (
          <IconButtonCustom onPress={handleNotificationIconPress}>
            <UserIcon color={theme.colors.primaryGray} />
          </IconButtonCustom>
        ) : (
          <Image source={BlankAvatar} style={styles.avatarImage}/>
        )}
      </View>
    </View>
  );
}

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      width: "100%",
      height: 60,
      backgroundColor: "white",
      zIndex: 1000,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 10
    },
    actionIconsContainer: {
      flexDirection: "row",
      alignItems: 'center',
      gap: 10,
    },
    avatarImage: {
      height: 30,
      width: 30,
      borderRadius: 30,
      objectFit: 'cover'
    }
  });
};
