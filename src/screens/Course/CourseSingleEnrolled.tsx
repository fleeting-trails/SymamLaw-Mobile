import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
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
  CrossIcon,
  DocumentIcon,
  ExamIcon,
  LiveIcon,
  NextIcon,
  RecordedIcon,
  VideoIcon,
} from "../../assets/Icons";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useCoursePurchaseAction from "../../hooks/useCoursePurchaseAction";
import SnakbarPrimary from "../../components/Snackbar/SnackbarPrimary";
import useAppNavigation from "../../hooks/useAppNavigation";
import { WebView } from "react-native-webview";
import {
  convertToEmbedUrl,
  getYoutubeVideoId,
  isValidYouTubeVideo,
} from "../../utils/helpers";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import {
  AboutCourse,
  CourseDiscussion,
  CourseResources,
  CourseRoutine,
} from "./CourseEnrolledMoreViews";
import {
  getCourseSingle,
  markLectureAsViewed,
  refreshCourseSingle,
} from "../../redux/slices/course/courseSlice";

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
  const dispatch = useAppDispatch();
  const styles = createStyles(theme);
  const { navigate } = useAppNavigation();
  const [selectedLecture, setSelectedLecture] =
    useState<null | Store.CourseLecture>(null);
  const [currentExpandedSectionIds, setCurrentExpandedSectionIds] = useState<
    number[]
  >([]);
  const [currentPlayingLiveClass, setCurrentPlayingLiveClass] =
    useState<null | Store.CourseOngoingLiveClass>(null);

  const [currentSelectedTabIndex, setCurrentSelectedTabIndex] = useState(0);
  const [markLectureViewedLoading, setMarkLectureViewedLoading] =
    useState(false);

  // This will be updated based on content size, the size will see expanded collapsed sections and resize itself based on that
  // Also on tab change, it will resize accordingly
  const [tabContentHeight, setTabContentHeight] = useState(0);
  const [lecturePosition, setLecturePosition] = useState<{
    section: Store.CourseSection | null;
    current: Store.CourseLecture | null;
    prev: Store.CourseLecture | null;
    next: Store.CourseLecture | null;
  }>({
    section: null,
    current: null,
    prev: null,
    next: null,
  });

  /**
   * Lifecycle method
   */

  useEffect(() => {
    if (currentSelectedTabIndex === 0) {
      setTabContentHeight(300);
    } else {
      setTabContentHeight(20);
    }
  }, [
    currentSelectedTabIndex,
    currentExpandedSectionIds,
    data.course_sections,
  ]);
  /**
   * End lifecycle methods
   */

  /**
   * Handler functions
   */

  const handleLectureSelect = (lecture: Store.CourseLecture) => {
    setCurrentPlayingLiveClass(null);
    setSelectedLecture(lecture);
    setLecturePosition(findLecturePosition(lecture.id));
  };

  const handleLiveClassWatchClick = (
    liveClass: Store.CourseOngoingLiveClass
  ) => {
    setCurrentPlayingLiveClass(liveClass);
  };
  const handelTabChange = (tabIndex: number) => {
    setCurrentSelectedTabIndex(tabIndex);
  };
  const handleCompleteAndNextPress = async () => {
    if (selectedLecture) {
      setMarkLectureViewedLoading(true);
      try {
        if (!selectedLecture.is_viewed) {
          await dispatch(
            markLectureAsViewed({
              lecture_id: selectedLecture?.id,
              course_id: data.id,
            })
          );
          dispatch(refreshCourseSingle(data.slug));
        }
        const lecturePosition = findLecturePosition(selectedLecture.id);
        if (
          !lecturePosition.current ||
          !lecturePosition.section ||
          !lecturePosition.next
        ) {
          setMarkLectureViewedLoading(false);
          return false;
        }
        setSelectedLecture(lecturePosition.next);
        setLecturePosition(findLecturePosition(lecturePosition.next.id));
      } catch (error) {
        console.log("Error marking lecture as viewed", error);
      }
      setMarkLectureViewedLoading(false);
    }
  };
  /**
   * End handler functions
   */

  /**
   * Helper functions
   */
  function findLecturePosition(lectureId: number) {
    const result: {
      section: Store.CourseSection | null;
      current: Store.CourseLecture | null;
      prev: Store.CourseLecture | null;
      next: Store.CourseLecture | null;
    } = {
      section: null,
      current: null,
      prev: null,
      next: null,
    };
    if (!data.course_sections) return result;

    const linearLectures: Store.CourseLecture[] = [];

    data.course_sections.forEach((section) => {
      section.lectures.forEach((lecture) => {
        linearLectures.push(lecture);
      });
    });

    const currentLectureIndex = linearLectures.findIndex(
      (l) => l.id === lectureId
    );
    const section = data.course_sections.find((s) =>
      s.lectures.find((l) => l.id === lectureId)
    );

    result.section = section ?? null;
    result.current = linearLectures[currentLectureIndex];
    result.next =
      currentLectureIndex === linearLectures.length - 1
        ? null
        : linearLectures[currentLectureIndex + 1];
    result.prev =
      currentLectureIndex === 0
        ? null
        : linearLectures[currentLectureIndex - 1];

    return result;
  }
  /**
   * End helper functions
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
      children: () => (
        <CourseMore data={data} selectedLecture={selectedLecture} />
      ),
    },
  ];
  return (
    <View className="flex-1 relative">
      <ScreenContainerNonScroll>
        {/* <PdfViewer 
          source={{ uri: "https://backoffice.symamlaw.com/documents/cc-final-merged-quote-template-2.pdf" }}
        /> */}
        {data.is_live_class_ongoing && (
          <View
            className="w-full flex-row justify-between items-center py-1 pl-3 pr-1"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <CustomText className="text-white" style={{ fontSize: 12 }}>
              {currentPlayingLiveClass
                ? "You are watching live class"
                : "Live Class Ongoing"}
            </CustomText>
            {currentPlayingLiveClass ? (
              <PrimaryButton
                text="Close"
                color="white"
                className="py-1"
                textStyle={{ fontSize: 12 }}
                onPress={() => setCurrentPlayingLiveClass(null)}
              />
            ) : (
              <PrimaryButton
                color="white"
                text="Watch"
                className="py-1"
                textStyle={{ fontSize: 12 }}
                onPress={() =>
                  handleLiveClassWatchClick(data.is_live_class_ongoing)
                }
              />
            )}
          </View>
        )}
        {!selectedLecture || currentPlayingLiveClass ? (
          !currentPlayingLiveClass ? (
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
            <View className="h-[200px] relative">
              <WebView
                source={{
                  uri: convertToEmbedUrl(currentPlayingLiveClass.link),
                }}
                // javaScriptEnabled={true}
                // allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={true}
                className="flex-1 h-[200px]"
              />
              <View className="absolute right-3 top-3 bg-red-600 rounded-[20px] px-3 py-1 flex-row items-center">
                <LiveIcon color={"#fff"} />
                <CustomText className="text-white ml-2">
                  {data.course_type === "recorded" ? "Recorded" : "Live"}
                </CustomText>
              </View>
            </View>
          )
        ) : (
          <View className="h-[200px]">
            <ContentView data={data} lecture={selectedLecture} />
          </View>
        )}
        <View className="flex-1">
          <TabPrimary
            // style={{ height: tabContentHeight }}
            // style={{ height: 500 }}
            tabs={tabs}
            onIndexChange={handelTabChange}
          />
        </View>
      </ScreenContainerNonScroll>
      {selectedLecture &&
        !(!lecturePosition.next && selectedLecture.is_viewed) &&
        selectedLecture.lecture_type !== "exam" && (
          <View className="absolute right-[20px] bottom-[50px]">
            <PrimaryButton
              onPress={handleCompleteAndNextPress}
              icon={<NextIcon color={theme.colors.textLight} />}
              color="primary"
              text={
                selectedLecture.is_viewed
                  ? "Next"
                  : !lecturePosition.next
                  ? "Complete"
                  : "Complete & Next"
              }
              loading={markLectureViewedLoading}
            />
          </View>
        )}
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
    <ScrollView>
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
                // background={selectedLecture?.id === lecture.id ? theme.colors.backgroundGrayLight : theme.colors.background}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor:
                    selectedLecture?.id === lecture.id
                      ? theme.colors.backgroundGrayLight
                      : theme.colors.background,
                }}
              />
            ))}
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
}

