namespace PropTypes {
    type useCoursePurchaseAction = {
        setLoading?: (loading: boolean) => void,
        onCancel?: () => void,
        onPurchaseProcessEnd?: (res: Store.CourseData | Store.CourseListData, purchaseData: Store.PurchaseResponseData) => void
    }
}