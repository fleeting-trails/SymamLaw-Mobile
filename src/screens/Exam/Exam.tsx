import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import { ScreenContainer } from "../../components";
import BottomDrawer from "../../atoms/Drawer/BottomDrawer";
import CustomText from "../../atoms/CustomText/CustomText";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import dummyQuestionsData from "./dummyExam.json";
import { Checkbox, Divider, Paragraph, TextInput } from "react-native-paper";
import { formatSecondToHour } from "../../utils/helpers";
import {
  AttachmentIcon,
  CaretLeftIcon,
  CaretRightIcon,
  DeleteIcon,
  HomeIcon,
} from "../../assets/Icons";
import { ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { IconButtonCustom, InputUnderlined } from "../../atoms";
import * as DocumentPicker from "expo-document-picker";
import useAppNavigation from "../../hooks/useAppNavigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ScreenLoading from "../../atoms/Loader/ScreenLoading";
import {
  logExamTracker,
  submitAttachmentUpload,
  submitExam,
} from "../../redux/slices/exam/examSlice";
import FormData from "form-data";
import HtmlRenderer from "../../components/Renderer/HtmlRenderer";

type CustomQuestionData = Store.ExamQuestion & {
  option_id?: Array<string>;
  written_answer?: string;
  written_file?: Array<DocumentPicker.DocumentPickerAsset>;
};
type ScreenType = "exam" | "confirmation";
export default function Exam({ route } : PropTypes.Exam) {
  const dispatch = useAppDispatch();
  // const { lecture_id, course_id } = route.params;
  const lecture_id = route.params?.lecture_id;
  const course_id = route.params?.course_id;
  const examState = useAppSelector((state) => state.exam);
  const currentExam = examState.currentExam;
  const loading = examState.loading.fetchExamDetails || examState.loading.logExamTracker;
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("exam");
  const [timeExpired, setTimeExpired] = useState(false);
  const [submittedData, setSubmittedData] = useState<
    CustomQuestionData[] | null
  >(null);

  useEffect(() => {
    if (currentExam) {
      dispatch(logExamTracker(currentExam.id))
    }
  }, [])

  const handleExamEnd = (
    questionData: CustomQuestionData[],
    isTimeExpired: boolean
  ) => {
    setCurrentScreen("confirmation");
    setSubmittedData(questionData);
    setTimeExpired(isTimeExpired);
  };

  const handleReturnToQuestions = () => {
    setCurrentScreen("exam");
  };

  return currentScreen === "exam" ? (
    <ScreenLoading isLoading={loading}>
      {currentExam && (
        <ExamScreen onExamEnd={handleExamEnd} examData={currentExam} />
      )}
    </ScreenLoading>
  ) : (
    currentExam && (
      <ExamConfirmationScreen
        examData={currentExam}
        submittedData={submittedData as CustomQuestionData[]}
        isTimeExpired={timeExpired}
        onReturnToQuestions={handleReturnToQuestions}
        lecture_id={lecture_id}
        course_id={course_id}
      />
    )
  );
}

/**
 * Exam Screen
 */
type ExamScreenProps = {
  onExamEnd: (
    questionData: CustomQuestionData[],
    isTimeExpired: boolean
  ) => void;
  examData: Store.ExamData;
};
function ExamScreen({ onExamEnd, examData }: ExamScreenProps) {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
  // const [questions, setQuestions] = useState<CustomQuestionData[]>(
  //   dummyQuestionsData as Store.ExamQuestion[]
  // );
  const [questions, setQuestions] = useState<CustomQuestionData[]>(
    examData.question
  );
  // Time in second
  const initialTime = examData.duration
    ? parseInt(examData.duration) * 60
    : 10000;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<CustomQuestionData>(
    examData.question[0]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (examData.duration) {
      startTimer();
    }
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      handleTimeExpired();
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const moveToSelectedQuestion = (id: number) => {
    const selectedQuestion = questions.find((q) => q.id === id);
    if (selectedQuestion) setCurrentQuestion(selectedQuestion);
  };

  const handleMCQAnswerChange = (
    id: number,
    data:
      | {
          type: "single";
          value: string;
        }
      | { type: "multiple"; value: Array<string> }
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          if (data.type === "single") {
            return {
              ...q,
              option_id: [data.value],
            };
          } else {
            return {
              ...q,
              option_id: data.value,
            };
          }
        }
        return q;
      })
    );
  };

  const handleWrittenAnswer = (
    id: number,
    data: {
      textAnswer?: string;
      attachments?: DocumentPicker.DocumentPickerAsset[];
    }
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            written_answer: data.textAnswer,
            written_file: data.attachments,
          };
        }
        return q;
      })
    );
  };

  const checkIfAnswered = (question: CustomQuestionData) => {
    let answered = false;
    if (question.question_type === "mcq") {
      answered =
        question.option_id && question.option_id?.length !== 0 ? true : false;
    } else {
      answered =
        question.written_answer ||
        (question.written_file && question.written_file.length !== 0)
          ? true
          : false;
    }
    return answered;
  };

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    onExamEnd(questions, false);
  };
  const handleTimeExpired = () => {
    onExamEnd(questions, true);
  };

  // useEffect(() => {
  //   console.log(
  //     "Questions",
  //     questions.map((q) => ({
  //       option_id: q.option_id,
  //       written_answer: q.written_answer,
  //       written_file: q.written_file,
  //     }))
  //   );
  // }, [questions]);

  return (
    <View
      className="p-3 flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      {examData.duration && (
        <View className="flex flex-row">
          <CustomText variant="500">Time Left</CustomText>
          <CustomText className="ml-auto">
            {formatSecondToHour(time)}
          </CustomText>
        </View>
      )}
      <View className="flex-1 p-3 mt-3 border-t-slate-300 border-t-[1px]">
        <View className="flex flex-row items-center justify-between mb-6">
          <View>
            {currentQuestionIndex > 0 && (
              <PrimaryButton
                icon={
                  <CaretLeftIcon color={theme.colors.textLight} scale={0.5} />
                }
                text="PREV"
                color="primary"
                onPress={moveToPreviousQuestion}
              />
            )}
          </View>
          {currentQuestionIndex < questions.length - 1 && (
            <PrimaryButton
              endIcon={<CaretRightIcon color={theme.colors.textLight} />}
              text="NEXT"
              color="primary"
              onPress={moveToNextQuestion}
            />
          )}
        </View>
        <ScrollView>
          <CustomText variant="500" className="text-lg">
            {currentQuestion.question_text}
          </CustomText>
          <HtmlRenderer html={currentQuestion.description} />
          {/* <CustomText>{currentQuestion.description}</CustomText> */}
          <View className="mt-5">
            {questions[currentQuestionIndex].question_type === "mcq" ? (
              <MCQOptionsView
                onChange={(data) =>
                  handleMCQAnswerChange(
                    questions[currentQuestionIndex].id,
                    data
                  )
                }
                options={questions[currentQuestionIndex].option}
                type={
                  questions[currentQuestionIndex].multiple_answer === 1
                    ? "multiple"
                    : "single"
                }
                defaultValue={questions[currentQuestionIndex].option_id ?? null}
              />
            ) : (
              <WrittenQuestionResponseField
                answer={{
                  textAnswer: questions[currentQuestionIndex].written_answer,
                  attachments: questions[currentQuestionIndex].written_file,
                }}
                isShort={
                  questions[currentQuestionIndex].is_short === 1
                    ? true
                    : false
                }
                setAnswer={(data) =>
                  handleWrittenAnswer(questions[currentQuestionIndex].id, data)
                }
              />
            )}
          </View>
        </ScrollView>
      </View>
      <View className="flex flex-row gap-2">
        <View className="flex-1">
          <PrimaryButton
            // className="flex-1"
            text="View Questions"
            onPress={() => setOpenBottomDrawer(true)}
            color="primary"
          />
        </View>
        <View className="flex-1">
          <PrimaryButton
            className="w-full"
            text="Submit"
            style={{
              borderColor: theme.colors.primary,
              borderWidth: 1,
            }}
            onPress={handleSubmit}
            // color="primary"
          />
        </View>
      </View>
      <BottomDrawer open={openBottomDrawer} setOpen={setOpenBottomDrawer}>
        <View className="pt-3">
          <CustomText variant="600" className="mb-3 text-lg">
            Question List
          </CustomText>
          <View className="flex flex-row flex-wrap gap-2">
            {questions.map((question, i) => (
              <View
                key={question.id}
                className="relative h-[60px] w-[60px] rounded flex justify-center items-center"
                style={{
                  backgroundColor:
                    question.id === currentQuestion.id
                      ? theme.colors.primary
                      : theme.colors.primaryLight[1],
                }}
                onTouchEnd={() => moveToSelectedQuestion(question.id)}
              >
                <CustomText lightText>{`${i}`}</CustomText>
                <View
                  className={`absolute w-[87%] h-1 rounded bottom-1 left-1`}
                  style={{
                    backgroundColor: checkIfAnswered(question)
                      ? theme.colors.success
                      : theme.colors.primaryGray,
                  }}
                ></View>
              </View>
            ))}
          </View>
        </View>
      </BottomDrawer>
    </View>
  );
}
/**
 * End Exam Screen
 */

