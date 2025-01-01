import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchNoticeDetails } from "../../redux/slices/notice/noticeSlice";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import CustomText from "../../atoms/CustomText/CustomText";
import { ScreenContainer } from "../../components";
import moment from "moment";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import { Divider } from "react-native-paper";

export default function NoticeDetails({ route }: PropTypes.NoticeDetails) {
  const { slug } = route.params;
  const styles = createStyles();
  const dispatch = useAppDispatch();
  const noticeState = useAppSelector((state) => state.notice);
  const notice = noticeState.currentNotice;
  const loading = noticeState.loading.fetchNoticeDetails;

  useEffect(() => {
    dispatch(fetchNoticeDetails(slug));
  }, []);

  return (
    <ScreenLoading isLoading={loading}>
      {notice && (
        <ScreenContainer>
          <View className="flex-1 bg-white px-4 py-6">
            {/* Header Section */}
            <View className="flex flex-row justify-between items-center">
              <CustomText className="text-black text-2xl font-bold flex-1">
                {notice.title}
              </CustomText>
              <View className="bg-blue-900 rounded-lg px-4 py-2">
                <CustomText className="text-white text-sm font-bold text-center">
                  {moment(notice.start_date).format("dddd")}
                </CustomText>
                <CustomText className="text-white text-3xl font-bold text-center">
                  {moment(notice.start_date).format("DD")}
                </CustomText>
                <CustomText className="text-white text-sm font-bold text-center">
                  {moment(notice.start_date).format("MMMM YY")}
                </CustomText>
              </View>
            </View>

            {/* Divider */}
            <Divider className="my-3" />

            <HtmlRenderer html={notice.description} />
          </View>
        </ScreenContainer>
      )}
    </ScreenLoading>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
