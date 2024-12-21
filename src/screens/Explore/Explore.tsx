import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import InputPrimary from "../../atoms/Input/InputPrimary";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { SearchIcon } from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import { axiosExternal } from "../../axios/axios";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import { ExploreBooks, ExploreCourses, ExploreExams, ExplorePackages } from "./ExploreTabs";
import TabPrimary from "../../atoms/Tab/TabPrimary";

type SearchResult = {
  exams: Store.ExamDataShort[],
  courses: Store.CourseListData[],
  books: any[],
  packages: Store.PackageData[]
}

export default function Explore() {
  const theme = useAppTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<null | SearchResult>(null);
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([
    {
      key: "courses",
      title: "Courses (0)",
      children: () => <ExploreCourses courses={null} />,
    },
    {
      key: "exams",
      title: "Exams (0)",
      children: () => <ExploreExams exams={null} />,
    },
    {
      key: "books",
      title: "Books (0)",
      children: () => <ExploreBooks />,
    },
    {
      key: "packages",
      title: "Packages (0)",
      children: () => <ExplorePackages packages={null} />,
    },
  ]);

  /**
   * Lifecycle methods
   */
  useEffect(() => {
    if (searchResult) {
      setTabs([
        {
          key: "courses",
          title: `Courses (${searchResult.courses.length})`,
          children: () => <ExploreCourses courses={searchResult.courses} />,
        },
        {
          key: "exams",
          title: `Exams (${searchResult.exams.length})`,
          children: () => <ExploreExams exams={searchResult.exams} />,
        },
        {
          key: "books",
          title: `Books (${searchResult.books.length})`,
          children: () => <ExploreBooks />,
        },
        {
          key: "packages",
          title: `Packages (${searchResult.packages.length})`,
          children: () => <ExplorePackages packages={searchResult.packages} />,
        },
      ])
    }
  }, [searchResult])
  /**
   * End lifecycle methods
   */

  /**
   * Action functions
   */
  const search = async (query: string) => {
    try {
      const res = await axiosExternal.get("/search", {
        params: { query },
      });
      if (!res.data.success) console.log({ error: res.data.message });
      setSearchResult(res.data.data);
    } catch (error) {
      console.log("Something went wrong while searching", error);
    }
  };
  /**
   * End action functions
   */

  /**
   * Handler function
   */

  const handleSearchClick = async () => {
    setLoading(true);
    if (!searchQuery) {
      setSearchResult(null);
    } else {
      await search(searchQuery);
    }
    setLoading(false);
  };
  /**
   * End handler functions
   */

  return (
    <ScreenContainerNonScroll>
      <View className="flex-row items-center">
        <InputPrimary
          returnKeyType="search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearchClick}
          containerStyle={{ flex: 1, height: "100%" }}
          placeholder="Search for content..."
        />
        {/* <PrimaryButton
          className="ml-2"
          color="primary"
          icon={<SearchIcon color={theme.colors.textLight} />}
          text="Search"
          onPress={handleSearchClick}
        /> */}
      </View>

      <ScreenLoading isLoading={loading}>
        {!searchResult ? (
          <View className="flex-1 gap-6 justify-center items-center">
            <Image
              source={require("../../assets/search-graphics.png")}
              style={{
                width: 200,
                height: 200,
              }}
            />
            <View className="text-center">
              <CustomText
                className="text-center text-2xl w-[200px]"
                variant="500"
              >
                Search across the app here...
              </CustomText>
            </View>
          </View>
        ) : (
          <View className="flex-1">
            <TabPrimary 
              tabs={tabs}
              scrollEnabled={true}
              tabLabelStyle={{
                fontSize: 9
              }}
            />
          </View>
        )}
      </ScreenLoading>
    </ScreenContainerNonScroll>
  );
}

const styles = StyleSheet.create({});
