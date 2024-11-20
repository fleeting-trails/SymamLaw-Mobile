import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal } from '../../../axios/axios'
import { tailorPaginationResponse } from '../../../utils/apiHelper'
import { RootState } from '../../store'


// Define the initial state using that type
const initialState: Store.Course = {
    courses: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 1,
            pageSize: 30
        },
    },
    loading: {
        listCourses: false,
        loadMoreCourses: false
    },
    error: null
}

export const listCourses = createAsyncThunk(
    'listCourses',
    async (params: { [key: string]: any } = {
        page: 1,
        limit: 30
    }, thunkAPI) => {
        try {
            try {
                const res = await axiosExternal.get(`/course/list`, { params })
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

export const loadMoreCourses = createAsyncThunk(
    'loadMoreCourses',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState
            const pagination = state.course.courses.pagination;
            const res = await axiosExternal.get(`/course/list`, {
                params: {
                    page: pagination.current + 1,
                    limit: pagination.pageSize
                }
            })
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)



export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        setcourse: (state) => {
            // Logic Goes Here
        },
    },
    extraReducers(builder) {

        // List courses
        builder.addCase(listCourses.pending, (state) => {
            state.loading.listCourses = true;
        })
        builder.addCase(listCourses.fulfilled, (state, action) => {
            state.loading.listCourses = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.courses.data = data;
                state.courses.pagination = pagination;
            }
        })
        builder.addCase(listCourses.rejected, (state, action) => {
            state.loading.listCourses = false;
            state.error = action.error;
        })

        // Load more courses
        builder.addCase(loadMoreCourses.pending, (state) => {
            state.loading.loadMoreCourses = true;
        })
        builder.addCase(loadMoreCourses.fulfilled, (state, action) => {
            state.loading.loadMoreCourses = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.courses.data = data;
                state.courses.pagination = pagination;
            }
        })
        builder.addCase(loadMoreCourses.rejected, (state, action) => {
            state.loading.loadMoreCourses = false;
            state.error = action.error;
        })
    },
})


export const { setcourse } = courseSlice.actions
export default courseSlice.reducer