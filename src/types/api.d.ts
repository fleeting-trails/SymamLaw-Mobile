namespace API {
    type ResponseBodyPaginated<T> = {
        success: boolean;
        data: {
            data: T;
            links: {
                first: null | string;
                last: null | string;
                prev: null | string;
                next: null | string;
            };
            meta: {
                current_page: number;
                from: number;
                last_page: number;
                links: Array<{
                    url?: string;
                    label: string;
                    active: boolean;
                }>;
                path: string;
                per_page: number;
                to: number;
                total: number;
            };
        };
        message: string;
        code: number;
    };
    type Pagination = {
        current: number,
        total: number,
        totalPages: number,
        pageSize: number
    }
    type Document = {
        id: number
        file_name: string
        file_type: string
        status: string
        created_by: string
        name: string
        created_at: string
        updated_at: string
    }
    type Boolean = 1 | 0
    // type WaythinBoolean = "1" | "0"
    type WaythinBoolean = API.Boolean
}
