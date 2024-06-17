import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const RecentBlogFetch = createAsyncThunk("Recent / Blogs ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/recentblog`)
        console.log("RECENT_BLOG_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const RecentBlogSlice = createSlice({
    name : "recentblogs",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(RecentBlogFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(RecentBlogFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(RecentBlogFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default RecentBlogSlice.reducer