import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal } from '../../../axios/axios'
import { RootState } from '../../store'
import { tailorPaginationResponse } from '../../../utils/apiHelper'


// Define the initial state using that type
const initialState: Store.Package = {
    packages: [],
    subscribedPackages: [],
    unSubscribedPackages: [],
    error: null,
    loading: {
        listPackages: false,
        listUnsubscribedPackages: false,
        listSubscribedPackages: false
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
export const listUnsubscribedPackages = createAsyncThunk(
    'listUnsubscribedPackages',
    async (_, thunkAPI) => {
        try {
            const { auth } = thunkAPI.getState() as RootState;
            const res = await axiosExternal.get('/package/list');
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            var packageList : Array<Store.PackageData> = tailorPaginationResponse(res.data).data;
            if (auth.user) {
                packageList = packageList.filter((pkg : Store.PackageData) => !auth.user?.current_subscriptions.find(sub => `${sub.package_id}` === `${pkg.id}`))
            }
            return packageList

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const listSubscribedPackages = createAsyncThunk(
    'listSubscribedPackages',
    async (_, thunkAPI) => {
        try {
            const { auth } = thunkAPI.getState() as RootState;
            const res = await axiosExternal.get('/package/list');
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            var packageList : Array<Store.PackageData> = tailorPaginationResponse(res.data).data;
            if (auth.user) {
                packageList = packageList.filter((pkg : Store.PackageData) => auth.user?.current_subscriptions.find(sub => `${sub.package_id}` === `${pkg.id}`))
            }
            return packageList

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const getPackageSingle = createAsyncThunk(
    'getPackageSingle',
    async (id: number, thunkAPI) => {
        try {
            const res = await axiosExternal.get(`/admin/package/view/${id}`);
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


export const getSubscriptionRedirectLink = createAsyncThunk(
    'getSubscriptionRedirectLink',
    async ({ id, redirect_url }: { id: number, redirect_url: string }, thunkAPI) => {
        try {
            const res = await axiosExternal.post('/user/purchase/subcription', { package_id: id, redirect_url });
            if (!res.data.success) thunkAPI.rejectWithValue({ error: res.data.message })
            return res.data.data

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)



export const packagesSliceSlice = createSlice({
    name: 'packagesSlice',
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

        // List unsubscribed packages
        builder.addCase(listUnsubscribedPackages.pending, (state) => {
            state.loading.listUnsubscribedPackages = true;
        })
        builder.addCase(listUnsubscribedPackages.fulfilled, (state, action) => {
            state.loading.listUnsubscribedPackages = false;
            if (action.payload) [
                state.unSubscribedPackages = action.payload
            ]
            
        })
        builder.addCase(listUnsubscribedPackages.rejected, (state, action) => {
            state.loading.listUnsubscribedPackages = false;
            state.error = action.error;
        })

        // List subscribed packages
        builder.addCase(listSubscribedPackages.pending, (state) => {
            state.loading.listSubscribedPackages = true;
        })
        builder.addCase(listSubscribedPackages.fulfilled, (state, action) => {
            state.loading.listSubscribedPackages = false;
            if (action.payload) {
                state.subscribedPackages = action.payload;
            }
        })
        builder.addCase(listSubscribedPackages.rejected, (state, action) => {
            state.loading.listSubscribedPackages = false;
            state.error = action.error;
        })
    },
})


export const { setpackagesSlice } = packagesSliceSlice.actions
export default packagesSliceSlice.reducer