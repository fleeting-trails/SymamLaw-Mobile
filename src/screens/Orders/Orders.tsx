import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { listOrders } from "../../redux/slices/order/orderSlice";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import OrderCard from "../../components/OrderCard/OrderCard";
import useAppNavigation from "../../hooks/useAppNavigation";
import CustomText from "../../atoms/CustomText/CustomText";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";

export default function Orders() {
  const styles = createStyles();
  const dispatch = useAppDispatch();
  const orderState = useAppSelector((state) => state.order);
  const orders = orderState.list.data;
  const loading = orderState.loading.listOrders
  const { navigate } = useAppNavigation();

  useEffect(() => {
    dispatch(listOrders());
  }, []);

  /**
   * Handler functions
   */
  const handleViewPress = (data: Store.OrderListData) => {
    navigate("OrderDetails", { data });
  };

  return (
    <ScreenLoading isLoading={loading}>
      <ScreenContainerNonScroll>
        <CustomText variant="600" className="text-2xl">
          All Orders
        </CustomText>
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderCard data={item} onViewPress={handleViewPress} />
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </ScreenContainerNonScroll>
    </ScreenLoading>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
