import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchBooklist,
  fetchMoreBooks,
  searchBooks,
} from "../../redux/slices/library/librarySlice";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import BookCard from "../../components/BookCard/BookCard";
import CustomText from "../../atoms/CustomText/CustomText";
import InputPrimary from "../../atoms/Input/InputPrimary";
import useAppNavigation from "../../hooks/useAppNavigation";

export default function Library() {
  const styles = createStyles();
  const dispatch = useAppDispatch();
  const libraryState = useAppSelector((state) => state.library);
  const loading = libraryState.loading.fetchBooklist || libraryState.loading.searchBooks; 
  const loadMore = libraryState.loading.fetchMoreBooks;
  const books = libraryState.list.data;
  const user = useAppSelector((state) => state.auth.user);
  const { navigate } = useAppNavigation();

  useEffect(() => {
    dispatch(fetchBooklist());
  }, []);

  /**
   * Handler functions
   */
  const handlePress = () => {
    if (!user) {
        navigate("Login");
        return;
    }
  };
  const handleSearch = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (event.nativeEvent.text === "") {
      dispatch(fetchBooklist());
    } else {
      dispatch(searchBooks(event.nativeEvent.text));
    }
  };
  const handleLoadMore = () => {
    try {
      dispatch(fetchMoreBooks());
    } catch (error) {
      console.log("Failed to load more books", error);
    }
  };

  useEffect(() => {
    console.log("Books", books);
  }, [books])
  /**
   * End handler functions
   */
  return (
    <ScreenContainerNonScroll>
      <InputPrimary
        returnKeyType="search"
        placeholder="Start Searching Books..."
        onSubmitEditing={handleSearch}
        inputStyle={{
          paddingVertical: 6,
        }}
      />
      <ScreenLoading isLoading={loading} label="Loading Books...">
        <View className="flex-1">
          {books?.length !== 0 ? (
            <FlatList
              data={books}
              renderItem={({ item }) => (
                <BookCard onPress={handlePress} data={item} />
              )}
              ListFooterComponent={() =>
                loadMore && (
                  <View className="w-full items-center justify-center">
                    <Image
                      source={require("../../assets/loading.gif")}
                      className="w-[30px] h-[30px] object-contain"
                    />
                  </View>
                )
              }
              keyExtractor={(item, i) => `${item.id}_${i}`}
              onEndReachedThreshold={0.5}
              onEndReached={handleLoadMore}
            />
          ) : (
            <View className="flex-1 gap-6 justify-center items-center">
              <Image
                source={require("../../assets/empty-search-graphics.png")}
                style={{
                  width: 150,
                  height: 150,
                }}
              />
              <View className="text-center">
                <CustomText
                  className="text-center text-2xl w-[200px]"
                  variant="500"
                >
                  {"No Books Found!!"}
                </CustomText>
              </View>
            </View>
          )}
        </View>
      </ScreenLoading>
    </ScreenContainerNonScroll>
  );
}

const createStyles = () => {
  return StyleSheet.create({});
};
