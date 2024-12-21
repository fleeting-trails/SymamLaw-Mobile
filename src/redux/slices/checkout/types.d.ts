namespace Store {
    type Checkout = {
        items: Array<CheckoutItem>;
        amount: {
            total: number;
            subtotal: number;
            delivery: number;
        }
        loading: boolean;
        error: any;
    }
    type CheckoutItem = {
        id: number;
        quantity: number;
        title: string;
        originalPrice: number;
        discount: number;
        discountType: "percentage" | "fixed";
        image: string;
        details: Store.BookData;
        type: CheckoutItemTypes;
    }

    type CheckoutItemTypes = "book";
}