import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import {
  CaretLeftIcon,
  CartIcon,
  HamburgerIcon,
  LogoutIcon,
  NotificationIcon,
  UserIcon,
} from "../../assets/Icons";
import { Menu, Divider, IconButton, TouchableRipple } from "react-native-paper";
import { useTheme, Modal, Portal } from "react-native-paper";
import { IconButtonCustom } from "../../atoms";
import { Link, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useAppNavigation from "../../hooks/useAppNavigation";
import { logout } from "../../redux/slices/auth/auth";
import CustomText from "../../atoms/CustomText/CustomText";
import PrimaryButton from "../../atoms/Button/PrimaryButton";

const BlankAvatar = require("../../assets/blank-avatar.jpeg");

export function TopNavigation({
  loggedIn,
  setSidenavOpen,
}: PropTypes.TopNavigation) {
  const theme = useTheme<Config.Theme>();
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => state.header);
  const { navigate, navigator } = useAppNavigation();
  const user = useAppSelector((state) => state.auth.user);
  const checkoutItemsTotal = useAppSelector((state) => state.checkout.items.length);
  const styles = createStyles({ theme });
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [notificationDropdownVisible, setNotificationDropdownVisible] =
    useState(false);
  const [logoutFailedModal, setLogoutFailedModal] = useState(false);
  const handleUserIconPress = () => {
    setProfileMenuVisible(true);
  };
  const handleNotificationIconPress = () => {
    setNotificationDropdownVisible(false);
  };
  const handleCartIconPress = () => {
    navigate("Cart");
  };
  const handleHamburgerClick = () => {
    setSidenavOpen(true);
  };
  const handleNavigateBack = (goBackFunc: any) => {
    if (goBackFunc) goBackFunc();
  };
  const handleMenuClick = async (screen: string) => {
    navigate(screen);
    setProfileMenuVisible(false);
  };
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("Login");
    } catch (error) {
      setLogoutFailedModal(true);
    }
  };
  return (
    header.enabled && (
      <>
        <View style={styles.container}>
          <View style={styles.leftActionIconsContainer}>
            {/* {navigator.canGoBack() && (
              <IconButton
                icon={() => <CaretLeftIcon color={theme.colors.textPrimary} />}
                onPress={() => handleNavigateBack(navigator.goBack())}
              />
            )} */}
            <IconButtonCustom onPress={handleHamburgerClick}>
              <HamburgerIcon color={theme.colors.primary} />
            </IconButtonCustom>
          </View>
          <View style={styles.actionIconsContainer}>
            {user && (
              <View className="relative">
                {checkoutItemsTotal !== 0 && <View className="absolute -top-0 -right-0 bg-red-600 items-center justify-center h-4 w-4 rounded-full">
                  <CustomText className="text-white">{checkoutItemsTotal}</CustomText>
                </View>}
                <IconButtonCustom onPress={handleCartIconPress}>
                  {/* <NotificationIcon color={theme.colors.primaryGray} /> */}
                  <CartIcon color={theme.colors.primaryGray} scale={1.3} />
                </IconButtonCustom>
              </View>
            )}
            {!user ? (
              <Menu
                visible={profileMenuVisible}
                onDismiss={() => setProfileMenuVisible(false)}
                anchor={
                  <IconButtonCustom onPress={handleUserIconPress}>
                    <UserIcon color={theme.colors.primaryGray} />
                  </IconButtonCustom>
                }
              >
                <Menu.Item
                  leadingIcon="login"
                  onPress={() => handleMenuClick("Login")}
                  title="Login"
                />
                <Menu.Item
                  leadingIcon="book"
                  onPress={() => handleMenuClick("Register")}
                  title="Register"
                />
              </Menu>
            ) : (
              <Menu
                visible={profileMenuVisible}
                onDismiss={() => setProfileMenuVisible(false)}
                anchor={
                  <TouchableRipple onPress={handleUserIconPress}>
                    {user.image ? (
                      <Image src={user.image} style={styles.avatarImage} />
                    ) : (
                      <Image source={BlankAvatar} style={styles.avatarImage} />
                    )}
                  </TouchableRipple>
                }
              >
                <Menu.Item
                  leadingIcon={() => (
                    <UserIcon color={theme.colors.primaryGray} />
                  )}
                  onPress={() => handleMenuClick("Account")}
                  title="Profile"
                />
                <Menu.Item
                  leadingIcon={() => <LogoutIcon color={theme.colors.error} />}
                  onPress={handleLogout}
                  title="Logout"
                  titleStyle={{ color: theme.colors.error }}
                />
              </Menu>
            )}
          </View>
        </View>
        <View style={styles.spacer}></View>
        <Portal>
          <Modal
            visible={logoutFailedModal}
            contentContainerStyle={styles.modalContainerStyle}
          >
            <View style={styles.modalStyle}>
              <Image
                source={require("../../assets/internal_error.png")}
                style={styles.modalImage}
              />
              <CustomText style={{ fontSize: 18 }} variant="500">
                Failed to logout!
              </CustomText>
              <CustomText>
                Something went wrong, cannot log out! Sorry if this is a fault
                from our part, we will be fixing this as soon as possible
              </CustomText>
              <PrimaryButton
                color="primary"
                text="Close"
                onPress={() => setLogoutFailedModal(false)}
              />
            </View>
          </Modal>
        </Portal>
      </>
    )
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
      backgroundColor: theme.colors.background,
      zIndex: 1000,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 10,
    },
    leftActionIconsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionIconsContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    avatarImage: {
      height: 30,
      width: 30,
      borderRadius: 30,
      objectFit: "cover",
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    spacer: {
      height: 60,
    },
    modalContainerStyle: {
      backgroundColor: "white",
      padding: 20,
      width: "80%",
      alignSelf: "center",
    },
    modalStyle: {
      width: "100%",
      alignItems: "center",
      gap: 20,
    },
    modalImage: {
      height: 100,
      objectFit: "contain",
    },
  });
};