/**
 * Exam confirmation Screen
 */
type ExamConfirmationScreenProps = {
  examData: Store.ExamData;
  submittedData: CustomQuestionData[];
  isTimeExpired?: boolean;
  onReturnToQuestions?: () => void;
  lecture_id?: number,
  course_id?: number
};
type ExamConfirmationScreenStateTypes = "confirmation" | "loading" | "feedback";
function ExamConfirmationScreen({
  isTimeExpired = false,
  submittedData,
  onReturnToQuestions,
  examData,
  lecture_id,
  course_id
}: ExamConfirmationScreenProps) {
  const theme = useAppTheme();
  const user = useAppSelector((state) => state.auth.user);
  const { navigate } = useAppNavigation();
  const [screenState, setScreenState] =
    useState<ExamConfirmationScreenStateTypes>("confirmation");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTimeExpired) {
      setScreenState("loading");
      handleSubmission(submittedData);
    }
  }, [isTimeExpired]);

  const handleSubmission = async (submittedData: CustomQuestionData[]) => {
    if (screenState !== "loading") {
      setScreenState("loading");
    }
    if (!user) {
      navigate("Login");
    }
    var uploadedAttachments: Store.ExamAttachUploadResponse[] = [];
    const attachmentsForm = new FormData();
    var noAttachments = true;

    console.log("Submitted data", submittedData);
    submittedData.forEach((data) => {
      if (
        data.question_type === "written" &&
        data.is_short !== 1 &&
        data.written_file
      ) {
        noAttachments = false;
        attachmentsForm.append("question_ids[]", `${data.id}`);
        data.written_file.forEach((asset) => {
          attachmentsForm.append(`file${data.id}[]`, {
            uri: asset.uri,
            type: asset.mimeType,
            name: asset.name,
          });
        });
      }
    });
    console.log("Attachment log", noAttachments);
    // Display the key/value pairs
    console.log(attachmentsForm)
    if (!noAttachments) {
      try {
        uploadedAttachments = (await dispatch(
          submitAttachmentUpload(attachmentsForm)
        ).unwrap());
        console.log("Upload attachment response", uploadedAttachments);
      } catch (error) {
        console.log("Attachment upload error", error);
      }
    }
    console.log("Uploaded attachments", uploadedAttachments);


    const body = {
      user_id: (user as Store.UserData).id,
      exam_id: examData.id,
      submission_type: "submit",
      lecture_id: lecture_id,
      course_id: course_id,
      answers: submittedData.map((q) => {
        if (q.question_type === "written") {
          return {
            question_id: q.id,
            written_answer: q.written_answer ?? "",
            written_file: uploadedAttachments.find(
              (item) => `${item.question_id}` === `${q.id}`
            )?.files,
          };
        } else {
          return {
            question_id: q.id,
            option_id: q.option_id ? q.option_id.map((op) => parseInt(op)) : [],
          };
        }
      }),
    };
    console.log("Submit body", body);
    try {
      const res = await dispatch(submitExam(body)).unwrap();
      console.log("Submission resposne", res);
    } catch (error) {
      console.log("Failed to submit exam", error);
    }
    setScreenState("feedback");
  };

  if (screenState === "confirmation") {
    return (
      <View className="flex-1 gap-4 bg-white justify-center p-12">
        <View>
          <CustomText className="text-lg text-center" variant="600">
            Are you sure you want to submit your exam?
          </CustomText>
          <CustomText className="text-center">
            Submission of your exam is irreversable. If you want to submit your
            exam click confirm. Or click cancel and go back to edit
          </CustomText>
        </View>
        <View className="mx-auto flex flex-row gap-2">
          <View className="flex-1">
            <PrimaryButton
              text="Cancel"
              style={{
                borderColor: theme.colors.primary,
                borderWidth: 1,
              }}
              onPress={onReturnToQuestions}
            />
          </View>
          <View className="flex-1">
            <PrimaryButton
              text="Confirm"
              color="primary"
              onPress={() => handleSubmission(submittedData)}
            />
          </View>
        </View>
      </View>
    );
  } else if (screenState === "loading") {
    return (
      <View className="flex-1 gap-4 bg-white justify-center p-12">
        <View className="w-full justify-center items-center">
          <Image
            source={require("../../assets/loading.gif")}
            className="w-12 h-12 mr-5"
          />
        </View>
        <View className="justify-ceter items-center">
          <CustomText>Submitting Your Exam</CustomText>
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex-1 gap-4 bg-white justify-center p-12">
        <View className="justify-center items-center">
          <Image
            source={require("../../assets/exam-feedback.png")}
            className="h-[250px] w-[250px] object-contain"
          />
        </View>
        <View className="w-full mx-auto flex justify-center items-center gap-5 ">
          <CustomText>Your Exam Submitted successfully</CustomText>
          <PrimaryButton
            text="Back To Home"
            icon={<HomeIcon color={theme.colors.textLight} />}
            color="primary"
            onPress={() => navigate("HomeTabs")}
          />
        </View>
      </View>
    );
  }
}
/**
 * End exam confirmation screen
 */

