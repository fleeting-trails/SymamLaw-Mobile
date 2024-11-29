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
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import {
  AboutCourse,
  CourseResources,
  CourseRoutine,
} from "./CourseEnrolledMoreViews";

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

type ContentViewProps = {
  data: Store.CourseData;
  lecture: Store.CourseLecture;
};
function ContentView({ data, lecture }: ContentViewProps) {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const [pdfDialogOpen, setPdfDialogOpen] = useState<boolean>(false);
  const [selectedPdf, setSelectedPdf] = useState<API.Document | null>(null);
  // For "video" type content
  if (lecture.lecture_type === "video") {
    if (isValidYouTubeVideo(lecture.link)) {
      return (
        <WebView
          source={{ uri: lecture.link }}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          className="w-full"
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
      element: ({ open, setOpen, data }: PropTypes.CourseEnrolledMoreViews) => (
        <AboutCourse open={open} setOpen={setOpen} data={data} />
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
                  key={index}
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
        data: data,
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
