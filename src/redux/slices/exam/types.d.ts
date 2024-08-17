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
        currentExam: null | ExamData,
        currentExamResult: null | ExamResultData,
        attemptedExams: Array<AttemptedExamListData>,
        loading: {
            fetchExamCategories: boolean,
            fetchExamsByCategory: boolean,
            fetchExamDetails: boolean,
            submitExam: boolean,
            listAttemptedExams: boolean,
            getExamResult: boolean
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
        id: number
        title: string
        slug: string
        description: string
        exam_type: string
        exam_format: string
        exam_category_id: string
        subject_id: string
        course_id: any
        start_datetime: any
        end_datetime: any
        excerpt: string
        image: string
        duration: string
        price: string
        discount: any
        is_free: string
        status: string
        total_marks: string
        pass_marks: string
        total_questions: string
        created_by: string
        created_at: string
        updated_at: string
        attempted_exam_count: number
        user_attempt_count: number
        total_passed_count: number
        user_passed_count: number
        question: Question[]
        results: any[]
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
        id: number
        exam_id: string
        question_text: string
        slug: string
        question_type: ExamQuestionType
        is_short: API.WaythinBoolean
        marks: string
        image: any
        description: string
        multiple_answer: API.WaythinBoolean
        status: string
        image_id: any
        created_at: string
        updated_at: string
        option: Option[]
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
    type ExamAttachUploadResponse = {
        question_id: number,
        files: Array<string>
    }
    type AttemptedExamListData = {
        id: number
        exam_id: string
        user_id: string
        submission_id: string
        rank: any
        total_score: string
        is_checked: string
        checked_by: any
        created_at: string
        updated_at: string
        exam: {
            id: number
            title: string
            slug: string
            description: string
            exam_type: string
            exam_format: string
            exam_category_id: string
            subject_id: string
            course_id: any
            start_datetime: any
            end_datetime: any
            excerpt: string
            image: string
            duration: string
            price: any
            discount: any
            is_free: string
            status: string
            total_marks: string
            pass_marks: string
            total_questions: string
            created_by: string
            is_negative_enabled: string
            is_answer_changable: any
            negative_marks: string
            created_at: string
            updated_at: string
            attempted_exam_count: number
            user_attempt_count: number
            total_passed_count: number
            user_passed_count: number
            UserTimeTracker: any
        }
    }
    type ExamResultData = {
        id: number
        exam_id: number
        user_id: number
        submission_id: number
        rank: any
        total_score: number
        created_at: string
        updated_at: string
        exam: ExamResultQuestion
    }
    type ExamResultQuestion = {
        id: number
        exam_id: number
        question_text: string
        slug: string
        question_type: string
        is_short: number
        marks: number
        image: string
        description: string
        multiple_answer: number
        status: number
        created_at: string
        updated_at: string
        assigned_marks: number
        option: ExamResultOption[]
    }
    type ExamResultOption = {
        id: number
        question_id: number
        option_text: string
        slug: string
        is_correct: boolean
        option_index: number
        created_at: string
        updated_at: string
        is_user_submitted: boolean
    }
    type ExamFormat = "mcq" | "written";
    type ExamQuestionType = ExamFormat;
    type ExamWrittenAnswerAccept = "attachment" | "richtext";
    type ExamWrittenAnswerAccept = "attachment" | "richtext";
}