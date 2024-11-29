import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import { CrossIcon, LiveIcon, RecordedIcon } from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../atoms/CustomText/CustomText";
import moment from "moment";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import { Divider } from "react-native-paper";
import PdfViewer from "../../components/PdfViewer/PdfViewer";

export function AboutCourse({
  open,
  setOpen,
  data,
}: PropTypes.CourseEnrolledMoreViews) {
  const theme = useAppTheme();
  const styles = createStyles();
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <Container setOpen={setOpen}>
        <View
          style={{
            borderWidth: 2,
            borderColor: theme.colors.primary,
            padding: 8,
          }}
        >
          <Image
            className="w-full h-[150px] object-contain"
            source={
              data.image
                ? { uri: data.image }
                : require("../../assets/placeholder-course-image.jpg")
            }
          />
        </View>
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
              Last updated on {moment(data.updated_at).format("Do MMMM, YYYY")}
            </CustomText>
          </View>
        </LinearGradient>
        <View className="my-5">
          <Divider />
        </View>
        <View>
          <CustomText variant="600" className="text-xl">
            Description
          </CustomText>
          <HtmlRenderer html={data.description} />
        </View>
        <View className="mt-2">
          {data.subject && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Subject: </CustomText>
              <CustomText>{data.subject.title}</CustomText>
            </View>
          )}
          {data.category && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Category: </CustomText>
              <CustomText>{data.category.title}</CustomText>
            </View>
          )}
          {(data.total_lecture || data.total_lecture === 0) && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Total Lectures: </CustomText>
              <CustomText>{data.total_lecture}</CustomText>
            </View>
          )}
          {(data.total_section || data.total_section === 0) && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Total Sections: </CustomText>
              <CustomText>{data.total_section}</CustomText>
            </View>
          )}
          {data.course_type && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Course Type: </CustomText>
              <CustomText>{data.course_type}</CustomText>
            </View>
          )}
          {data.course_start_date && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Starting From: </CustomText>
              <CustomText>
                {moment(data.course_start_date).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </CustomText>
            </View>
          )}
          {data.course_end_date && (
            <View className="flex-row flex-wrap gap-2">
              <CustomText variant="500">Ending At: </CustomText>
              <CustomText>
                {moment(data.course_end_date).format("MMMM Do YYYY, h:mm:ss a")}
              </CustomText>
            </View>
          )}
        </View>
      </Container>
    </Modal>
  );
}

export const CourseRoutine = ({
  open,
  setOpen,
  data,
}: PropTypes.CourseEnrolledMoreViews) => {
  const theme = useAppTheme();
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={() => setOpen(false)}
    >
      <Container setOpen={setOpen}>
        {data.routine ? (
          <View>
            <CustomText>{data.routine.topic}</CustomText>
            <HtmlRenderer html={data.routine.description} />
          </View>
        ) : (
          <View
            style={{ backgroundColor: theme.colors.background }}
            className="flex-1 justify-center items-center gap-2"
          >
            <Image
              source={require("../../assets/not-found.png")}
              style={{
                height: 300,
                width: 300,
              }}
            />
            <CustomText className="text-2xl">
              No Routine Posted For this course
            </CustomText>
          </View>
        )}
      </Container>
    </Modal>
  );
};

export const CourseResources = ({
  open,
  setOpen,
  data,
  lecture,
}: PropTypes.CourseResources) => {
  const theme = useAppTheme();
  const [pdfDialogOpen, setPdfDialogOpen] = useState<boolean>(false);
  const [selectedPdf, setSelectedPdf] = useState<API.Document | null>(null);
  const handlePdfPreviewOpen = () => {
    setOpen(false);
    setPdfDialogOpen(true);
  }
  const handlePdfPreviewClose = () => {
    setOpen(true);
    setPdfDialogOpen(false);
  }
  return (
    <>
      <PdfDialog
        visible={pdfDialogOpen}
        onClose={handlePdfPreviewClose}
        pdfUri={selectedPdf?.file_name ?? null}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingHorizontal: 30,
            paddingVertical: 60,
          }}
        >
          <PrimaryButton
            className="padding-[10px] ml-auto my-5"
            onPress={() => setOpen(false)}
            icon={<CrossIcon />}
            color="primary"
            text="Close"
          />
          <FlatList
            data={lecture.lecture_documents}
            keyExtractor={(item, index) => `${lecture.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
                onPress={() => {
                  setSelectedPdf(item.document);
                  handlePdfPreviewOpen();
                }} // Pass the file link
              >
                <CustomText
                  style={{
                    fontSize: 16,
                    color: "#333",
                  }}
                >
                  {item.document.name}
                </CustomText>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const PdfDialog = ({
  visible,
  onClose,
  pdfUri,
}: {
  visible: boolean;
  onClose: () => void;
  pdfUri: string | null;
}) => {
  const theme = useAppTheme();
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingHorizontal: 30,
          paddingVertical: 60,
        }}
      >
        <PrimaryButton
          className="padding-[10px] ml-auto my-5"
          onPress={onClose}
          icon={<CrossIcon />}
          color="primary"
          text="Close"
        />
        {pdfUri ? (
          <PdfViewer
            source={{ uri: pdfUri }}
            style={{
              flex: 1,
            }}
          />
        ) : (
          <CustomText>Cannot find any PDF to open!</CustomText>
        )}
      </View>
    </Modal>
  );
};
const Container = ({
  setOpen,
  children,
}: {
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 60,
      }}
    >
      <PrimaryButton
        className="padding-[10px] ml-auto my-5"
        onPress={() => setOpen(false)}
        icon={<CrossIcon />}
        color="primary"
        text="Close"
      />
      {children}
    </ScrollView>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
