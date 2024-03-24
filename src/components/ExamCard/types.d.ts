namespace PropTypes {
    type ExamCard = {
        data: ExamCardData
    }
    type ExamCardData = {
        id: string,
        name: string,
        duration: number, // In Minute
        totalQuestions: number
    }
}