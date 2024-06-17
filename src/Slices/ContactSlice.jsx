import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const ContactPost = createAsyncThunk("Contact ", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/createcontact`, data)
        console.log("CONTACT_RESPONSE.....", response)
        return response?.data
    } catch (error) {
        toast.error(error?.message)
        return rejectWithValue(error)
    }
})


const contactSlice = createSlice({
    name : "contact",
    initialState : {
        data: [],
        loading: false,
        error: null,
    },
    reducers : {},

    extraReducers : (builder)=>{

        builder.addCase(ContactPost.pending, (state,action)=>{
            state.loading = true
        })
        builder.addCase(ContactPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === true){
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(ContactPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
        
    }
})


export default contactSlice.reducer