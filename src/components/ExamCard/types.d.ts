namespace PropTypes {
    type ExamCard = Omit<import('react-native-paper').TouchableRippleProps, 'children' | 'onPress'> & {
        data: ExamCardData,
        onPress?: (id: string) => void
    }
    type ExamCardData = {
        id: string,
        name: string,
        duration: number, // In Minute
        totalQuestions: number
    }
}