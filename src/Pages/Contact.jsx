import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoginPost, regLogout } from '../Slices/Auth';
import SubmitLoader from '../Common/SubmitLoader';
import Layout from '../Common/Layout';
import { ContactPost } from '../Slices/ContactSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();






export default function Contact() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading} = useSelector((state)=>{
        console.log("CONTACT_STATE....", state.contact)
        return state.contact
    })

    const {register, watch, reset, setValue, handleSubmit, formState : {errors}} = useForm()

    console.log(watch(["name","email","topic","phone","msg"]))

    const {mutate, ispending} = useMutation({
        mutationFn : (data) => dispatch(ContactPost(data)),

        onSuccess : (response)=>{
            console.log("Contact Page Fetched Successfully......",response)
            if (response?.payload?.status === true){
                navigate("/")
                reset()
            }
        },

        onError : (error)=>{
            console.log(error)
        }
    })


  const onsubmit = (data) => {
    console.log("DATAA....", data)

    mutate(data)
   
  };



  return (
    <Layout>

    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1689602037070-fec2eca3f5b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Contact Us
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 1 }}>


              <TextField margin="normal" required fullWidth id="name" label="Name" type='text'  {...register("name", { required: true })} />
              <br />
              {errors.name?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="email" label="Email" type='email'  {...register("email", { required: true })} />
              <br />
              {errors.email?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="topic" label="Topic" type='text'  {...register("topic", { required: true })} />
              <br />
              {errors.topic?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="phone" label="Phone" type='number'  {...register("phone", { required: true })} />
              <br />
              {errors.phone?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="msg" label="Message" type='text'  {...register("msg", { required: true })} />
              <br />
              {errors.msg?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              
             
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                {loading ? <SubmitLoader /> : "Contact Us" }
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

    </Layout>

  );
}