type ContentViewProps = {
  data: Store.CourseData;
  lecture: Store.CourseLecture;
};
function ContentView({ data, lecture }: ContentViewProps) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const { navigate } = useAppNavigation();
  const [pdfDialogOpen, setPdfDialogOpen] = useState<boolean>(false);
  const [selectedPdf, setSelectedPdf] = useState<API.Document | null>(null);

  /**
   * Handler functions
   */
  const handleStartExam = (lecture : Store.CourseLecture) => {
    if (lecture.exam) {
      navigate("ExamStart", {
        slug: lecture.exam.slug,
        lecture_id: lecture.id,
        course_id: data.id
      });
    } else {
      console.log("No exam assigned!", lecture.exam);
    }
  };
  /**
   * End handler functions
   */

  // For "video" type content
  if (lecture.lecture_type === "video") {
    if (isValidYouTubeVideo(lecture.link)) {
      return (
        <WebView
          source={{ uri: lecture.link }}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          allowsFullscreenVideo={true}
          // className="w-full h-[200px]"
        />
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
        <PrimaryButton
          onPress={() => handleStartExam(lecture)}
          text="Start Exam"
          color="primary"
        />
      </View>
    );
  } else if (lecture.lecture_type === "file") {
    return (
      <View className="flex items-center justify-center">
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../../assets/course-document-graphic.png")}
        />
        <CustomText className="mt-5">View Documents</CustomText>
        <List.Accordion title={lecture.title} style={styles.lectureAccordion}>
          <FlatList
            data={lecture.lecture_documents}
            keyExtractor={(item, index) => `${lecture.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.fileItem}
                onPress={() => {
                  setSelectedPdf(item.document);
                  setPdfDialogOpen(true);
                }} // Pass the file link
              >
                <Text style={styles.fileName}>{item.document.name}</Text>
              </TouchableOpacity>
            )}
          />
        </List.Accordion>

        {/* <PrimaryButton text="Start Reading" color="primary" /> */}
        <PdfDialog
          visible={pdfDialogOpen}
          onClose={() => setPdfDialogOpen(false)}
          pdfUri={selectedPdf?.file_name as string}
        />
      </View>
    );
  }
}

// Contents of More Tab

function CourseMore({
  data,
  selectedLecture,
}: {
  data: Store.CourseData;
  selectedLecture: Store.CourseLecture | null;
}) {
  const theme = useAppTheme();
  const courseData = useAppSelector((state) => state.course.currentCourse);
  const [modalOpen, setModalOpen] = useState(false);

  const menuItems = [
    {
      title: "About this Course",
      icon: "...",
      id: "about",
      element: ({ open, setOpen, data }: PropTypes.CourseEnrolledMoreViews) => (
        <AboutCourse open={open} setOpen={setOpen} data={data} />
      ),
    },
    {
      title: "Course certificate",
      icon: "🏆",
      id: "certificate",
      element: ({ open, setOpen, data }: PropTypes.CourseEnrolledMoreViews) => (
        <AboutCourse open={open} setOpen={setOpen} data={data} />
      ),
    },
    // { title: "Share this Course", icon: "🔗" },
    {
      title: "Discussion",
      icon: "💬",
      id: "discussion",
      hasLectureDependency: true,
      element: ({
        open,
        setOpen,
        data,
        lecture,
      }: PropTypes.CourseEnrolledMoreViews & {
        lecture: Store.CourseLecture | null;
      }) => (
        <CourseDiscussion
          open={open}
          setOpen={setOpen}
          data={data}
          lecture={lecture as Store.CourseLecture}
        />
      ),
    },
    {
      title: "Routine",
      icon: "📝",
      id: "routine",
      element: ({ open, setOpen, data }: PropTypes.CourseEnrolledMoreViews) => (
        <CourseRoutine open={open} setOpen={setOpen} data={data} />
      ),
    },
    {
      title: "Resources",
      icon: "📚",
      id: "resources",
      hasLectureDependency: true,
      element: ({
        open,
        setOpen,
        data,
        lecture,
      }: PropTypes.CourseEnrolledMoreViews & {
        lecture: Store.CourseLecture | null;
      }) => (
        <CourseResources
          open={open}
          setOpen={setOpen}
          data={data}
          lecture={lecture as Store.CourseLecture}
        />
      ),
    },
    // { title: "Announcements", icon: "🔔" },
    // { title: "Add course to favorites", icon: "⭐" },
    // { title: "Archive this course", icon: "📥" },
  ];

  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);
  return (
    <View className="flex-1">
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
      <ScrollView className="flex-1 py-4">
        <View className="space-y-4">
          {menuItems.map(
            (item, index) =>
              (!item.hasLectureDependency ||
                (item.hasLectureDependency && selectedLecture)) && (
                <TouchableOpacity
                  key={`${index}_${item.title}`}
                  className="flex-row items-center space-x-4 p-3 rounded-lg"
                  style={{ backgroundColor: theme.colors.backgroundGrayLight }}
                  onPress={() => {
                    setModalOpen(true);
                    setSelectedMenu(item);
                  }}
                >
                  <Text className="text-lg">{item.icon}</Text>
                  <CustomText className="text-lg">{item.title}</CustomText>
                </TouchableOpacity>
              )
          )}
        </View>
      </ScrollView>
      {selectedMenu.element({
        open: modalOpen,
        setOpen: setModalOpen,
        data: courseData as Store.CourseData,
        lecture: selectedLecture,
      })}
    </View>
  );
}

// Fullscreen dialog component for PDF viewing
const PdfDialog = ({
  visible,
  onClose,
  pdfUri,
}: {
  visible: boolean;
  onClose: () => void;
  pdfUri: string;
}) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.dialogContainer}>
        <PrimaryButton
          className="padding-[10px] ml-auto my-5"
          onPress={onClose}
          icon={<CrossIcon />}
          color="primary"
          text="Close"
        />
        <PdfViewer source={{ uri: pdfUri }} style={styles.pdfViewer} />
      </View>
    </Modal>
  );
};

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
    dialogContainer: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 30,
      paddingVertical: 60,
    },
    closeButton: {
      padding: 10,
      backgroundColor: "#f00",
      alignSelf: "flex-end",
    },
    closeText: {
      color: "#fff",
      fontWeight: "bold",
    },
    pdfViewer: {
      flex: 1,
    },
    fileItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    fileName: {
      fontSize: 16,
      color: "#333",
    },
    lectureAccordion: {
      marginVertical: 0,
    },
  });
};