/**
 * MCQ Option View Component
 */
type MCQOptionsType = "single" | "multiple";
type MCQOptionsViewProps = {
  onChange?: (
    data:
      | {
          type: "single";
          value: string;
        }
      | { type: "multiple"; value: Array<string> }
  ) => void;
  type: MCQOptionsType;
  defaultValue?: string[] | null;
  options: Store.ExamQuestionOption[];
};
function MCQOptionsView({
  onChange,
  type,
  options,
  defaultValue,
}: MCQOptionsViewProps) {
  const [selectedSingleAnswer, setSelectedSingleAnswer] = useState<string>("");
  // console.log("Selected answer", selectedSingleAnswer, defaultValue);
  const [multipleAnswerOptions, setMutlipleAnswerOptions] = useState<
    Array<{
      id: number;
      option_text: string;
      selected: boolean;
    }>
  >([]);

  useEffect(() => {
    setSelectedSingleAnswer(
      type === "single" ? (defaultValue ? defaultValue[0] : "") : ""
    );
  }, [defaultValue]);
  // function intializeMultipleAnswerFromDefaultValue (type : MCQOptionsType, defaultValue: string[] | null | undefined) {
  //   if (type === "multiple") {
  //     if (!defaultValue) return []
  //     else {
  //       return options.map(option => ({
  //         id: option.id,
  //         option_text: option.option_text,
  //         selected: defaultValue.find(v => v === `${option.id}`) ? true : false
  //       }))
  //     }
  //   } else {
  //     return []
  //   }
  // }
  useEffect(() => {
    if (type === "multiple") {
      setMutlipleAnswerOptions(
        options.map((option) => ({
          id: option.id,
          option_text: option.option_text,
          selected: defaultValue?.find((v) => v === `${option.id}`)
            ? true
            : false,
        }))
      );
    }
  }, [options]);
  const handleRadioChange = (value: string) => {
    setSelectedSingleAnswer(value);
    if (onChange) onChange({ type: "single", value });
  };
  const handleCheckboxChange = (id: number) => {
    var selectedOptions: Array<string> = [];
    setMutlipleAnswerOptions(
      multipleAnswerOptions.map((option) => {
        if (option.id === id) {
          if (!option.selected) {
            selectedOptions.push(`${id}`);
          }
          return {
            ...option,
            selected: !option.selected,
          };
        } else if (option.selected) selectedOptions.push(`${option.id}`);
        return option;
      })
    );
    if (onChange)
      onChange({
        type: "multiple",
        value: selectedOptions,
      });
  };
  return type === "single" ? (
    <View className="p-4 flex gap-2">
      <RadioButton.Group
        value={selectedSingleAnswer}
        onValueChange={handleRadioChange}
      >
        {[...options].sort((a, b) => a.option_index - b.option_index).map((option) => (
          <View key={option.id} className="flex flex-row gap-2">
            <RadioButton value={`${option.id}`} />
            <CustomText>{option.option_text}</CustomText>
          </View>
        ))}
        <View className="flex flex-row gap-2">
          <RadioButton value="2" />
          <CustomText>Option 2</CustomText>
        </View>
      </RadioButton.Group>
    </View>
  ) : (
    <View className="flex flex-col gap-2">
      {multipleAnswerOptions.map((option) => (
        <View key={option.id} className="flex flex-row gap-2">
          <Checkbox
            onPress={() => handleCheckboxChange(option.id)}
            status={option.selected ? "checked" : "unchecked"}
          />
          <CustomText>{option.option_text}</CustomText>
        </View>
      ))}
    </View>
  );
}
/**
 * End MCQ Option View COmponent
 */

