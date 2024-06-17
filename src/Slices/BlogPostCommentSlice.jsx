import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const BlogsCommetsPost = createAsyncThunk("Post /Comments / Blog ", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/createblogcomment`, data)
        console.log("POST_BLOGS_COMMENTS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const BlogPostCommentsSlice = createSlice({
    name : "postcomment",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(BlogsCommetsPost.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(BlogsCommetsPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200){
                toast.success(action?.payload?.message)
            }
            
        })
        builder.addCase(BlogsCommetsPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default BlogPostCommentsSlice.reducer