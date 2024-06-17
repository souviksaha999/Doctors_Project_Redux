import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const FeaturedDoctorsFetch = createAsyncThunk("Featured / Doctors ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/featured`)
        console.log("FEATURED_DOCTORS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})
export const PersonalCareDoctorsFetch = createAsyncThunk("Personal Care / Doctors ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/personalcare`)
        console.log("PERSONAL_CARE_DOCTORS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})
export const ChildCareDoctorsFetch = createAsyncThunk("Child Care / Doctors ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/childcare`)
        console.log("CHILD_CARE_DOCTORS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const AboutSlice = createSlice({
    name : "about",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(FeaturedDoctorsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(FeaturedDoctorsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(FeaturedDoctorsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        
        builder.addCase(PersonalCareDoctorsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(PersonalCareDoctorsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(PersonalCareDoctorsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


        builder.addCase(ChildCareDoctorsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(ChildCareDoctorsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(ChildCareDoctorsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default AboutSlice.reducer