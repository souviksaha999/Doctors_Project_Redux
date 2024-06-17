import React from 'react'
import Layout from '../Common/Layout'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Box, Container, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom'
import { DepartmentDoctorsFetch } from '../Slices/DepartmentDoctorSlice'




export default function DepartmentsDoctors() {
    const {id} = useParams()
    const dispatch = useDispatch()

    const getDepartmentDoctors = async () => {
        try {
            const response = await dispatch(DepartmentDoctorsFetch(id))
            return response?.payload?.data
        } catch (error) {

        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['departmentdoctors'],
        queryFn: getDepartmentDoctors,
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
                <h1>{data[0].department_id.departmentName} Doctors</h1>
                <Grid container spacing={2}>
                    {
                        
                        Array.isArray(data) && data?.map((item, index) => {
                            return (
                                <>
                                <Grid item xs={3}>
                                    {/* <h3>{item?.department_id?.departmentName}</h3> */}
                                <Card  sx={{ maxWidth: 3000, height:"440px" }}>
                                        
                                        <Box component="div" sx={{display : "flex", justifyContent : "center"}}>
                                        <img src={`https://doctor-service.onrender.com/${item?.image}`} alt="Photo" height="200px" />

                                        </Box>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                              {item?.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Doctor Id : {item?._id}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                            Description : {item?.description?.slice(0,50)}
                                            </Typography>
                                            
                                        </CardContent>
                                        <CardActions>
                                            <Button variant='outlined' color='secondary' size="small" > 
                                                <Link to={`/detailsdoctor/${item?._id}`} style={{textDecoration : "none", color:"black"}}>  Read More.. </Link>
                                            </Button>
                                            <Button variant='outlined' color='secondary' size="small" > 
                                                <Link to={`/appointment/${item?._id}`} style={{textDecoration : "none", color:"black"}}>  Make Appointment.. </Link>
                                            </Button>
                                        </CardActions>

                                    </Card>
                                </Grid>
                                    
                                </>
                            )
                        })
                    }
                    


                </Grid>
            </Container>
        </Layout>
    )
}
