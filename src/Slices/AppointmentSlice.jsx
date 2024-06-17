import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AppointmentPost = createAsyncThunk("Post /Aappointment ", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/createappointment`, data)
        console.log("POST_APPOINTMENT_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const AppointmentSlice = createSlice({
    name : "appointment",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(AppointmentPost.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(AppointmentPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
            
        })
        builder.addCase(AppointmentPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default AppointmentSlice.reducer