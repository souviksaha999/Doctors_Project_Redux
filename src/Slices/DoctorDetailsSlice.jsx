import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const DoctorDetailsFetch = createAsyncThunk("Details / Doctors ", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/doctordetails/${id}`)
        console.log("DOCTOR_DETAILS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const DoctorDetailsSlice = createSlice({
    name : "doctordetails",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(DoctorDetailsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(DoctorDetailsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DoctorDetailsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default DoctorDetailsSlice.reducer