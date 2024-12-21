import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosExternal } from '../../../axios/axios';
import { tailorPaginationResponse } from '../../../utils/apiHelper';
import { RootState } from '../../store';


const initialState: Store.Blog = {
    data: {
        posts: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 0,
            pageSize: 0,
        }
    },
    currentBlog: null,  // Single blog post
    loading: {
        fetchBlogs: false,
        fetchMoreBlogs: false,
        fetchBlogSingle: false
    },
    error: null,
};

type FetchBlogsProps = {
    [key: string]: string | number
} | null
export const fetchBlogs = createAsyncThunk(
    'fetchBlogs',
    async (filters: FetchBlogsProps, thunkAPI) => {
        try {
            var _filters = filters;
            if (!filters) {
                _filters = {
                    limit: 12,
                    page: 1
                }
            }
            const res = await axiosExternal.get(`/blog/list`, { params: _filters })
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


export const fetchMoreBlogs = createAsyncThunk(
    'fetchMoreBlogs',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const { current, totalPages } = state.blog.data.pagination;
            if (current >= totalPages) return { nodata: true }
            const res = await axiosExternal.get(`/blog/list`, {
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

export const fetchBlogSingle = createAsyncThunk(
    'fetchBlogSingle',
    async (id: number, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/blog/view/${id}`)
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)



const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // Fetch Blogs
        builder.addCase(fetchBlogs.pending, (state) => {
            state.loading.fetchBlogs = true;
        })
        builder.addCase(fetchBlogs.fulfilled, (state, action) => {
            state.loading.fetchBlogs = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.data.posts = data;
                state.data.pagination = pagination;

            }
        })
        builder.addCase(fetchBlogs.rejected, (state, action) => {
            state.loading.fetchBlogs = false;
            state.error = action.error;
        })

        // Fetch more Blogs
        builder.addCase(fetchMoreBlogs.pending, (state) => {
            state.loading.fetchMoreBlogs = true;
        })
        builder.addCase(fetchMoreBlogs.fulfilled, (state, action) => {
            state.loading.fetchMoreBlogs = false;
            if (action.payload) {
                if (action.payload.nodata) return;  // No more data
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.data.posts = [...state.data.posts, ...data];
                state.data.pagination = pagination;
            }
        })
        builder.addCase(fetchMoreBlogs.rejected, (state, action) => {
            state.loading.fetchMoreBlogs = false;
            state.error = action.error;
        })

        // Fetch blog single
        builder.addCase(fetchBlogSingle.pending, (state) => {
            state.loading.fetchBlogSingle = true;
        })
        builder.addCase(fetchBlogSingle.fulfilled, (state, action) => {
            state.loading.fetchBlogSingle = false;
            if (action.payload) {
                state.currentBlog = action.payload.data.data;
            }
        })
        builder.addCase(fetchBlogSingle.rejected, (state, action) => {
            state.loading.fetchBlogSingle = false;
            state.error = action.error;
        })
    },
});

// export const {
//     fetchPostsStart,
//     fetchPostsSuccess,
//     fetchPostsFailure,
//     addPost,
//     deletePost,
// } = blogSlice.actions;

export default blogSlice.reducer;