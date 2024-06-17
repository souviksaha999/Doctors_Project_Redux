import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const DepartmentDoctorsFetch = createAsyncThunk("Department / Doctors ", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/departmentidwisedoctor/${id}`)
        console.log("DEPARTMENT_DOCTORS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const DepartmentDoctorsSlice = createSlice({
    name : "alldepartments",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(DepartmentDoctorsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(DepartmentDoctorsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DepartmentDoctorsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default DepartmentDoctorsSlice.reducer