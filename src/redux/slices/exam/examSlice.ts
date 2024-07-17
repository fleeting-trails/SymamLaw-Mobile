import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal } from '../../../axios/axios'
import { tailorPaginationResponse } from '../../../utils/apiHelper'


// Define the initial state using that type
const initialState : Store.Exam = {
    examsByCategory: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 1,
            pageSize: 100
        }
    },
    examCategories: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 1,
            pageSize: 100
        }
    },
    loading: {
        fetchExamCategories: false,
        fetchExamsByCategory: false
    },
    error: null
}

export const fetchExamsByCategory = createAsyncThunk(
    'fetchExamsByCategory',
    async (slug: string, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/exam-cateogry/single/${slug}`)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const fetchExamCategories = createAsyncThunk(
    'fetchExamCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axiosExternal('/exam-cateogry/list?page=1&limit=100')
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


export const examSliceSlice = createSlice({
    name: 'examSlice',
    initialState,
    reducers: {
        setexamSlice: (state) => {
            // Logic Goes Here
        },
    },
    extraReducers(builder) {
        // Fetch exam categories
        builder.addCase(fetchExamCategories.pending, (state) => {
            state.loading.fetchExamCategories = true;
        })
        builder.addCase(fetchExamCategories.fulfilled, (state, action) => {
            state.loading.fetchExamCategories = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data)
                state.examCategories.data = data;
                state.examCategories.pagination = pagination;
            }
        })
        builder.addCase(fetchExamCategories.rejected, (state, action) => {
            state.loading.fetchExamCategories = false;
            state.error = action.error;
        })

        // Fetch exam by categories
        builder.addCase(fetchExamsByCategory.pending, (state) => {
            state.loading.fetchExamsByCategory = true;
        })
        builder.addCase(fetchExamsByCategory.fulfilled, (state, action) => {
            state.loading.fetchExamsByCategory = false;
            if (action.payload) {
                state.examsByCategory.data = action.payload.data.data.exam;
                // state.examsByCategory.pagination = pagination;
            }
        })
        builder.addCase(fetchExamsByCategory.rejected, (state, action) => {
            state.loading.fetchExamsByCategory = false;
            state.error = action.error;
        })
    },
})


export const { setexamSlice } = examSliceSlice.actions
export default examSliceSlice.reducer