import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const RegisterPost = createAsyncThunk("Register / user", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/register`, data)
        console.log("REGISTER_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})

export const LoginPost = createAsyncThunk("Login / user", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/login`, data)
        console.log("LOGIN_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})

const authSlice = createSlice({
    name : "auth",
    initialState : {
        data: [],
        loading: false,
        error: null,
        logoutToggle : false,
        redirectToLogin : null,
        redirectToHome : null,
    },
    reducers : {
        Logout : (state,action)=>{
            // localStorage.removeItem("name")
            // localStorage.removeItem("token")
            localStorage.clear()
            state.logoutToggle = false
        },
        regLogout : (state)=>{
            localStorage.removeItem("name")
        },
        check_token : (state,action)=>{
            const name = localStorage.getItem("name")
            if (name!== null && name!== undefined && name!== ""){
                state.logoutToggle = true
            }
        },
        NavigateLogin : (state,action)=>{
            state.redirectToLogin = action.payload
        },
        NavigateHome : (state,action)=>{
            state.redirectToHome = action.payload
        },
    },

    extraReducers : (builder)=>{
        builder.addCase(RegisterPost.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(RegisterPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.success === true){
                toast.success(action?.payload?.message)
                localStorage.setItem("name", action?.payload?.data?.name)
            }
        })
        builder.addCase(RegisterPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        builder.addCase(LoginPost.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(LoginPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200){
                toast.success(action?.payload?.message)
                localStorage.setItem("name", action?.payload?.data?.name)
                localStorage.setItem("id", action?.payload?.data?._id)
                localStorage.setItem("email", action?.payload?.data?.email)
                localStorage.setItem("phone", action?.payload?.data?.phone)
                localStorage.setItem("image", action?.payload?.data?.image)
                localStorage.setItem("token", action?.payload?.token)
                state.logoutToggle = true
            }
        })
        builder.addCase(LoginPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})

export const {Logout, regLogout, check_token, NavigateLogin, NavigateHome} = authSlice.actions

export default authSlice.reducer