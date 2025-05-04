import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components';
import CustomText from '../../atoms/CustomText/CustomText';
import { useAppSelector } from '../../redux/hooks';
import { ScreenContainerNonScroll } from '../../components/ScreenContainer/ScreenContainerNonScroll';
import HtmlRenderer from '../../components/Renderer/HtmlRenderer';
import { RadioButton, Checkbox, Divider } from 'react-native-paper';

const MCQOptionView = ({ question }: { question: Store.ExamQuestion }) => {

  return question.multiple_answer === 0 ? (
    <View className="p-4 flex gap-2">
      <RadioButton.Group
        value={""}
        onValueChange={() => ""}
      >
        {question.option.map((option) => (
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
      {question.option.map((option) => (
        <View key={option.id} className="flex flex-row gap-2">
          <Checkbox
            status={"unchecked"}
          />
          <CustomText>{option.option_text}</CustomText>
        </View>
      ))}
    </View>
  );
}

const ExamPreview = () => {
  const exam = useAppSelector(state => state.exam.currentExam);
  return (
    exam != null ?
      <ScreenContainer>
        <CustomText className="text-lg" variant='700'>{exam.title}</CustomText>
        <HtmlRenderer html={exam.description} />
        <Divider />
        {exam.question.map(q => (
          q.question_type === 'mcq' ? (
            <View className="ml-2">
              <HtmlRenderer html={q.question_text} />
              <MCQOptionView question={q} />
            </View>
          ) : (
            <View className="gap-2 ml-2">
              <HtmlRenderer html={q.question_text} />
              <CustomText variant='300i'>Descriptive answer...</CustomText>
            </View>
          )
        ))}
      </ScreenContainer> :
      <ScreenContainerNonScroll>
        <View className='h-full w-full items-center justify-center'>
          <CustomText>404: No Exam Found</CustomText>
        </View>
      </ScreenContainerNonScroll>
  );
};

export default ExamPreview;
