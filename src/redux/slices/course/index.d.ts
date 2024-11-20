namespace Store {
    type Course = {
        courses: {
            data: CourseListData[],
            pagination: API.Pagination
        },
        loading: {
            listCourses: boolean,
            loadMoreCourses: boolean
        },
        error: any
    }
    type CourseListData =  {
        id: number
        title: string
        slug: string
        category_id: string
        subject_id: string
        routine_id: string | null
        course_type: string
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
        subscription_type: string
        created_at: string
        updated_at: string
        is_user_purchased: boolean
        subject: CourseSubject
        category: CourseSubject
        routine: any
      }
      type CourseSubject =  {
        id: number
        title: string
        slug: string
        status: API.WaythinBoolean
        description: string
        created_at: string
        updated_at: string
      }
      type CourseCategory =  {
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
}