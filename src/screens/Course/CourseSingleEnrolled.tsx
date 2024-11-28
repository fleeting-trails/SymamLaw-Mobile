import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { List } from "react-native-paper";
import { ScreenContainer } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import useAppTheme from "../../hooks/useAppTheme";
import CustomText from "../../atoms/CustomText/CustomText";
import moment from "moment";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import { Divider, ProgressBar } from "react-native-paper";
import TabPrimary from "../../atoms/Tab/TabPrimary";
import { ScreenContainerNonScroll } from "../../components/ScreenContainer/ScreenContainerNonScroll";
import { ScrollView } from "moti";
import {
  DocumentIcon,
  ExamIcon,
  LiveIcon,
  RecordedIcon,
  VideoIcon,
} from "../../assets/Icons";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { useAppSelector } from "../../redux/hooks";
import useCoursePurchaseAction from "../../hooks/useCoursePurchaseAction";
import SnakbarPrimary from "../../components/Snackbar/SnackbarPrimary";
import useAppNavigation from "../../hooks/useAppNavigation";
import { WebView } from "react-native-webview";
import { isValidYouTubeVideo } from "../../utils/helpers";
import { useVideoPlayer, VideoView } from "expo-video";

const LECTURE_ICON_MAP = ({
  lecture_type,
  ...config
}: {
  lecture_type: Store.CourseLectureTypes;
  [key: string]: string;
}) => {
  if (lecture_type === "exam") {
    return <ExamIcon {...config} />;
  } else if (lecture_type === "file") {
    return <DocumentIcon {...config} />;
  } else {
    return <VideoIcon {...config} />;
  }
};

export default function CourseSingleEnrolled({
  data,
}: PropTypes.CourseSingleEnrolled) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { navigate } = useAppNavigation();
  const [selectedLecture, setSelectedLecture] =
    useState<null | Store.CourseLecture>(null);
  const [currentExpandedSectionIds, setCurrentExpandedSectionIds] = useState<
    number[]
  >([]);

  /**
   * Handler functions
   */

  const handleLectureSelect = (lecture: Store.CourseLecture) => {
    setSelectedLecture(lecture);
  };
  /**
   * End handler functions
   */

  const tabs = [
    {
      key: "content",
      title: "Content",
      children: () => (
        <CourseContent
          selectedLecture={selectedLecture}
          onLectureSelect={handleLectureSelect}
          currentExpandedSectionIds={currentExpandedSectionIds}
          setCurrentExpandedSectionIds={setCurrentExpandedSectionIds}
          data={data}
        />
      ),
    },
    {
      key: "more",
      title: "More",
      children: () => <CourseMore />,
    },
  ];
  return (
    <View className="flex-1 relative">
      <ScreenContainerNonScroll>
        {!selectedLecture ? (
          <LinearGradient
            colors={[
              theme.colors.backgroundPrimary,
              theme.colors.backgroundPrimaryLight,
            ]}
            locations={[0.6, 1]}
            className="p-3 relative"
          >
            <View className="absolute right-3 top-3 bg-red-600 rounded-[20px] px-3 py-1 flex-row items-center">
              {data.course_type === "recorded" ? (
                <RecordedIcon color={"#fff"} />
              ) : (
                <LiveIcon color={"#fff"} />
              )}
              <CustomText className="text-white ml-2">
                {data.course_type === "recorded" ? "Recorded" : "Live"}
              </CustomText>
            </View>
            <CustomText
              variant="600"
              lightText={true}
              className="text-white text-xl mr-[130px]"
            >
              {" "}
              {data.title}
            </CustomText>

            <View className="mt-3 ml-1">
              <CustomText
                variant="400"
                style={{ fontSize: 16 }}
                className="text-white"
              >
                {data.excerpt}
              </CustomText>
              <CustomText variant="300" className="text-white">
                Last updated on{" "}
                {moment(data.updated_at).format("Do MMMM, YYYY")}
              </CustomText>
            </View>
          </LinearGradient>
        ) : (
          <ContentView data={data} lecture={selectedLecture} />
        )}
        {Number.isNaN(parseFloat(data.course_progress.replace("%", ""))) ? (
          <View>
            <CustomText>{data.course_progress}</CustomText>
          </View>
        ) : (
          <View>
            <CustomText className="mb-2">Course Progress</CustomText>
            <View className="flex-row items-center">
              <View className="flex-1">
                <ProgressBar
                  progress={
                    data.course_progress
                      ? parseFloat(data.course_progress.replace("%", "")) / 100
                      : 0
                  }
                  style={{ height: 12, borderRadius: 12 }}
                  color={theme.colors.primaryGray}
                  fillStyle={{ backgroundColor: theme.colors.primary }}
                />
              </View>
              <View className="ml-3">
                <CustomText>{data.course_progress ?? "0.00%"}</CustomText>
              </View>
            </View>
          </View>
        )}
        <View className="flex-1">
          <TabPrimary tabs={tabs} />
        </View>
      </ScreenContainerNonScroll>
    </View>
  );
}

