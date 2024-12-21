namespace PropTypes {
    type BookCard = {
        data: Store.BookListData
        onPress?: (book: Store.BookListData) => void
    }
}