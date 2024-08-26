namespace Store {
    type Package = {
        packages: Array<PackageData>,
        subscribedPackages: Array<PackageData>,
        unSubscribedPackages: Array<PackageData>
        error: any,
        loading: {
            listPackages: boolean,
            listUnsubscribedPackages: boolean,
            listSubscribedPackages: boolean
        }
    }
    type PackageData = {
        id: number,
        added_by_user: {
            address: string | null,
            email: string | null,
            id: number,
            name: string,
            phone: string | null,
            unique_id: string | null
        },
        description: string | null,
        discount: string,
        duration: string,
        final_price: number,
        image: string | null,
        is_popular: API.WaythinBoolean,
        name: string,
        price: string,
        slug: string,
        package_items: Array<PackageItem>,
        status: API.WaythinBoolean
    }
    type PackageItem = {
        id: number,
        added_by: string,
        course: null,
        course_id: null | string,
        created_at: string,
        exam: null,
        exam_id: null | string,
        package_id: string,
        status: API.WaythinBoolean,
        updated_at: string
    }
    type PurchaseResponseData = {
        tran_id: string,
        amount: string,
        sub_id: string,
        status: "success" | "failed"
    }
}