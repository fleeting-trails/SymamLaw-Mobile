import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal } from '../../../axios/axios'
import { tailorPaginationResponse } from '../../../utils/apiHelper'
import { RootState } from '../../store'
import { AxiosResponse } from 'axios'


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
    myCourses: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 1,
            pageSize: 30
        },
    },
    recommendedCourses: [],
    currentCourse: null,
    currentCourseComments: null,
    loading: {
        listCourses: false,
        loadMoreCourses: false,
        getCourseSingle: false,
        refreshCourseSingle: false,
        markLectureAsViewed: false,
        getComments: false,
        commentOnLecture: false,
        replyOnLectureComment: false,
        getSubscriptionRedirectLink: false,
        listMyCourses: false,
        listMoreMyCourses: false,
        listRecommendedCourses: false
    },
    error: null
}

type ListCoursesBlog = {
    [key: string]: string | number
} | undefined

export const listCourses = createAsyncThunk(
    'listCourses',
    async (filters: ListCoursesBlog, thunkAPI) => {
        try {
            var _filters = filters;
            if (!filters) {
                _filters = {
                    limit: 12,
                    page: 1
                }
            }
            const res = await axiosExternal.get(`/course/list`, { params: _filters })
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
            const { current, totalPages } = state.course.courses.pagination;
            if (current >= totalPages) return { nodata: true }
            const res = await axiosExternal.get(`/course/list`, {
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

export const listRecommendedCourses = createAsyncThunk(
    'listRecommendedCourses',
    async (params: { [key: string]: any } | undefined = {
        page: 1,
        limit: 3
    }, thunkAPI) => {
        try {
            const res: AxiosResponse<API.ResponseBodyPaginated<Array<Store.CourseListData>>> = await axiosExternal.get(`/course/list`, { params })
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
export const refreshCourseSingle = createAsyncThunk(
    'refreshCourseSingle',
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

type ListMyCoursesProps = {
    [key: string]: string | number
} | undefined

export const listMyCourses = createAsyncThunk(
    'listMyCourses',
    async (filters: ListMyCoursesProps, thunkAPI) => {
        try {
            var _filters = filters;
            if (!filters) {
                _filters = {
                    limit: 12,
                    page: 1
                }
            }
            const res = await axiosExternal.get(`/user/course/subscribed/list`, { params: _filters })
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const listMoreMyCourses = createAsyncThunk(
    'listMoreMyCourses',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const { current, totalPages } = state.course.myCourses.pagination;
            if (current >= totalPages) return { nodata: true }
            const res = await axiosExternal.get(`/user/course/subscribed/list`, {
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

export const getComments = createAsyncThunk(
    'getComments',
    async (lecture_id: number, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/admin/comments/${lecture_id}`);
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
            const res = await axiosExternal.post(`/user/course/lecture/comment-reply?id=${body.lecture_comment_id}`, body);
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
            const res: AxiosResponse<API.ResponseBody<string>> = await axiosExternal.post('/user/purchase/subcription', { course_id: course_id, redirect_url });
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
                if (action.payload.nodata) return;  // No more data
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.courses.data = [...state.courses.data, ...data];
                state.courses.pagination = pagination;
            }
        })
        builder.addCase(loadMoreCourses.rejected, (state, action) => {
            state.loading.loadMoreCourses = false;
            state.error = action.error;
        })


        // List recommended courses
        builder.addCase(listRecommendedCourses.pending, (state) => {
            state.loading.listRecommendedCourses = true;
        })
        builder.addCase(listRecommendedCourses.fulfilled, (state, action) => {
            state.loading.listRecommendedCourses = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.recommendedCourses = data;
            }
        })
        builder.addCase(listRecommendedCourses.rejected, (state, action) => {
            state.loading.listRecommendedCourses = false;
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
        // Refresh single course
        builder.addCase(refreshCourseSingle.pending, (state) => {
            state.loading.refreshCourseSingle = true;
        })
        builder.addCase(refreshCourseSingle.fulfilled, (state, action) => {
            state.loading.refreshCourseSingle = false;
            if (action.payload) {
                state.currentCourse = action.payload.data.data;
            }
        })
        builder.addCase(refreshCourseSingle.rejected, (state, action) => {
            state.loading.refreshCourseSingle = false;
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

        // Get comments
        builder.addCase(getComments.pending, (state) => {
            state.loading.getComments = true;
        })
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.loading.getComments = false;
            if (action.payload) {
                state.currentCourseComments = action.payload.data;
            }
        })
        builder.addCase(getComments.rejected, (state) => {
            state.loading.getComments = false;
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


        // List my courses
        builder.addCase(listMyCourses.pending, (state) => {
            state.loading.listMyCourses = true;
        })
        builder.addCase(listMyCourses.fulfilled, (state, action) => {
            state.loading.listMyCourses = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.myCourses.data = data;
                state.myCourses.pagination = pagination;
            }
        })
        builder.addCase(listMyCourses.rejected, (state, action) => {
            state.loading.listMyCourses = false;
            state.error = action.error;
        })


        // List More my courses
        builder.addCase(listMoreMyCourses.pending, (state) => {
            state.loading.listMoreMyCourses = true;
        })
        builder.addCase(listMoreMyCourses.fulfilled, (state, action) => {
            state.loading.listMoreMyCourses = false;
            if (action.payload) {
                if (action.payload.nodata) return;  // No more data
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.myCourses.data = [...state.myCourses.data, ...data];
                state.myCourses.pagination = pagination;
            }
        })
        builder.addCase(listMoreMyCourses.rejected, (state, action) => {
            state.loading.listMoreMyCourses = false;
        })

    },
})


export const { setcourse } = courseSlice.actions
export default courseSlice.reducer
