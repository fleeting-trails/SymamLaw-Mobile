import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';
import { calculateDiscount } from '../../../utils/helpers';


const initialState: Store.Checkout = {
    items: [],
    amount: {
        total: 0,
        subtotal: 0,
        delivery: 60
    },
    loading: {
        initializeCheckout: false,
        addCheckoutItem: false,
        removeCheckoutItem: false,
        removeCheckoutItemFull: false
    },
    error: null
};

export const initializeCheckout = createAsyncThunk(
    'initializeCheckout',
    async (_, thunkAPI) => {
        try {
            const localStorageData = await AsyncStorage.getItem("checkout");
            let checkoutData = null;
            if (localStorageData) {
                checkoutData = JSON.parse(localStorageData) as Store.Checkout;
            }

            return { data: checkoutData };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const addCheckoutItem = createAsyncThunk(
    'addCheckoutItem',
    async (item: Store.CheckoutItem, thunkAPI) => {
        try {
            const rootState = thunkAPI.getState() as RootState;
            let state = JSON.parse(JSON.stringify(rootState.checkout)) as Store.Checkout;
            const existingItem = state.items.find(x => x.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(item);
            }
            // Calculate total
            var amount = 0;
            amount = calculateDiscount(item.discountType, item.originalPrice, item.discount) * item.quantity;
            state.amount.subtotal += amount;

            await AsyncStorage.setItem("checkout", JSON.stringify(state));

            return { data: state };

        } catch (error) {
            console.log("Add item Error", error);
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const removeCheckoutItem = createAsyncThunk(
    'removeCheckoutItem',
    async (id: number, thunkAPI) => {
        try {
            const rootState = thunkAPI.getState() as RootState;
            let state = JSON.parse(JSON.stringify(rootState.checkout)) as Store.Checkout;

            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                const newQuantity = (existingItem.quantity - 1)
                state.items = state.items.map(item => {
                    if (item.id === existingItem.id) {
                        return {
                            ...item,
                            quantity: newQuantity
                        }
                    }
                    return item;
                })

                if (newQuantity <= 0) {
                    state.items = state.items.filter(item => item.id !== existingItem.id);
                }
                // Calculate total

                var amount = 0;
                var previousAmount = 0;
                amount = calculateDiscount(existingItem.discountType, existingItem.originalPrice, existingItem.discount) * newQuantity;
                previousAmount = calculateDiscount(existingItem.discountType, existingItem.originalPrice, existingItem.discount) * existingItem.quantity;

                state.amount.subtotal -= (previousAmount - amount);
            }

            await AsyncStorage.setItem("checkout", JSON.stringify(state));

            return { data: state };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const removeCheckoutItemFull = createAsyncThunk(
    'removeCheckoutItemFull',
    async (id: number, thunkAPI) => {
        try {
            const rootState = thunkAPI.getState() as RootState;
            let state = JSON.parse(JSON.stringify(rootState.checkout)) as Store.Checkout;

            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.items = state.items.filter(item => item.id !== existingItem.id);
                // Calculate total
                var amount = 0;
                amount = calculateDiscount(existingItem.discountType, existingItem.originalPrice, existingItem.discount) * existingItem.quantity;
                state.amount.subtotal -= amount;
            }

            await AsyncStorage.setItem("checkout", JSON.stringify(state));

            return { data: state };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)




const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // Initialize Checkout
        builder.addCase(initializeCheckout.pending, (state) => {
            state.loading.initializeCheckout = true;
        })
        builder.addCase(initializeCheckout.fulfilled, (state, action) => {
            state.loading.initializeCheckout = false;
            if (action.payload.data) {
                state.amount = action.payload.data.amount;
                state.items = action.payload.data.items;
            }
        })
        builder.addCase(initializeCheckout.rejected, (state) => {
            state.loading.initializeCheckout = false;
        })

        // Add item to checkout
        builder.addCase(addCheckoutItem.pending, (state) => {
            state.loading.addCheckoutItem = true;
        })
        builder.addCase(addCheckoutItem.fulfilled, (state, action) => {
            state.loading.addCheckoutItem = false;
            if (action.payload) {
                state.amount = action.payload.data.amount;
                state.items = action.payload.data.items;
            }
        })
        builder.addCase(addCheckoutItem.rejected, (state) => {
            state.loading.addCheckoutItem = false;
        })

        // Remove item from checkout
        builder.addCase(removeCheckoutItem.pending, (state) => {
            state.loading.removeCheckoutItem = true;
        })
        builder.addCase(removeCheckoutItem.fulfilled, (state, action) => {
            state.loading.removeCheckoutItem = false;
            if (action.payload) {
                state.amount = action.payload.data.amount;
                state.items = action.payload.data.items;
            }

        })
        builder.addCase(removeCheckoutItem.rejected, (state, action) => {
            state.loading.removeCheckoutItem = false;
            state.error = action.error;
        })

        // Remove checkout item full
        builder.addCase(removeCheckoutItemFull.pending, (state) => {
            state.loading.removeCheckoutItemFull = true;
        })
        builder.addCase(removeCheckoutItemFull.fulfilled, (state, action) => {
            state.loading.removeCheckoutItemFull = false;
            if (action.payload) {
                state.amount = action.payload.data.amount;
                state.items = action.payload.data.items;
            }
        })
        builder.addCase(removeCheckoutItemFull.rejected, (state, action) => {
            state.loading.removeCheckoutItemFull = false;
            state.error = action.error;
        })
    }
});

// export const {  } = checkoutSlice.actions;

export default checkoutSlice.reducer;