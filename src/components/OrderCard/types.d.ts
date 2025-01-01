namespace PropTypes {
    type OrderCard = {
        data: Store.OrderListData,
        onViewPress?: (data : Store.OrderListData) => void 
    }
}