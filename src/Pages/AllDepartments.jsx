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
import { Link } from 'react-router-dom'
import { AllDepartmentsFetch } from '../Slices/AllDepartmentSlice'




export default function AllDepartments() {

    const dispatch = useDispatch()

    const getAllDepartments = async () => {
        try {
            const response = await dispatch(AllDepartmentsFetch())
            return response?.payload?.data
        } catch (error) {

        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['alldepartments'],
        queryFn: getAllDepartments,
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
                <h1>All Departments</h1>
                <Grid container spacing={2}>
                    {
                        
                        Array.isArray(data) && data?.map((item, index) => {
                            return (
                                <>
                                <Grid item xs={4}>
                                <Card elevation={20} sx={{ maxWidth: 345, height:"410px" }}>
                                       
                                        <Box component="div" sx={{display : "flex", justifyContent : "center"}}>
                                        <img src={`https://doctor-service.onrender.com/${item?.image}`} alt="Photo" height="200px" />

                                        </Box>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                              {item?.departmentName}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary">
                                                Department Id : {item?._id}
                                            </Typography>
                                            <Typography variant="body" color="text.secondary">
                                                Description : {item?.description?.slice(0,65)}
                                            </Typography>
                                            
                                           
                                        </CardContent>
                                        <CardActions>
                                            <Button variant='outlined' color='secondary' size="small" > 
                                                <Link to={`/departmentdoctors/${item?._id}`} style={{textDecoration : "none", color:"black"}}> Select Doctor.. </Link></Button>
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
