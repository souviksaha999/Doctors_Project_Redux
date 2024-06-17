import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const DashBoardFetch = createAsyncThunk(" Dashboard ", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/userdash/${id}`)
        console.log("DASHBOARD_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const DashboardSlice = createSlice({
    name : "dashboard",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(DashBoardFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(DashBoardFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DashBoardFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default DashboardSlice.reducer