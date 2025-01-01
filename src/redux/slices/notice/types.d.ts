namespace Store {
    type Notice = {
        notices: {
            data: NoticeListData[],
            pagination: API.Pagination
        },
        currentNotice: NoticeData | null,
        loading: {
            listNotices: boolean,
            listMoreNotices: boolean,
            fetchNoticeDetails: boolean
        },
        error: any
    }
    type NoticeListData = {
        id: number
        title: string
        slug: string
        start_date: string
        end_date: string
        description: string
        created_by: number
        status: API.WaythinBoolean
        created_at: string
        updated_at: string
    };
    type NoticeData = NoticeListData;
}