/**
 * Written Response component
 */
type WrittenQuestionResponse = {
  textAnswer?: string;
  attachments?: DocumentPicker.DocumentPickerAsset[];
};
type WrittenQuestionResponseFieldProp = {
  setAnswer: (data: WrittenQuestionResponse) => void;
  answer?: WrittenQuestionResponse;
  isShort: boolean;
};
function WrittenQuestionResponseField({
  setAnswer,
  answer,
  isShort,
}: WrittenQuestionResponseFieldProp) {
  const theme = useAppTheme();
  // const [assetList, setAssetList] = useState<
  //   DocumentPicker.DocumentPickerAsset[]
  // >([]);

  // const [answer, setAnswer] = useState<{
  //   textAnswer?: string;
  //   attachments?: DocumentPicker.DocumentPickerAsset[];
  // }>({
  //   textAnswer: "",
  //   attachments: [],
  // });

  // useEffect(() => {
  //   if (defaultValue) {
  //     setAnswer(defaultValue)
  //   }
  // }, [])

  const handleDocumentSelection = async () => {
    try {
      const response: DocumentPicker.DocumentPickerResult =
        await DocumentPicker.getDocumentAsync({
          multiple: true,
        });
      if (!response.canceled) {
        const _assets = [
          ...(answer?.attachments ?? []),
          ...response.assets.map((asset) => asset),
        ];
        // setAssetList(_assets);
        const _answer = {
          ...answer,
          attachments: _assets,
        };
        setAnswer(_answer);
        // if (onChange) onChange(_answer);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const deleteAttachment = (index: number) => {
    if (answer && answer.attachments) {
      const _assets = answer.attachments.filter((asset, i) => index !== i);
      // setAssetList(_assets);
      const _answer = {
        ...answer,
        attachments: _assets,
      };
      setAnswer(_answer);
      // if (onChange) onChange(_answer);
    }
  };

  const handleTextAnswerChange = (value: string) => {
    const _answer = {
      ...answer,
      textAnswer: value,
    };
    setAnswer(_answer);
    // if (onChange) onChange(_answer);
  };

  // useEffect(() => {
  //   console.log("Default value", defaultValue);
  //   if (defaultValue) {
  //     setAnswer({
  //       textAnswer: defaultValue.textAnswer,
  //       attachments: defaultValue.attachments,
  //     });
  //     if (defaultValue.attachments) {
  //       setAssetList(defaultValue.attachments);
  //     }
  //   }
  // }, []);

  return (
    <View>
      <TextInput
        multiline={true}
        numberOfLines={5}
        value={answer?.textAnswer ?? ""}
        placeholder="Answer your question here or add as an attachment."
        onChangeText={handleTextAnswerChange}
      />

      {!isShort && (
        <View className="mt-3">
          <PrimaryButton
            onPress={handleDocumentSelection}
            icon={<AttachmentIcon />}
            text="Add Attachment"
            color="primary"
          />
        </View>
      )}
      {answer?.attachments && answer?.attachments?.length !== 0 && (
        <View className="mt-3">
          <CustomText>Uploaded Files</CustomText>
          {answer.attachments.map((file, i) => (
            <View
              key={file.uri}
              className="flex flex-row justify-between gap-2 items-center p-3 pr-0 border-b-[1px]"
              style={{ borderColor: theme.colors.primaryGrayLight }}
            >
              <View className="flex flex-row gap-2 items-center w-[200px]">
                <AttachmentIcon color={theme.colors.primary} />
                <CustomText variant="300i">{file.name}</CustomText>
              </View>
              <PrimaryButton
                onPress={() => deleteAttachment(i)}
                icon={<DeleteIcon color={theme.colors.error} />}
                text=""
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
/**
 * End Written response component
 */

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({});
};
