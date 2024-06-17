import React from 'react'
import Layout from '../Common/Layout'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Box, Container, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { PersonalCareDoctorsFetch } from '../Slices/AboutSlice'




export default function PersonalcareDoctors() {

    const dispatch = useDispatch()

    const PersonalCareDoctors = async () => {
        try {
            const response = await dispatch(PersonalCareDoctorsFetch())
            return response?.payload?.data
        } catch (error) {

        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['personalcaredoctors'],
        queryFn: PersonalCareDoctors,
    })

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log("PERSONAL__CARE__DATAAAA>....", data[0]?.doctor_id 
    )


    return (
        <Layout>
            <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
                <Grid container spacing={2}>
                    {
                        
                        Array.isArray(data[0]?.doctor_id ) && data[0]?.doctor_id ?.map((item, index) => {
                            return (
                                <>
                                <Grid item xs={3}>
                                <Card  sx={{ maxWidth: 280, height:"480px" }}>
                                       
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
                                            {/* <Typography variant="body2" color="text.secondary">
                                                Department : {item?.department_details[0]?.departmentName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Department Id : {item?.department_details[0]?._id} */}
                                            {/* </Typography> */}
                                        </CardContent>
                                        <CardActions>
                                            <Button variant='outlined' color='secondary' size="small" > 
                                                <Link to={`/detailsdoctor/${item?._id}`} style={{textDecoration : "none", color:"black"}}>  Read More.. </Link></Button>
                                            <Button variant='outlined' color='secondary' size="small" > 
                                                <Link to={`/appointment/${item?._id}`} style={{textDecoration : "none", color:"black"}}>  Book Appointment.. </Link></Button>
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
