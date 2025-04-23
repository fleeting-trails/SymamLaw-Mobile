import React, { useEffect, useState } from "react";
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
import {
  CaretLeftIcon,
  CrossIcon,
  LiveIcon,
  RecordedIcon,
  ReplyIcon,
} from "../../assets/Icons";
import useAppTheme from "../../hooks/useAppTheme";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "../../atoms/CustomText/CustomText";
import moment from "moment";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";
import { Divider, TouchableRipple } from "react-native-paper";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import InputPrimary from "../../atoms/Input/InputPrimary";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  commentOnLecture,
  getComments,
  refreshCourseSingle,
  replyOnLectureComment,
} from "../../redux/slices/course/courseSlice";
import { convertToTimeAgo } from "../../utils/helpers";

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

          {data.course_instructors && (
            <View>
              <CustomText variant="600" className="text-xl mt-3">
                Instructor
              </CustomText>
              <View className="flex-row gap-2 mt-2 items-center">
                <Image
                  className="h-8 w-8 rounded-full p-2"
                  style={{
                    borderColor: theme.colors.primaryGrayLight,
                    borderWidth: 2,
                  }}
                  source={{
                    uri: data.course_instructors.instructor.instructor_details
                      .image,
                  }}
                />

                <CustomText>
                  {data.course_instructors.instructor.instructor_details.name}
                </CustomText>
              </View>
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
  };
  const handlePdfPreviewClose = () => {
    setOpen(true);
    setPdfDialogOpen(false);
  };
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
export const CourseDiscussion = ({
  open,
  setOpen,
  data,
  lecture,
}: PropTypes.CourseResources) => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const courseSlice = useAppSelector((state) => state.course);
  const postCommentLoading =
    courseSlice.loading.commentOnLecture ||
    courseSlice.loading.replyOnLectureComment;
  const [input, setInput] = useState<string>("");
  const [replyingTo, setReplyingTo] =
    useState<null | Store.CourseLectureComment>(null);

  /**
   * Lifecycle methods
   */
  // useEffect(() => {
  //   dispatch(getComments(lecture.id))
  // }, [])
  /**
   * End lifecycle methods
   */

  /**
   * Action functions
   */
  const postComment = async () => {
    try {
      if (replyingTo) {
        await dispatch(
          replyOnLectureComment({
            lecture_comment_id: replyingTo.id,
            comment: input,
          })
        ).unwrap();
      } else {
        await dispatch(
          commentOnLecture({
            course_id: data.id,
            lecture_id: lecture.id,
            comment: input,
          })
        ).unwrap();
      }
      await dispatch(refreshCourseSingle(data.slug));
      setOpen(true);
    } catch (error) {
      console.log("Failed to post comment: ", error);
    }
  };
  /**
   * End actions functions
   */

  /**
   * Handler functions
   */
  const handleReplyPress = (comment: Store.CourseLectureComment) => {
    setReplyingTo(comment);
  };
  const handleBackToCommentsPress = () => {
    setReplyingTo(null);
  };
  /**
   * End handler functions
   */

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        // onRequestClose={() => setOpen(false)}
      >
        <ContainerNonScroll className="gap-3" setOpen={setOpen}>
          <View>
            <CustomText>
              Discussion on{" "}
              <CustomText variant="600">{lecture.title}</CustomText>
            </CustomText>
            <Divider className="my-3" />
          </View>
          {!replyingTo ? (
            <ScrollView className="flex-1">
              {lecture.comments.map((comment) => (
                <View key={comment.id} className="mb-2">
                  <View
                    className="px-3 py-2 rounded-tr rounded-br rounded-bl"
                    style={{
                      backgroundColor: theme.colors.backgroundGrayLight,
                    }}
                  >
                    <View className="flex-row flex-wrap items-center">
                      <CustomText variant="600">{comment.user.name}</CustomText>
                      <CustomText
                        className="ml-2"
                        style={{ fontSize: 10 }}
                        variant="300"
                      >
                        {convertToTimeAgo(comment.updated_at)}
                      </CustomText>
                    </View>
                    <CustomText className="mt-1">{comment.comment}</CustomText>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableRipple onPress={() => handleReplyPress(comment)}>
                      <View className="flex-row items-center">
                        <ReplyIcon color={theme.colors.text} />
                        <CustomText className="ml-2" variant="400">
                          Reply
                        </CustomText>
                      </View>
                    </TouchableRipple>
                    <CustomText className="300">
                      {" "}
                      | {comment.comment_replies.length} Replies
                    </CustomText>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View className="flex-1">
              <View className="flex-row mb-2">
                <TouchableRipple onPress={handleBackToCommentsPress}>
                  <View className="flex-row items-center">
                    <CaretLeftIcon scale={0.6} color={theme.colors.text} />
                    <CustomText className="ml-2">Back to comments</CustomText>
                  </View>
                </TouchableRipple>
                {/* <CustomText variant="400i">Replying To</CustomText> */}
              </View>
              <Divider className="my-1" />
              <CustomText className="mb-1" variant="300i">
                Replying to
              </CustomText>
              <View
                className="px-3 py-2 rounded-tr rounded-br rounded-bl"
                style={{ backgroundColor: theme.colors.backgroundGrayLight }}
              >
                <View className="flex-row flex-wrap items-center">
                  <CustomText variant="600">{replyingTo.user.name}</CustomText>
                  <CustomText
                    className="ml-2"
                    style={{ fontSize: 10 }}
                    variant="300"
                  >
                    {convertToTimeAgo(replyingTo.updated_at)}
                  </CustomText>
                </View>
                <CustomText className="mt-1">{replyingTo.comment}</CustomText>
              </View>
              <ScrollView className="flex-1 mt-2">
                {replyingTo.comment_replies.map((comment) => (
                  <View className="mb-2 ml-2" key={comment.id}>
                    <View
                      className="px-3 py-2 rounded-tr rounded-br rounded-bl"
                      style={{
                        backgroundColor: theme.colors.backgroundGrayLight,
                      }}
                    >
                      <View className="flex-row flex-wrap items-center">
                        <CustomText variant="600">
                          {comment.user.name}
                        </CustomText>
                        <CustomText
                          className="ml-2"
                          style={{ fontSize: 10 }}
                          variant="300"
                        >
                          {convertToTimeAgo(comment.updated_at)}
                        </CustomText>
                      </View>
                      <CustomText className="mt-1">
                        {comment.comment}
                      </CustomText>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <View className="flex-row gap-2 items-center">
            <InputPrimary
              placeholder="Post your question/answer here"
              onChangeText={(text) => setInput(text)}
              containerStyle={{ flex: 1 }}
            />
            <PrimaryButton
              loading={postCommentLoading}
              text="Post"
              color="primary"
              onPress={postComment}
            />
          </View>
        </ContainerNonScroll>
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
            useGoogleDriveViewer={true}
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
const ContainerNonScroll = ({
  setOpen,
  children,
  className,
}: {
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 30,
      }}
      className={className}
    >
      <PrimaryButton
        className="padding-[10px] ml-auto my-5"
        onPress={() => setOpen(false)}
        icon={<CrossIcon />}
        color="primary"
        text="Close"
      />
      {children}
    </View>
  );
};

const createStyles = () => {
  return StyleSheet.create({});
};
