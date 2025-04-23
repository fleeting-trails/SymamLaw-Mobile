import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosExternal, axiosFileUpload } from '../../../axios/axios'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormDataProps from 'form-data'


// Define the initial state using that type
export const initialState: Store.Auth = {
    user: null,
    registerResponse: null,
    error: null,
    loading: {
        login: false,
        register: false,
        verifyEmail: false,
        fetchUserProfile: false,
        logout: false,
        forgetPasswordGetOtp: false,
        forgetPasswordPostOtp: false,
        updateProfile: false
    },
    typedErrors: {
        otpFailed: false
    }
}
export const logout = createAsyncThunk(
    'logout',
    async (_, thunkAPI) => {
        try {
            const res = await axiosExternal.get('/logout');
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const fetchUserProfile = createAsyncThunk(
    'fetchUserProfile',
    async (_, thunkAPI) => {
        try {
            const res = await axiosExternal.get('/user/profile');
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)

export const login = createAsyncThunk(
    'login',
    async (body: Store.LoginAPIBody, thunkAPI) => {
        try {
            const res = await axiosExternal.post("/login", body)
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            AsyncStorage.setItem("token", res.data.data.token)
            const userProfile = await axiosExternal.get('/user/profile');
            if (!userProfile.data.success) {
                return thunkAPI.rejectWithValue({ error: userProfile.data.message })
            }
            return { data: userProfile.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const verifyEmail = createAsyncThunk(
    'verifyEmail',
    async (body: Store.VerifyEmailBody, thunkAPI) => {
        try {
            const res = await axiosExternal.post("/email/verify", body)
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const register = createAsyncThunk(
    'register',
    async (body: Store.RegisterAPIBody, thunkAPI) => {
        try {
            const formData = new FormData();
            (Object.keys(body) as Array<keyof typeof body>).forEach((key) => {
                formData.append(key, `${body[key]}`)
            })
            const res = await axiosExternal.post("/registration", body)
            console.log("Registration data", res.data)
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const forgetPasswordGetOtp = createAsyncThunk(
    'forgetPassword/get-otp',
    async (body: { email: string }, thunkAPI) => {
        try {
            const res = await axiosExternal.post("/forgot-password/get-otp", body)
            console.log("Get OTP res", JSON.stringify(res.data))
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }
        } catch (error) {
            console.log("What error", error)
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
type ForgetPasswordPostOtpPayload = {
    otp: string,
    email: string,
    password: string,
    password_confirmation: string
}
export const forgetPasswordPostOtp = createAsyncThunk(
    'forgetPasswordPostOtp',
    async (body: ForgetPasswordPostOtpPayload, thunkAPI) => {
        try {
            const res = await axiosExternal.post("/forgot-password/post-otp", body)
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }

        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
type UpdateProfileProps = {
    name: string,
    phone: string,
    address: string,
    institute: string,
    department: string
    is_graduated: boolean
}

export const updateProfile = createAsyncThunk(
    'updateProfile',
    async (body: UpdateProfileProps, thunkAPI) => {
        try {
            const res = await axiosExternal.post("/user/profile/update", body)
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)
export const updateProfileImage = createAsyncThunk(
    'updateProfile/image',
    async (body: FormDataProps, thunkAPI) => {
        try {
            const res = await axiosFileUpload.post("/user/profile/update", body)
            if (!res.data.success) {
                return thunkAPI.rejectWithValue({ error: res.data.message })
            }
            return { data: res.data }
        } catch (error) {
            return thunkAPI.rejectWithValue({ error })
        }
    },
)



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setauth: (state) => {
            // Login Goes Here
        },
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.loading.login = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading.login = false;
            if (action.payload.data) {
                state.user = action.payload.data.data
                AsyncStorage.setItem("token", action.payload.data.data.token)
            }
        })
        builder.addCase(login.rejected, (state) => {
            state.loading.login = false;
        })
        // Register
        builder.addCase(register.pending, (state) => {
            state.loading.register = true;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading.register = false;
            if (action.payload.data) {
                state.registerResponse = action.payload.data.data
            }
        })
        // builder.addCase(register.rejected, (state) => {
        //     state.loading.register = false;
        // })
        // Verify Email
        builder.addCase(verifyEmail.pending, (state) => {
            state.loading.verifyEmail = true;
        })
        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading.verifyEmail = false;
            if (action.payload) {
                state.user = action.payload.data.data
                AsyncStorage.setItem("token", action.payload.data.data.token)
            }
        })
        builder.addCase(verifyEmail.rejected, (state) => {
            state.loading.verifyEmail = false;
            state.typedErrors.otpFailed = true;
        })

        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading.fetchUserProfile = true;
        })
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading.fetchUserProfile = false;
            if (action.payload) {
                state.user = action.payload.data.data;
            }
        })
        builder.addCase(fetchUserProfile.rejected, (state) => {
            state.loading.fetchUserProfile = false;
        })

        builder.addCase(logout.pending, (state) => {
            state.loading.logout = true;
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading.logout = false;
            if (action.payload) {
                AsyncStorage.removeItem("token")
                state.user = null;
            }
        })
        builder.addCase(logout.rejected, (state) => {
            state.loading.logout = false;
        })
        // Get OTP for forget password
        builder.addCase(forgetPasswordGetOtp.pending, (state) => {
            state.loading.forgetPasswordGetOtp = true;
        })
        builder.addCase(forgetPasswordGetOtp.fulfilled, (state) => {
            state.loading.forgetPasswordGetOtp = false;
        })
        builder.addCase(forgetPasswordGetOtp.rejected, (state, action) => {
            state.loading.forgetPasswordGetOtp = false;
            state.error = action.error;
        })

        // Post OTP for forget password
        builder.addCase(forgetPasswordPostOtp.pending, (state) => {
            state.loading.forgetPasswordPostOtp = true;
        })
        builder.addCase(forgetPasswordPostOtp.fulfilled, (state) => {
            state.loading.forgetPasswordPostOtp = false;
        })
        builder.addCase(forgetPasswordPostOtp.rejected, (state, action) => {
            state.loading.forgetPasswordPostOtp = false;
            state.error = action.error;
        })

        // Update profile
        builder.addCase(updateProfile.pending, (state) => {
            state.loading.updateProfile = true;
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading.updateProfile = false;
            if (action.payload) {
                const profileData = action.payload.data.data;
                let existingUser = state.user;
                if (existingUser) {

                    Object.keys(profileData).forEach(key => {
                        // @ts-ignore
                        existingUser[key] = profileData[key];
                    })
                    state.user = profileData;

                } else {
                    state.user = action.payload.data.data;
                }
            }
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading.updateProfile = false;
            state.error = action.error;
        })
        // Update profile Image
        builder.addCase(updateProfileImage.pending, (state) => {
            state.loading.updateProfile = true;
        })
        builder.addCase(updateProfileImage.fulfilled, (state, action) => {
            state.loading.updateProfile = false;
            if (action.payload) {
                state.user = action.payload.data.data;
            }
        })
        builder.addCase(updateProfileImage.rejected, (state, action) => {
            state.loading.updateProfile = false;
            state.error = action.error;
        })
    },
})


export const { setauth } = authSlice.actions
export default authSlice.reducer
