namespace Store {
    type Order = {
        list: {
            data: Array<OrderListData>,
            pagination: API.Pagination
        },
        loading: {
            listOrders: boolean,
            createOrder: boolean
        },
        error: any
    }
    type OrderListData = {
        id: number
        user_id: number
        shipping_name: string
        shipping_email: string
        shipping_phone: string
        shipping_district: string
        shipping_address: string
        shipping_zip: string
        order_note: string
        payment_method: string
        order_from: string
        total_amount: number
        transaction_id: string
        payment_status: string
        order_status: string
        redirect_url: string
        status: number
        created_at: string
        updated_at: string
        order_items: OrderItem[]
        user: User
    };
    type OrderItemBook = {
        id: number
        title: string
        author: string
        slug: string
        book_image: string
    };
    type OrderUserData = {
        id: number
        name: string
        email: string
        phone: string
    };

    type OrderItem = {
        id: number
        book_id: number
        qty: number
        price: number
        discounted_amount: any
        discount: any
        discount_type: any
        item_total: number
        order_id: number
        created_at: string
        updated_at: string
        book: Store.BookData
    }
    type CreateOrderAPIPayload = {
        user_id: number
        shipping_name: string
        shipping_email: string
        shipping_phone: string
        shipping_district: string
        shipping_address: string
        shipping_zip: string
        products: {
            book_id: number
            qty: number
        }[]
        order_note: string
        payment_method: PaymentMethods
        order_from: string
        redirect_url: string
    }
    type CreateOrderAPIResponse = API.ResponseBody<{
        order: {
            id: number
            total_amount: number
            payment_method: string
            shipping_name: string
        }
        payment_link: string
    }>
    type PaymentMethods = "ssl"
}