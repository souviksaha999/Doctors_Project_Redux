import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const BlogsDetailssFetch = createAsyncThunk("Details / Blog ", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/singleblog/${id}`)
        console.log("DETAILS_BLOGS_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const DetailsBlogSlice = createSlice({
    name : "detailsblog",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(BlogsDetailssFetch.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(BlogsDetailssFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
            // if (action?.payload?.status === false){
            //     toast.success(action?.payload?.message)
            // }
        })
        builder.addCase(BlogsDetailssFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default DetailsBlogSlice.reducer