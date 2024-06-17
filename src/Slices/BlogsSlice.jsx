import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const BlogssFetch = createAsyncThunk("All / Blogs ", async(arg, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/allblog`)
        console.log("All_BLOGS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const BlogsSlice = createSlice({
    name : "allblogs",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(BlogssFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(BlogssFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(BlogssFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default BlogsSlice.reducer