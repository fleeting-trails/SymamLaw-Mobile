namespace Store {
    type Auth = {
        user: (null | UserData),
        registerResponse: (null | RegisterAPIResponse),
        error: any,
        loading: {
            login: boolean,
            register: boolean,
            verifyEmail: boolean,
            fetchUserProfile: boolean,
            logout: boolean,
            forgetPasswordGetOtp: boolean,
            forgetPasswordPostOtp: boolean,
            updateProfile: boolean
        },
        typedErrors: {
            otpFailed: boolean
        }
    }
    type RegisterAPIBody = {
        name: string,
        email: string,
        phone: string,
        password: string,
        password_confirmation: string
    }
    type LoginAPIBody = {
        user_input: string,
        password: string
    }
    type RegisterAPIResponse = {
        name: string
        email: string
        phone: string
        address: (null | string)
        role: string
        unique_id: string
        image: string
        otp: number
        updated_at: string
        created_at: string
        id: number
    }
    type VerifyEmailBody = {
        email: string,
        otp: string
    }
    type UserData = {
        id: number
        name: string
        email: string
        role: string
        phone: string
        unique_id: string
        image: string
        status: string
        address: any
        otp: any
        token: string
        fcm_token: any
        created_at: string
        updated_at: string,
        student_details: {
            id: number
            user_id: string
            institute: string
            department: string
            is_graduated: string
        }
    }
}