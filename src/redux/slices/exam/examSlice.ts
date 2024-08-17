import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal, axiosFileUpload } from '../../../axios/axios'
import { tailorPaginationResponse } from '../../../utils/apiHelper'
import FormDataProps from 'form-data'


// Define the initial state using that type
const initialState: Store.Exam = {
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
    attemptedExams: [],
    currentExam: null,
    currentExamResult: null,
    loading: {
        fetchExamCategories: false,
        fetchExamsByCategory: false,
        fetchExamDetails: false,
        submitExam: false,
        listAttemptedExams: false,
        getExamResult: false
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
export const fetchExamDetails = createAsyncThunk(
    'fetchExamDetails',
    async (slug: string, thunkAPI) => {
        try {
            const res = await axiosExternal(`/user/exam/single/${slug}`)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const submitExam = createAsyncThunk(
    'submitExam',
    async (body: any, thunkAPI) => {
        try {
            const res = await axiosExternal.post(`/user/exam/question/submit`, body)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const submitAttachmentUpload = createAsyncThunk(
    'submitAttachmentUpload',
    async (body: FormDataProps, thunkAPI) => {
        try {
            const res = await axiosFileUpload.post(`/user/exam/question/upload-attachment`, body)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return res.data.data as Store.ExamAttachUploadResponse[]
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const listAttemptedExams = createAsyncThunk(
    'listParticipatedExams',
    async (_, thunkAPI) => {
        try {
            const res = await axiosExternal.get('/user/result/attempted-list')
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)
export const getExamResult = createAsyncThunk(
    'getExamResult',
    async (id: number, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/user/result/${id}`)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data.data }
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

        // Fetch exam details
        builder.addCase(fetchExamDetails.pending, (state) => {
            state.loading.fetchExamDetails = true;
        })
        builder.addCase(fetchExamDetails.fulfilled, (state, action) => {
            state.loading.fetchExamDetails = false;
            if (action.payload) {
                state.currentExam = action.payload.data.data;
            }
        })
        builder.addCase(fetchExamDetails.rejected, (state, action) => {
            state.loading.fetchExamDetails = false;
            state.error = action.error;
        })

        // Submit exam
        builder.addCase(submitExam.pending, (state) => {
            state.loading.submitExam = true;
        })
        builder.addCase(submitExam.fulfilled, (state) => {
            state.loading.submitExam = false;
        })
        builder.addCase(submitExam.rejected, (state, action) => {
            state.loading.submitExam = false;
            state.error = action.error;
        })

        // List attempted exams
        builder.addCase(listAttemptedExams.pending, (state) => {
            state.loading.listAttemptedExams = true;
        })
        builder.addCase(listAttemptedExams.fulfilled, (state, action) => {
            state.loading.listAttemptedExams = false;
            if (action.payload) {
                state.attemptedExams = action.payload.data;
            }
        })
        builder.addCase(listAttemptedExams.rejected, (state, action) => {
            state.loading.listAttemptedExams = false;
            state.error = action.error;
        })

        // Get Current Exam Result
        builder.addCase(getExamResult.pending, (state) => {
            state.loading.getExamResult = true;
        })
        builder.addCase(getExamResult.fulfilled, (state, action) => {
            state.loading.getExamResult = false;
            if (action.payload) {
                state.currentExamResult = action.payload.data;
            }
        })
        builder.addCase(getExamResult.rejected, (state, action) => {
            state.loading.getExamResult = false;
            state.error = action.error;
        })
    },

})


export const { setexamSlice } = examSliceSlice.actions
export default examSliceSlice.reducer