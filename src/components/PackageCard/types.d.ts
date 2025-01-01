namespace PropTypes {
    type PackageCard = {
        data: Store.PackageData,
        onPress?: (data: Store.PackageData) => void
        onPurchaseProcessEnd?: (res: Store.PackageData, purchaseData: Store.PurchaseResponseData) => void,
        onCancel?: () => void 
    }
}