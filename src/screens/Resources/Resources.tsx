import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { ScreenContainer } from "../../components";
import { ScrollView } from "moti";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogs, fetchMoreBlogs } from "../../redux/slices/blog/blogSlice";
import BlogCard from "../../components/BlogCard.tsx/BlogCard";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import useAppNavigation from "../../hooks/useAppNavigation";

export default function Resources() {
  const styles = createStyles();
  const dispatch = useAppDispatch();
  const blogState = useAppSelector((state) => state.blog);
  const loading = blogState.loading.fetchBlogs;
  const loadMore = blogState.loading.fetchMoreBlogs;
  const blogs = blogState.data.posts;
  const { navigate } = useAppNavigation();

  useEffect(() => {
    dispatch(fetchBlogs(null));
  }, []);

  const handleLoadMore = () => {
    try {
      dispatch(fetchMoreBlogs());
    } catch (error) {
      console.log("Failed to load more blogs", error);
    }
  };
  const handlePress = (data : Store.BlogListData) => {
    navigate("BlogSingle", { id: data.id });
  }
  return (
    <ScreenContainerNonScroll>
      <InputPrimary
        returnKeyType="search"
        placeholder="Start Searching Blogs..."
        inputStyle={{
          paddingVertical: 6,
        }}
      />
      <ScreenLoading isLoading={loading} label="Loading Blogs...">
        <View className="flex-1">
          <FlatList
            data={blogs}
            renderItem={({ item }) => <BlogCard onPress={handlePress} data={item} />}
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
        </View>
      </ScreenLoading>
    </ScreenContainerNonScroll>
  );
}

const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 16,
    },
  });
};
