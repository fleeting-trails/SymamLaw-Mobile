import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomText from "../../atoms/CustomText/CustomText";
import { Divider } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import { listNotices } from "../../redux/slices/notice/noticeSlice";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import moment from "moment";
import useAppTheme from "../../hooks/useAppTheme";

export default function Notices() {
  const styles = createStyles();
  const dispatch = useAppDispatch();
  const noticeState = useAppSelector((state) => state.notice);
  const notices = noticeState.notices.data;
  const loading = noticeState.loading.listNotices;

  useEffect(() => {
    dispatch(listNotices());
  }, []);

  const handlePress = (data: Store.NoticeListData) => {};
  return (
    <ScreenLoading isLoading={loading}>
      <ScreenContainerNonScroll>
        <FlatList
          data={notices}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View>
              <NoticeCard data={item} onPress={handlePress} />
              <Divider className="my-2" />
            </View>
          )}
          numColumns={1}
        />
      </ScreenContainerNonScroll>
    </ScreenLoading>
  );
}

type NoticeCardProps = {
  data: Store.NoticeListData;
  onPress: (data: Store.NoticeListData) => void;
};
const NoticeCard = ({ data }: NoticeCardProps) => {
    const theme = useAppTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }} className="flex flex-row rounded-lg shadow-md p-4 items-center">
      <View className="bg-blue-900 rounded-lg px-4 py-2">
        <CustomText className="text-white text-lg font-bold">{moment(data.start_date).format("DD")}</CustomText>
        <CustomText className="text-white text-sm">{moment(data.start_date).format("MMM")}</CustomText>
      </View>
      <CustomText className="ml-4 text-black font-semibold text-base w-[80%]">
        {data.title}
      </CustomText>
    </View>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
