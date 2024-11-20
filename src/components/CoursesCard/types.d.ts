namespace PropTypes {
    type CourseCard = {
        data: CourseCardData
    }
    type CourseCardData = {
        id: string,
        title: string,
        description: string,
        author?: {
            image: import('react-native').ImageSourcePropType,
            name: string
        },
        courseHour: string,
        thumbnail: import('react-native').ImageSourcePropType | null
    }
    type CourseCardList = {
        data: Store.CourseListData,
        onPress?: (data: Store.CourseListData) => void
    }
}