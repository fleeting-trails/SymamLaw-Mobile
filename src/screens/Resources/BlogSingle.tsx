import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBlogSingle } from "../../redux/slices/blog/blogSlice";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { ScreenContainer } from "../../components";
import CustomText from "../../atoms/CustomText/CustomText";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";

export default function BlogSingle({ route }: PropTypes.BlogSingle) {
  const { id } = route.params;
  const classNames = createclassNames();
  const dispatch = useAppDispatch();
  const blogState = useAppSelector((state) => state.blog);
  const blog = blogState.currentBlog;
  const loading = blogState.loading.fetchBlogSingle;

  useEffect(() => {
    dispatch(fetchBlogSingle(id));
  }, []);
  return (
    <ScreenLoading isLoading={loading} label="Loading Blog...">
      {blog && (
        <ScreenContainer>
          <View className="flex-1 bg-gray-100">
            {/* Background Image */}
            <View className="relative">
              <Image
                source={{ uri: blog.image }} // Replace with actual image URL
                className="h-64 w-full object-cover"
              />
              {/* Category Tag */}
              {/* <CustomText className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Health
              </CustomText> */}
                {/* Overlay */}
              <View className="absolute left-0 top-0 h-full w-full bg-black/50"></View>
              {/* Article Title */}
              <CustomText
                className="absolute bottom-8 left-4 text-white text-2xl font-bold w-3/4"
                numberOfLines={2}
              >
                {blog.title}
              </CustomText>
            </View>

            {/* Author Section */}
            <View className="bg-white mt-2 rounded-t-3xl p-6">
              {/* Author Image */}
              <View className="items-center -mt-16 shadow-xl">
                <Image
                  source={require("../../assets/empty-avatar.jpg")} // Replace with actual author image
                  className="h-20 w-20 rounded-full border-4 border-white shadow-md"
                />
                <CustomText className="text-lg font-semibold mt-4">Ashley Mitchell</CustomText>
              </View>

              {/* Separator */}
              <View className="border-b border-gray-300 my-4" />

              {/* Article Content */}
              {/* <CustomText className="text-lg leading-7 text-gray-700">
                The blueberry, already labeled a 'super fruit' for its power to
                potentially lower the risk of heart disease and cancer, also
                could be another weapon in the war against Alzheimer’s disease.
                New research being presented today further bolsters this idea,
                which is being tested by many teams.
              </CustomText> */}
              <HtmlRenderer 
                html={blog.description}
              />
            </View>
          </View>
        </ScreenContainer>
      )}
    </ScreenLoading>
  );
}

const createclassNames = () => {
  return StyleSheet.create({});
};