type CourseContentProps = {
  data: Store.CourseData;
  onLectureSelect: (lecture: Store.CourseLecture) => void;
  selectedLecture: Store.CourseLecture | null;
  currentExpandedSectionIds: number[];
  setCurrentExpandedSectionIds: (ids: number[]) => void;
};
function CourseContent({
  data,
  onLectureSelect,
  selectedLecture,
  currentExpandedSectionIds,
  setCurrentExpandedSectionIds,
}: CourseContentProps) {
  const theme = useAppTheme();
  const styles = createStyles(theme);

  const handleLecturePress = (lecture: Store.CourseLecture) => {
    if (onLectureSelect) onLectureSelect(lecture);
  };
  const handleSectionPress = (id: number) => {
    if (currentExpandedSectionIds.includes(id)) {
      setCurrentExpandedSectionIds(
        currentExpandedSectionIds.filter((_id) => _id !== id)
      );
    } else {
      setCurrentExpandedSectionIds([...currentExpandedSectionIds, id]);
    }
  };

  return (
    <ScrollView className="flex-1">
      <List.Section>
        {data.course_sections?.map((section) => (
          <List.Accordion
            style={styles.accordianItemStyle}
            titleStyle={styles.accordionItemTitleStyle}
            key={section.id}
            title={section.title}
            onPress={() => handleSectionPress(section.id)}
            expanded={currentExpandedSectionIds.includes(section.id)}
          >
            {section.lectures.map((lecture) => (
              <List.Item
                left={(props) =>
                  LECTURE_ICON_MAP({
                    lecture_type: lecture.lecture_type,
                    color: theme.colors.text,
                  })
                }
                key={lecture.id}
                title={lecture.title}
                titleStyle={styles.accordionChildItemTitleStyle}
                onPress={() => handleLecturePress(lecture)}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
}

function CourseMore() {
  return (
    <View>
      <CustomText>More Options</CustomText>
    </View>
  );
}

type ContentViewProps = {
  data: Store.CourseData;
  lecture: Store.CourseLecture;
};
function ContentView({ data, lecture }: ContentViewProps) {
  const player = useVideoPlayer(lecture.link, (player) => {
    player.loop = true;
    // player.play();
  });

  // For "video" type content
  if (lecture.lecture_type === "video") {
    if (isValidYouTubeVideo(lecture.link)) {
      return (
        <View className="w-full">
          {lecture.link && <VideoView
            style={{
              width: 350,
              height: 275,
            }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />}
        </View>
      );
    } else {
      return (
        <View className="relative w-full">
          <Image
            style={{
              height: 200,
            }}
            source={
              data.image
                ? { uri: data.image }
                : require("../../assets/placeholder-course-image.jpg")
            }
          />
          <View className="absolute left-0 right-0 bottom-0 top-0 bg-black/70 justify-center items-center">
            <CustomText
              variant="600"
              className="text-white text-lg w-[300px] text-center"
            >
              {console.log(lecture.link) as any}
              Cannot Load Video. Please try again later
            </CustomText>
          </View>
        </View>
      );
    }
  } else if (lecture.lecture_type === "exam") {
    return (
      <View className="flex items-center justify-center">
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../assets/exam-graphic.png")}
        />
        <PrimaryButton text="Start Exam" color="primary" />
      </View>
    );
  } else if (lecture.lecture_type === "file") {
    return (
      <View className="flex items-center justify-center">
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../assets/course-document-graphic.png")}
        />
        <PrimaryButton text="Start Reading" color="primary" />
      </View>
    );
  }
}

const createStyles = (theme: Config.Theme) => {
  return StyleSheet.create({
    accordianItemStyle: {
      backgroundColor: theme.colors.backgroundGray,
      marginVertical: 5,
      paddingVertical: 1,
    },
    accordionItemTitleStyle: {
      color: theme.colors.text,
    },
    accordionChildItemTitleStyle: {
      color: theme.colors.text,
    },
  });
};
