import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: Store.Checkout = {
    items: [],
    amount: {
        total: 0,
        subtotal: 0,
        delivery: 60
    },
    loading: false,
    error: null
};

export const initializeCheckout = createAsyncThunk(
    'initializeCheckout',
    async (_, thunkAPI) => {
        try {
            

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addCheckoutItem: (state, action: PayloadAction<Store.CheckoutItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            // Calculate total
            var amount = 0;
            if (action.payload.discountType === "percentage") {
                amount = (action.payload.originalPrice * (action.payload.discount / 100)) * action.payload.quantity;
            } else {
                amount = (action.payload.originalPrice - action.payload.discount) * action.payload.quantity;
            }          
            state.amount.subtotal += amount;
        },
        removeCheckoutItem: (state, action: PayloadAction<number>) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity -= existingItem.quantity;
                if (existingItem.quantity <= 0) {
                    state.items = state.items.filter(item => item.id !== existingItem.id);
                }
                // Calculate total
                var amount = 0;
                if (existingItem.discountType === "percentage") {
                    amount = (existingItem.originalPrice * (existingItem.discount / 100)) * existingItem.quantity;
                } else {
                    amount = (existingItem.originalPrice - existingItem.discount) * existingItem.quantity;
                }          
                state.amount.subtotal -= amount;
            }  
        }
    },
});

export const { addCheckoutItem, removeCheckoutItem } = checkoutSlice.actions;

export default checkoutSlice.reducer;