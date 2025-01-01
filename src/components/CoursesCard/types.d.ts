namespace PropTypes {
    type CourseCard = {
        data: CourseCardData,
        onPress?: (slug: string) => void
    }
    type CourseCardData = {
        id: string,
        title: string,
        slug: string,
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