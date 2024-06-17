import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const SearchFetch = createAsyncThunk("Search / Blogs ", async(word, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/blogsearch/${word}`)
        console.log("SEARCH_BLOG_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const SearchBlogSlice = createSlice({
    name : "recentblogs",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(SearchFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(SearchFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(SearchFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default SearchBlogSlice.reducer