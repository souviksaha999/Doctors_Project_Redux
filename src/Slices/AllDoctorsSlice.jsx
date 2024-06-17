import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AllDoctorsFetch = createAsyncThunk("All / Doctors ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/alldoctordepartment`)
        console.log("All_DOCTORS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const AllDoctorsSlice = createSlice({
    name : "alldoctors",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(AllDoctorsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(AllDoctorsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(AllDoctorsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default AllDoctorsSlice.reducer