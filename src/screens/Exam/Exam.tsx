import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import useAppTheme from "../../hooks/useAppTheme";
import { ScreenContainer } from "../../components";
import BottomDrawer from "../../atoms/Drawer/BottomDrawer";
import CustomText from "../../atoms/CustomText/CustomText";
import PrimaryButton from "../../atoms/Button/PrimaryButton";
import dummyQuestionsData from "./dummyExam.json";
import { Checkbox, Paragraph } from "react-native-paper";
import { formatSecondToHour } from "../../utils/helpers";
import { CaretLeftIcon, CaretRightIcon } from "../../assets/Icons";
import { ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

export default function Exam() {
  const theme = useAppTheme();
  const styles = createStyles({ theme });
  const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
  const [questions, setQuestions] = useState(dummyQuestionsData);
  const initialTime = 10000;
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(dummyQuestionsData[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
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
    if (currentQuestionIndex < dummyQuestionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    console.log("Current question index", currentQuestionIndex);
    setCurrentQuestion(dummyQuestionsData[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  return (
    <View
      className="p-3 flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <View className="flex flex-row">
        <CustomText variant="500">Time Left</CustomText>
        <CustomText className="ml-auto">{formatSecondToHour(time)}</CustomText>
      </View>
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
          {currentQuestionIndex < dummyQuestionsData.length - 1 && (
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
          <CustomText>{currentQuestion.description}</CustomText>
          <View className="mt-5">
            <MCQOptionsView
              onChange={(data) => console.log("Value", data.value)}
              options={currentQuestion.option}
              type={currentQuestion.multiple_answer ? "multiple" : "single"}
            />
          </View>
        </ScrollView>
      </View>
      <View className="">
        <PrimaryButton
          className="mt-auto"
          text="View Questions"
          onPress={() => setOpenBottomDrawer(true)}
        />
      </View>
      <BottomDrawer open={openBottomDrawer} setOpen={setOpenBottomDrawer}>
        <View>
          <CustomText>Bottom Drawer Items</CustomText>
        </View>
      </BottomDrawer>
    </View>
  );
}

type MCQOptionsViewProps = {
  onChange?: (
    data:
      | {
          type: "single";
          value: string;
        }
      | { type: "multiple"; value: Array<string> }
  ) => void;
  type: "single" | "multiple";
  options: {
    id: number;
    question_id: number;
    option_text: string;
    slug: string;
    is_correct: number;
    created_at: string;
    updated_at: string;
  }[];
};
function MCQOptionsView({ onChange, type, options }: MCQOptionsViewProps) {
  const [selectedSingleAnswer, setSelectedSingleAnswer] = useState<string>("");
  const [multipleAnswerOptions, setMutlipleAnswerOptions] = useState<
    Array<{
      id: number;
      option_text: string;
      selected: boolean;
    }>
  >([]);
  useEffect(() => {
    if (type === "multiple") {
      setMutlipleAnswerOptions(
        options.map((option) => ({
          id: option.id,
          option_text: option.option_text,
          selected: false,
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
        {options.map((option) => (
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

const createStyles = ({ theme }: { theme: Config.Theme }) => {
  return StyleSheet.create({});
};
