import React from 'react'
import Layout from '../Common/Layout'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { AllDoctorsFetch } from '../Slices/AllDoctorsSlice'
import { Box, Container, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom'
import { DoctorDetailsFetch } from '../Slices/DoctorDetailsSlice'





export default function DetailsDoctor() {
    const {id} = useParams()
    const dispatch = useDispatch()

    const getAllDoctors = async () => {
        try {
            const response = await dispatch(DoctorDetailsFetch(id))
            return response?.payload?.data
        } catch (error) {

        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['alldoctors'],
        queryFn: getAllDoctors,
    })

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log("DATAAAA>....", data)


    return (
        <Layout>
            
            <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
                <Box component="div" sx={{display: "flex", justifyContent :"center", alignItems: "center"}} >
                    <div>
                    <img src={`https://doctor-service.onrender.com/${data?.image}`} alt="Photo" height="400px" />

                    </div>
                    <div style={{paddingLeft : "20px"}}>
                            <h1>Name :  {data?.name} </h1>
                            <p>Dr. Id : {data?._id} </p>
                            <p>Department : {data?.department_id?.departmentName} </p>
                            <p>Apperture : {data?.aperture_time} </p>
                            <p>Departure : {data?.departure_time} </p>
                            <p>Description : {data?.description} </p>

                    </div>
                </Box>
            </Container>
        </Layout>
    )
}
