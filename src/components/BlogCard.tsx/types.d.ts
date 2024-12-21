namespace PropTypes {
    type BlogCard = import('react-native').ViewProps & {
        data: Store.BlogListData,
        onPress?: (blog: Store.BlogListData) => void
    }
}