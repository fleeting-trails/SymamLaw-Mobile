namespace Store {
  type Course = {
    courses: {
      data: CourseListData[],
      pagination: API.Pagination
    },
    currentCourse: CourseData | null,
    loading: {
      listCourses: boolean,
      loadMoreCourses: boolean,
      getCourseSingle: boolean,
      markLectureAsViewed: boolean,
      commentOnLecture: boolean,
      replyOnLectureComment: boolean,
      getSubscriptionRedirectLink: boolean
    },
    error: any
  }
  type CourseListData = {
    id: number
    title: string
    slug: string
    category_id: string
    subject_id: string
    routine_id: string | null
    course_type: CourseType
    price: string
    discount: string
    discount_type: string
    course_start_date: string
    course_end_date: string
    description: string
    excerpt: string
    image: import('react-native').ImageSourcePropType | null
    status: API.WaythinBoolean
    course_curriculum: string
    subscription_price: string
    subscription_discount: string
    subscription_type: CourseSubscriptionTypeEnum
    created_at: string
    updated_at: string
    is_user_purchased: boolean
    subject: CourseSubject
    category: CourseSubject
    routine: any
  }
  type CourseData = CourseListData & {
    routine_id: any
    is_subscribed: number
    total_section: number
    total_lecture: number
    is_live_class_ongoing: {
      status: number
      link: string
      lecture_title: string
      lecture_description: string
      lecture_id: number
      course_section_id: string
    }
    latestLecture: any[]
    course_progress: string
    course_sections?: CourseSection[]
    course_instructors: CourseInstructor[]
    routine: any
  }
  type CourseSection = {
    id: number
    title: string
    slug: string
    course_id: string
    total_lectures: string
    total_minutes: string
    section_index: string
    status: string
    created_at: string
    updated_at: string
    lectures: CourseLecture[]
  }
  type CourseLecture =  {
    id: number
    title: string
    slug: string
    description: string
    course_section_id: string
    lecture_type: string
    exam_id?: string
    is_live_started: string
    live_ended: string
    link: string
    lecture_index: string
    is_preview_enabled: string
    status: string
    created_at: string
    updated_at: string
    is_viewed: number
    lecture_documents: CourseLectureDocument[]
    exam?: CourseExam
    comments: any[]
  }
  type CourseLectureDocument = {
    id: number
    course_id: string
    lecture_id: string
    document_id: string
    status: string
    created_at: string
    updated_at: string
    document: API.Document
  }
  type CourseExam = Store.ExamData
  type CourseInstructor = {
    id: number
    course_id: string
    instructor_id: string
    created_at: string
    updated_at: string
  }



  type CourseSubject = {
    id: number
    title: string
    slug: string
    status: API.WaythinBoolean
    description: string
    created_at: string
    updated_at: string
  }
  type CourseCategory = {
    id: number
    title: string
    slug: string
    serial: any
    status: API.WaythinBoolean
    description: string
    image: import('react-native').ImageSourcePropType | null
    created_at: string
    updated_at: string
  }
  type CourseSubscriptionTypeEnum = "paid" | "free"
  type CourseType = "recorded" | "live"
}