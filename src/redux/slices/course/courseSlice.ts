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
    currentCourse: null,
    loading: {
        listCourses: false,
        loadMoreCourses: false,
        getCourseSingle: false,
        markLectureAsViewed: false,
        commentOnLecture: false,
        replyOnLectureComment: false,
        getSubscriptionRedirectLink: false
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
            const res = await axiosExternal.get(`/course/list`, { params })
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
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

export const getCourseSingle = createAsyncThunk(
    'getCourseSingle',
    async (slug: string, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/user/course/${slug}`)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

type MarkLectureAsViewedProps = {
    lecture_id: number,
    course_id: number
}
export const markLectureAsViewed = createAsyncThunk(
    'setLectureAsViewed',
    async (body: MarkLectureAsViewedProps, thunkAPI) => {
        try {
            const res = await axiosExternal.post('/user/course/lecture/viewed', body);
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

type CommentOnLectureProps = {
    course_id: number,
    lecture_id: number,
    comment: string
}
export const commentOnLecture = createAsyncThunk(
    'commentOnLecture',
    async (body: CommentOnLectureProps, thunkAPI) => {
        try {
            const res = await axiosExternal.post('/user/course/lecture/comment', body);
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

type ReplyOnLectureComment = {
    lecture_comment_id: number,
    comment: string
}
export const replyOnLectureComment = createAsyncThunk(
    'replyOnLectureComment',
    async (body: ReplyOnLectureComment, thunkAPI) => {
        try {
            const res = await axiosExternal.post(`/user/course/lecture/comment-reply/${body.lecture_comment_id}?id=${body.lecture_comment_id}`, body);
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const getSubscriptionRedirectLink = createAsyncThunk(
    'getSubscriptionRedirectLink',
    async ({ course_id, redirect_url }: { course_id: number, redirect_url: string }, thunkAPI) => {
        try {
            const res = await axiosExternal.post('/user/purchase/subcription', { course_id: course_id, redirect_url });
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return res.data.data

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

        // Load single course
        builder.addCase(getCourseSingle.pending, (state) => {
            state.loading.getCourseSingle = true;
        })
        builder.addCase(getCourseSingle.fulfilled, (state, action) => {
            state.loading.getCourseSingle = false;
            if (action.payload) {
                state.currentCourse = action.payload.data.data;
            }
        })
        builder.addCase(getCourseSingle.rejected, (state, action) => {
            state.loading.getCourseSingle = false;
            state.error = action.error;
        })

        // Mark lecture as viewed
        builder.addCase(markLectureAsViewed.pending, (state) => {
            state.loading.markLectureAsViewed = true;
        })
        builder.addCase(markLectureAsViewed.fulfilled, (state) => {
            state.loading.markLectureAsViewed = false;
        })
        builder.addCase(markLectureAsViewed.rejected, (state, action) => {
            state.loading.markLectureAsViewed = false;
            state.error = action.error;
        })

        // Comment on lecture
        builder.addCase(commentOnLecture.pending, (state) => {
            state.loading.commentOnLecture = true;
        })
        builder.addCase(commentOnLecture.fulfilled, (state) => {
            state.loading.commentOnLecture = false;
        })
        builder.addCase(commentOnLecture.rejected, (state, action) => {
            state.loading.commentOnLecture = false;
            state.error = action.error;
        })

        builder.addCase(replyOnLectureComment.pending, (state) => {
            state.loading.replyOnLectureComment = true;
        })
        builder.addCase(replyOnLectureComment.fulfilled, (state) => {
            state.loading.replyOnLectureComment = false;
        })
        builder.addCase(replyOnLectureComment.rejected, (state, action) => {
            state.loading.replyOnLectureComment = false;
            state.error = action.error;
        })

        // Get Subscription Redirect link
        builder.addCase(getSubscriptionRedirectLink.pending, (state) => {
            state.loading.getSubscriptionRedirectLink = true;
        })
        builder.addCase(getSubscriptionRedirectLink.fulfilled, (state) => {
            state.loading.getSubscriptionRedirectLink = false;
        })
        builder.addCase(getSubscriptionRedirectLink.rejected, (state, action) => {
            state.loading.getSubscriptionRedirectLink = false;
            state.error = action.error;
        })
    },
})


export const { setcourse } = courseSlice.actions
export default courseSlice.reducer