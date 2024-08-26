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
        examSubCategories: {
            data: ExamSubCategoryData[],
            pagination: API.Pagination
        },
        currentExam: null | ExamData,
        currentExamResult: null | ExamResultData,
        attemptedExams: Array<AttemptedExamListData>,
        recommendedExams: ExamData[],
        loading: {
            fetchExamCategories: boolean,
            fetchExamSubCategories: boolean,
            fetchExamsByCategory: boolean,
            fetchExamDetails: boolean,
            submitExam: boolean,
            listAttemptedExams: boolean,
            getExamResult: boolean,
            listRecommendedExams: boolean
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
        package_items: Array<ExamPackageHint>
    }
    type ExamData = {
        id: number
        title: string
        slug: string
        description: string
        exam_type: string
        exam_format: string
        exam_category_id: string
        exam_category: {
            created_at: string,
            id: number,
            parent_id: string,
            slug: string,
            status: API.WaythinBoolean,
            title: string,
            updated_at: string
        }
        subject_id: string
        subject: {
            created_at: string,
            id: number,
            description: string,
            parent_id: string,
            slug: string,
            status: API.WaythinBoolean,
            title: string,
            updated_at: string
        }
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
        package_items: Array<ExamPackageHint>
    };
    type ExamUnsubscribed = {
        is_authorized: boolean,
        is_subscribed: boolean
    }
    type ExamCategoryData = {
        id: number
        title: string
        slug: string
        status: string
        created_at: string
        updated_at: string
    }
    type ExamSubCategoryData = ExamCategoryData
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
        checked_by: null,
        created_at: string,
        exam: ExamDataResultVariant,
        exam_id: string,
        id: number,
        is_checked: API.WaythinBoolean,
        rank: null,
        submission: {
            created_at: string,
            exam_id: string,
            id: number,
            submission_type: "submit",
            updated_at: string,
            user_id: string,
            submitted_answers: Array<{
                assigned_marks: string,
                comment: null | string,
                created_at: string,
                id: number,
                option_id: string,
                question_id: string,
                submission_id: string,
                updated_at: string,
                written_answer: null | string,
                written_file: null
            }>
        },
        submission_id: string,
        total_score: string,
        updated_at: string,
        user_id: string
    }
    type ExamDataResultVariant = {
        UserTimeTracker: null,
        attempted_exam_count: number,
        course_id: null,
        created_at: string,
        created_by: string,
        description: string,
        discount: string,
        duration: string,
        end_datetime: null,
        exam_category_id: string,
        exam_format: ExamFormat,
        exam_type: ExamType,
        excerpt: string,
        id: number,
        image: string,
        is_answer_changable: null,
        is_free: API.WaythinBoolean,
        is_negative_enabled: API.WaythinBoolean,
        negative_marks: string,
        pass_marks: string,
        price: null,
        slug: string,
        start_datetime: null | string,
        status: API.WaythinBoolean,
        subject_id: string,
        title: string,
        total_marks: string,
        total_passed_count: number,
        total_questions: string,
        updated_at: string,
        user_attempt_count: number,
        user_passed_count: number
        question: ExamQuestionResultVariant[]
    }
    type ExamQuestionResultVariant = {
        assigned_marks: string,
        created_at: string,
        description: string, 
        exam_id: string,
        id: number,
        image: null | string,
        image_id: string,
        is_short: API.WaythinBoolean,
        marks: string,
        multiple_answer: API.WaythinBoolean,
        option: ExamOptionsResultVariant[],
        question_text: string,
        question_type: ExamQuestionType,
        slug: string,
        status: API.WaythinBoolean,
        updated_at: string
    }
    type ExamOptionsResultVariant = {
        created_at: string,
        id: number,
        is_correct: API.WaythinBoolean,
        is_user_submitted: null | 1,
        option_index: string,
        option_text: string,
        question_id: string,
        slug: string,
        updated_at: string
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
        total_marks: string
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
    type ExamPackageHint = {
        id: number,
        exam_id: string,
        package_id: string,
        package: {
            id: number,
            name: string,
            slug: string
        }
    }
    type ExamFormat = "mcq" | "written";
    type ExamType = "live" | "static"
    type ExamQuestionType = ExamFormat;
    type ExamWrittenAnswerAccept = "attachment" | "richtext";
    type ExamWrittenAnswerAccept = "attachment" | "richtext";
}