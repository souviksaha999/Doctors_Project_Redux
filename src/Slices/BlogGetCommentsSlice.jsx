import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const BlogsCommetsFetch = createAsyncThunk("Comments / Blog ", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/getblogcomment/${id}`)
        console.log("BLOGS_COMMENTS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const BlogGetCommentsSlice = createSlice({
    name : "getcomment",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(BlogsCommetsFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(BlogsCommetsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
            
        })
        builder.addCase(BlogsCommetsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default BlogGetCommentsSlice.reducer