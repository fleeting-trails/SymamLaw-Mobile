namespace Store {
    type Library = {
        list: {
            data: Array<BookListData>;
            pagination: API.Pagination;
        };
        loading: {
            fetchBooklist: boolean;
            fetchMoreBooks: boolean;
            searchBooks: boolean
        };
        error: any;
    }
    type BookListData = {
        id: number
        title: string
        slug: string
        price: number
        discount: number
        discount_type: BookDiscountType
        book_image: string
        author: string
        book_category_id: number
        description: any
        stock: number
        status: number
        book_category: {
            id: number
            title: string
        }
    }
    type BookData = BookListData

    type BookDiscountType = "percentage" | "fixed"
}