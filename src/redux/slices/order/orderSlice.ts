import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosExternal } from '../../../axios/axios';
import { AxiosResponse } from 'axios';
import { tailorPaginationResponse } from '../../../utils/apiHelper';


const initialState: Store.Order = {

    list: {
        data: [],
        pagination: {
            current: 1,
            total: 0,
            totalPages: 0,
            pageSize: 12
        }
    },
    loading: {
        listOrders: false,
        createOrder: false,
    },
    error: null

};

type ListOrdersProps = {
    [key: string]: string | number
} | undefined
export const listOrders = createAsyncThunk(
    'listOrders',
    async (filters: ListOrdersProps, thunkAPI) => {
        try {
            var _filters = filters;
            if (!filters) {
                _filters = {
                    limit: 12,
                    page: 1
                }
            }
            const res : AxiosResponse<API.ResponseBodyPaginated<Store.OrderListData[]>> = await axiosExternal.get("/user/library/orders", { params: _filters });
            if (!res.data.success) return thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    }
)

export const createOrder = createAsyncThunk(
    'createOrder',
    async (body: Store.CreateOrderAPIPayload, thunkAPI) => {
        try {
            const res : AxiosResponse<Store.CreateOrderAPIResponse> = await axiosExternal.post("/user/library/purchase", body);
            if (!res.data.success) return thunkAPI.rejectWithValue({ error: res.data.message })
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)




const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: { },
    extraReducers (builder) {
        // List orders
        builder.addCase(listOrders.pending, (state) => {
            state.loading.listOrders = true;
        })
        builder.addCase(listOrders.fulfilled, (state, action) => {
            state.loading.listOrders = false;
            if (action.payload) {
                const { data, pagination } = tailorPaginationResponse(action.payload.data);
                state.list.data = data;
                state.list.pagination = data;
            }
        })
        builder.addCase(listOrders.rejected, (state) => {
            state.loading.listOrders = false;
        })

        // Create Order
        builder.addCase(createOrder.pending, (state) => {
            state.loading.createOrder = true;
        })
        builder.addCase(createOrder.fulfilled, (state) => {
            state.loading.createOrder = false;
        })
        builder.addCase(createOrder.rejected, (state) => {
            state.loading.createOrder = false;
        })
    }
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;