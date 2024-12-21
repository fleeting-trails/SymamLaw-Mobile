import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosExternal } from '../../../axios/axios';
import { err } from 'react-native-svg';
import { tailorPaginationResponse } from '../../../utils/apiHelper';
import { RootState } from '../../store';


const initialState: Store.Library = {
    list: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 0,
            pageSize: 0
        }
    },
    loading: {
        fetchBooklist: false,
        fetchMoreBooks: false,
        searchBooks: false
    },
    error: null,
};

type FetchBookListProps = {
    [key: string]: string | number
} | undefined
export const fetchBooklist = createAsyncThunk(
    'fetchBooklist',
    async (filters: FetchBookListProps, thunkAPI) => {
        try {
            const _filters = filters || { limit: 12, page: 1 };
            const res = await axiosExternal.get(`/library/list`, { params: _filters });
            if (!res.data.success) return thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const searchBooks = createAsyncThunk(
    'searchBooks',
    async (query: string, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/search`, {
                params: {
                    query,
                    type: 'book'
                }
            })
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


export const fetchMoreBooks = createAsyncThunk(
    'fetchMoreBooks',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootState;
            const { current, totalPages } = state.library.list.pagination;
            if (current >= totalPages) return { nodata: true }
            const res = await axiosExternal.get(`/library/list`, {
                params: {
                    limit: 12,
                    page: current + 1
                }
            })
            if (!res.data.success) return thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchBooklist.pending, (state) => {
            state.loading.fetchBooklist = true;
        })
        builder.addCase(fetchBooklist.fulfilled, (state, action) => {
            state.loading.fetchBooklist = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.list.data = data;
                state.list.pagination = pagination;
            }
        })
        builder.addCase(fetchBooklist.rejected, (state, action) => {
            state.loading.fetchBooklist = false;
            state.error = action.error;
        })

        builder.addCase(fetchMoreBooks.pending, (state) => {
            state.loading.fetchMoreBooks = true;
        })
        builder.addCase(fetchMoreBooks.fulfilled, (state) => {
            state.loading.fetchMoreBooks = false;
        })
        builder.addCase(fetchMoreBooks.rejected, (state) => {
            state.loading.fetchMoreBooks = false;
        })

        builder.addCase(searchBooks.pending, (state) => {
            state.loading.searchBooks = true;
        })
        builder.addCase(searchBooks.fulfilled, (state, action) => {
            state.loading.searchBooks = false;
            state.loading.fetchBooklist = false;
            if (action.payload) {
                // const { data, pagination } = tailorPaginationResponse(action.payload.data.books);
                state.list.data = action.payload.data.data.books;
                state.list.pagination = {
                    current: 1,
                    total: action.payload.data.data.books?.length ?? 0,
                    totalPages: 1,
                    pageSize: action.payload.data.data.books?.length ?? 0
                }
            }
        })
        builder.addCase(searchBooks.rejected, (state, action) => {
            state.loading.searchBooks = false;
            state.error = action.error;
        })
    },
});


// export const {
//     fetchBooksStart,
//     fetchBooksSuccess,
//     fetchBooksFailure,
//     addBook,
//     removeBook,
// } = librarySlice.actions;

export default librarySlice.reducer;