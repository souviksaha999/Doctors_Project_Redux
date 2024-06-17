import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AllDepartmentsFetch = createAsyncThunk("All / Departments ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/alldepartment`)
        console.log("All_DEPARTMENTS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const AllDepartmentsSlice = createSlice({
    name : "alldepartments",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(AllDepartmentsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(AllDepartmentsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(AllDepartmentsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default AllDepartmentsSlice.reducer