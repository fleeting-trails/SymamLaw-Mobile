import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { axiosExternal } from '../../../axios/axios';
import { RootState } from '../../store';
import { AxiosResponse } from 'axios';
import { tailorPaginationResponse } from '../../../utils/apiHelper';

interface NoticeState {
    notices: string[];
}

const initialState: Store.Notice = {

    notices: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 0,
            pageSize: 0,
        },
    },
    currentNotice: null,
    loading: {
        listNotices: false,
        listMoreNotices: false,
        fetchNoticeDetails: false,
    },
    error: null,

};


type ListNoticesProps = {
    [key: string]: string | number
} | undefined
export const listNotices = createAsyncThunk(
    'listNotices',
    async (filters: ListNoticesProps, thunkAPI) => {
        try {
            try {
                var _filters = filters;
                if (!filters) {
                    _filters = {
                        limit: 12,
                        page: 1
                    }
                }
                const res: AxiosResponse<API.ResponseBodyPaginated<Array<Store.NoticeListData>>> = await axiosExternal.get(`/notice/list`, { params: _filters })
                if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
                return { data: res.data }
            } catch (error) {
                return thunkAPI.rejectWithValue({ error })
            }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


export const listMoreNotices = createAsyncThunk(
    'listMoreNotices',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const { current, totalPages } = state.notice.notices.pagination;
            if (current >= totalPages) return { nodata: true }
            const res: AxiosResponse<API.ResponseBodyPaginated<Array<Store.NoticeListData>>> = await axiosExternal.get(`/notice/list`, {
                params: {
                    limit: 12,
                    page: current + 1
                }
            })
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const fetchNoticeDetails = createAsyncThunk(
    'fetchNoticeDetails',
    async (slug: string, thunkAPI) => {
        try {

            const res: AxiosResponse<API.ResponseBody<Store.NoticeData>> = await axiosExternal.get(`/notice/view/${slug}`)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)



const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // List notices
        builder.addCase(listNotices.pending, (state) => {
            state.loading.listNotices = true;
        })
        builder.addCase(listNotices.fulfilled, (state, action) => {
            state.loading.listNotices = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.notices.data = data;
                state.notices.pagination = pagination;
            }
        })
        builder.addCase(listNotices.rejected, (state, action) => {
            state.loading.listNotices = false;
            state.error = action.error;
        })

        // List more notices
        builder.addCase(listMoreNotices.pending, (state) => {
            state.loading.listMoreNotices = true;
        })
        builder.addCase(listMoreNotices.fulfilled, (state, action) => {
            state.loading.listMoreNotices = false;
            if (action.payload) {
                if (action.payload.nodata) return;  // No more data
                if (action.payload.data) {
                    const { data, pagination } = tailorPaginationResponse(action.payload.data);
                    state.notices.data = [...state.notices.data, ...data];
                    state.notices.pagination = pagination;
                }
            }
        })
        builder.addCase(listMoreNotices.rejected, (state, action) => {
            state.loading.listMoreNotices = false;
        })

        // Fetch notice details
        builder.addCase(fetchNoticeDetails.pending, (state) => {
            state.loading.fetchNoticeDetails = true;
        })
        builder.addCase(fetchNoticeDetails.fulfilled, (state, action) => {
            state.loading.fetchNoticeDetails = false;
            if (action.payload) {
                state.currentNotice = action.payload.data.data;
            }
        })
        builder.addCase(fetchNoticeDetails.rejected, (state, action) => {
            state.loading.fetchNoticeDetails = false;
            state.error = action.error; 
        })
    },
});

export const { } = noticeSlice.actions;

export default noticeSlice.reducer;