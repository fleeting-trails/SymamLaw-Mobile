namespace Store {
    type Exam = {
        examsByCategory: {
            data: ExamDataShort[],
            pagination: API.Pagination
        },
        examCategories: {
            data: ExamCategoryData[],
            pagination: API.Pagination
        },
        loading: {
            fetchExamCategories: boolean,
            fetchExamsByCategory: boolean
        },
        error: any
    }
    type ExamDataShort = {
        id: number
        title: string
        slug: string
        description: string
        exam_type: string
        exam_format: string
        exam_category_id: string
        subject_id: string
        course_id: any
        start_datetime: string
        end_datetime: string
        excerpt: string
        image: any
        duration: string
        price: string
        discount: string
        is_free: string
        status: string
        total_marks: string
        pass_marks: string
        total_questions: string
        created_at: string
        updated_at: string
        attempted_exam_count: number
        user_attempt_count: number
        total_passed_count: number
        user_passed_count: number
    }
    type ExamData = {
        id: number;
        title: string;
        slug: string;
        description: string;
        exam_type: string;
        exam_format: ExamFormat;
        exam_category: {
            id: number;
            title: string;
        };
        subject: null | {
            id: number;
            title: string;
        };
        course: null | {
            id: number;
            title: string;
        };
        start_datetime: string;
        end_datetime: string;
        excerpt: string;
        image: any;
        duration: string;
        price: number;
        discount: number;
        is_free: number;
        status: number;
        total_marks: number;
        created_at: string;
        updated_at: string;
        questions: ExamQuestion[];
    };
    type ExamCategoryData = {
        id: number
        title: string
        slug: string
        status: string
        created_at: string
        updated_at: string
    }
    type ExamQuestion = {
        id: number;
        exam_id: number;
        question_text: string;
        slug: string;
        question_type: string;
        marks: number;
        image: null | API.Image;
        description: string;
        multiple_answer: number;
        status: number;
        created_at: string;
        updated_at: string;
        option: ExamQuestionOption[];
        accept: ExamWrittenAnswerAccept[];
    };
    type ExamQuestionOption = {
        id: number;
        question_id: number;
        option_text: string;
        slug: string;
        is_correct: number;
        created_at: string;
        updated_at: string;
    };
    type ExamFormat = "mcq" | "written";
    type ExamQuestionType = ExamFormat;
    type ExamWrittenAnswerAccept = "attachment" | "richtext";
    type ExamWrittenAnswerAccept = "attachment" | "richtext";
}