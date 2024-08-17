import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal } from '../../../axios/axios'


// Define the initial state using that type
const initialState : Store.Package = {
    packages: [],
    error: null,
    loading: {
        listPackages: false
    }
}

export const listPackages = createAsyncThunk(
    'listPackages',
    async (_, thunkAPI) => {
        try {
            const res = await axiosExternal.get('/package/list');
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


export const packagesSliceSlice = createSlice({
    name:'packagesSlice',
    initialState,
    reducers: {
        setpackagesSlice: (state) => {
            // Logic Goes Here
        },
    },
    extraReducers(builder) {
        builder.addCase(listPackages.pending, (state) => {
            state.loading.listPackages = true;
        })
        builder.addCase(listPackages.fulfilled, (state, action) => {
            state.loading.listPackages = false;
            if (action.payload) {
                state.packages = action.payload.data.data;
            }
        })
        builder.addCase(listPackages.rejected, (state, action) => {
            state.loading.listPackages = false;
            state.error = action.error;
        })
    },
})


export const { setpackagesSlice } = packagesSliceSlice.actions
export default packagesSliceSlice.reducer