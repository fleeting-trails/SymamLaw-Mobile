namespace PropTypes {
    type useCoursePurchaseAction = {
        setLoading?: (loading: boolean) => void,
        onCancel?: () => void,
        onPurchaseProcessEnd?: (res: Store.CourseData | Store.CourseListData, purchaseData: Store.PurchaseResponseData) => void
    }
    type useCompleteOrderAction = {
        setLoading?: (loading: boolean) => void,
        onCancel?: () => void,
        setError?: (data: {
            isError: boolean,
            message: string
        }) => void,
        onPurchaseProcessEnd?: (res: Store.CreateOrderAPIResponse, purchaseData: Store.PurchaseResponseData) => void
    }
    type usePlaceOrderPaymentAction = {
        setLoading?: (loading: boolean) => void,
        onCancel?: () => void,
        onPaymentProcessEnd?: (res: Store.CourseData | Store.CourseListData, purchaseData: Store.PurchaseResponseData) => void
    }
}
