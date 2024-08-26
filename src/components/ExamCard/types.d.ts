namespace PropTypes {
    type ExamCard = Omit<import('react-native-paper').TouchableRippleProps, 'children' | 'onPress'> & {
        data: ExamCardData,
        onPress?: (id: string, slug: string) => void
    }
    type ExamCardData = {
        id: string,
        slug: string,
        name: string,
        duration: number, // In Minute
        totalQuestions: number,
        package_items: Array<Store.ExamPackageHint>
    }
}