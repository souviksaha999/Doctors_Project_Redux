import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AllDoctorsFetch } from '../Slices/AllDoctorsSlice'
import { Box, Container, Grid, TextField } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom'
import { BlogsDetailssFetch } from '../Slices/BlogDetailsSlice'
import { BlogsCommetsFetch } from '../Slices/BlogGetCommentsSlice'
import { useForm } from 'react-hook-form'
import SubmitLoader from '../Common/SubmitLoader'
import { BlogsCommetsPost } from '../Slices/BlogPostCommentSlice'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DoctorDetailsFetch } from '../Slices/DoctorDetailsSlice'
import { AppointmentPost } from '../Slices/AppointmentSlice'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function Appointment() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {data: doctorData} = useSelector((state)=>{
        console.log("DOCTOR DETAILS STATE..", state?.detailsdoctor)
        return state?.detailsdoctor
    })

    useEffect(()=>{
        dispatch(DoctorDetailsFetch(id))
    },[])



    const { register, watch, formState: { errors }, handleSubmit, reset, setValue } = useForm()

    console.log(watch(["department","doctorname","date","timming","name","phone","message"]))

    useEffect(()=>{
        setValue("department",doctorData?.data?.department_id?.departmentName)
        setValue("doctorname",doctorData?.data?.name)
        setValue("date",new Date(doctorData?.data?.date).toDateString())
        setValue("timming",doctorData?.data?.aperture_time)
        setValue("name",localStorage.getItem("name"))
        setValue("phone",localStorage.getItem("phone"))
    },[doctorData?.data, setValue])

    
    const { mutate } = useMutation({
        mutationFn: (data) => dispatch(AppointmentPost(data)),

        onSuccess: (response) => {
            console.log("Appointment Booked Successfully.....", response)
            if (response?.payload?.status === true) {
                navigate(`/dashboard/${localStorage.getItem("id")}`)   
            }
        }
    })

    const onsubmit = async (data) => {
        console.log("PostComment Data....", data)
        

        await mutate({ 
            user_id: localStorage.getItem("id"), 
            department_id: doctorData?.data?.department_id?._id , 
            doctor_id: doctorData?.data?._id, 
            phone: localStorage.getItem("phone"), 
            message: data?.message })

    }



    return (
        <Layout>

            <Container maxWidth="lg" sx={{ marginTop: "100px" }}>


                {/************************ Posting Comments**************** */}


                <Box component="div"  >
                    <div>
                        <h1>Make Appoinment</h1>

                        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{ marginTop: 8,  display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Appointment Form
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={1}>

              <Grid item xs={12} sm={6}>
                {/* <TextField required fullWidth id="department"  type='text' defaultValue={doctorData?.data?.department_id?.departmentName} disabled 
                {...register("department", { required: true })} /> */}
                <TextField required fullWidth id="department"  type='text' disabled 
                {...register("department", { required: true })} />
                
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* <TextField required fullWidth id="doctorname"  type='text' defaultValue={doctorData?.data?.name} disabled
                 {...register("doctorname", { required: true })} /> */}
                <TextField required fullWidth id="doctorname"  type='text'  disabled
                 {...register("doctorname", { required: true })} />
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* <TextField required fullWidth id="date"  type='text' defaultValue={new Date(doctorData?.data?.date).toDateString()} disabled 
                {...register("date", { required: true })} /> */}
                <TextField required fullWidth id="date"  type='text'  disabled 
                {...register("date", { required: true })} />
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* <TextField required fullWidth id="timming"  type='text' defaultValue={doctorData?.data?.aperture_time} disabled 
                {...register("timming", { required: true })} /> */}
                <TextField required fullWidth id="timming"  type='text' disabled 
                {...register("timming", { required: true })} />
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* <TextField required fullWidth id="timming"  type='text' defaultValue={doctorData?.data?.aperture_time} disabled 
                {...register("timming", { required: true })} /> */}
                <TextField required fullWidth id="name"  type='text' disabled 
                {...register("name", { required: true })} />
                <br />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* <TextField required fullWidth id="timming"  type='text' defaultValue={doctorData?.data?.aperture_time} disabled 
                {...register("timming", { required: true })} /> */}
                <TextField required fullWidth id="phone"  type='number' disabled 
                {...register("phone", { required: true })} />
                <br />
              </Grid>

           
              <Grid item xs={12}>
              <TextField id="outlined-multiline-static message"  multiline rows={4}
                             fullWidth   placeholder="Message" variant="filled"  {...register("message", { required: true })} />
              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid> */}
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Book Appointment
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>


                    </div>
                </Box>

            </Container>
        </Layout>
    )
}
