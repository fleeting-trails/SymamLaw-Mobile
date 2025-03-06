import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { ScreenContainer } from "../../components";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { ArchivedIcon, BrowseIcon, FreeIcon } from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import { axiosExternal } from "../../axios/axios";
import ExamCard from "../../components/ExamCard/ExamCard";
import useAppNavigation from "../../hooks/useAppNavigation";

/** Area: Tailwind class */
var cardClass =
  "bg-white mx-2 my-2 w-16 h-16 items-center justify-center rounded-xl shadow-md";
var cardTextClass = "text-xs font-semibold mt-2";
/** End Area  */

type SearchResult = Store.ExamDataShort[];

export default function ExamBrowse() {
  const theme = useAppTheme();
  const { navigate } = useAppNavigation();
  const [searchResult, setSearchResult] = useState<SearchResult>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [firstSearchCompleted, setFirstSearchCompleted] = useState(false);

  const search = async (query: string) => {
    try {
      const res = await axiosExternal.get("/search", {
        params: {
          query,
          type: "exam",
        },
      });
      if (!res.data.success) console.log({ error: res.data.message });
      setSearchResult(res.data.data?.exams ?? []);
    } catch (error) {
      console.log("Something went wrong while searching", error);
    }
  };

  const handleSearchClick = async () => {
    setSearchLoading(true);
    if (!searchQuery) {
      setSearchResult([]);
      setFirstSearchCompleted(false);
    } else {
      await search(searchQuery);
      setSearchQuery("");
      if (!firstSearchCompleted) setFirstSearchCompleted(true);
    }
    setSearchLoading(false);
  };

  return (
    <ScreenContainer>
      <View className="flex flex-row flex-wrap">
        <TouchableOpacity
          className={cardClass}
          style={{ borderColor: theme.colors.primary, borderWidth: 1 }}
          onPress={() => navigate("ExamCategories")}
        >
          <BrowseIcon name="menu" scale={0.7} color="black" />
          <Text className={cardTextClass}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={cardClass}
          style={{ borderColor: theme.colors.primary, borderWidth: 1 }}
          onPress={() => navigate("ExamsFree")}
        >
          <FreeIcon name="menu" scale={0.7} color="black" />
          <Text className={cardTextClass}>Free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={cardClass}
          style={{ borderColor: theme.colors.primary, borderWidth: 1 }}
          onPress={() => navigate("ExamsArchived")}
        >
          <ArchivedIcon name="menu" scale={0.7} color="black" />
          <Text className={cardTextClass}>Archived</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center">
        <View
          className="flex-1 h-[1px]"
          style={{ backgroundColor: theme.colors.textGray }}
        ></View>
        <CustomText className="mx-5">Search Exams</CustomText>
        <View
          className="flex-1 h-[1px]"
          style={{ backgroundColor: theme.colors.textGray }}
        ></View>
      </View>

      <InputPrimary
        placeholder="Search For Exams"
        inputStyle={{ paddingVertical: 3 }}
        returnKeyType="search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearchClick}
      />

      {searchLoading ? (
        <View className="flex-1 gap-6 justify-center items-center">
          <CustomText className="text-center text-2xl w-[200px]" variant="500">
            Loading...
          </CustomText>
        </View>
      ) : !firstSearchCompleted ? (
        <View className="flex-1 gap-6 justify-center items-center">
          <Image
            source={require("../../assets/search-graphics.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <View className="text-center">
            <CustomText
              className="text-center text-2xl w-[200px]"
              variant="500"
            >
              Search exams...
            </CustomText>
          </View>
        </View>
      ) : searchResult.length == 0 ? (
        <View className="flex-1 gap-6 justify-center items-center">
          <Image
            source={require("../../assets/not-found.png")}
            style={{
              width: 100,
              height: 100,
            }}
          />
          <View className="text-center">
            <CustomText
              className="text-center text-2xl w-[200px]"
              variant="500"
            >
              No Exam Found!
            </CustomText>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          {searchResult.map((item) => (
            <ExamCard
              key={item.id}
              data={{
                id: `${item.id}`,
                slug: item.slug,
                name: item.title,
                duration: parseInt(item.duration),
                totalQuestions: parseInt(item.total_questions),
                package_items: item.package_items,
                is_free: item.is_free,
              }}
              // onPress={handleExamCardPress}
            />
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});
