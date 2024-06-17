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
import { RegisterPost } from '../Slices/Auth';
import SubmitLoader from '../Common/SubmitLoader';
import Layout from '../Common/Layout';

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






export default function Reg() {

    const [image, setImage] = React.useState()

    const imageChange = (e)=>{
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading} = useSelector((state)=>{
        console.log("REGISTER_STATE....", state.auth)
        return state.auth
    })

    const {register, watch, reset, setValue, handleSubmit, formState : {errors}} = useForm()

    console.log(watch(["name","email","phone","password", "forget"]))

    const {mutate, ispending} = useMutation({
        mutationFn : (data) => dispatch(RegisterPost(data)),

        onSuccess : (response)=>{
            console.log("Registered Successfully......",response)
            if (response?.payload?.success === true){
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
    const formData = new FormData()
    formData.append("name", data?.name)
    formData.append("email", data?.email)
    formData.append("phone", data?.phone)
    formData.append("password", data?.password)
    formData.append("forget", data?.forget)
    formData.append("image", image)

    mutate(formData)
   
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 1 }}>

              <TextField margin="normal" required fullWidth id="name" label="Name" type='text'  {...register("name", { required: true })} />
              <br />
              {errors.name?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="email" label="Email" type='email'  {...register("email", { required: true })} />
              <br />
              {errors.email?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="phone" label="Phone" type='number'  {...register("phone", { required: true })} />
              <br />
              {errors.phone?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="password" label="Password" type='password'  {...register("password", { required: true })} />
              <br />
              {errors.password?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="forget" label="Forget" type='password'  {...register("forget", { required: true })} />
              <br />
              {errors.forget?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              <TextField margin="normal" required fullWidth id="image" type='file' accept="image/*" {...register("image", { required: true })} name='image' onChange={imageChange}/>
              <br />
              {errors.image?.type === "required" && (<span style={{color : "red"}}> This Field is required</span>)}

              {
                image!== "" && image!== null && image!== undefined ? (<>
                    <img src={URL.createObjectURL(image)} height="110px" />
                </>) : (<>{image=== "" && <p>Drag and drop Image</p>}</>)
              }

             
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                {loading ? <SubmitLoader /> : "Register" }
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/login" variant="body2" style={{textDecoration : "none", color : "black"}}>
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

    </Layout>

  );
}