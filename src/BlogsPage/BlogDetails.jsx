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





export default function BlogDetails() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, data: getCommentsData } = useSelector((state) => {
        console.log("GET_COMMENTS_STATE...", state?.blogcommentsfetch)
        return state?.blogcommentsfetch
    })

    useEffect(() => {
        dispatch(BlogsCommetsFetch(id))
    }, [])


    const { mutate } = useMutation({
        mutationFn: (data) => dispatch(BlogsCommetsPost(data)),

        onSuccess: (response) => {
            console.log("Comment Posted Successfully.....", response)
            if (response?.payload?.status === 200) {
                // refetch()  // Cant be done
                dispatch(BlogsCommetsFetch(id))
                // navigate(`/blogdetails/${id}`)    // Cant be done
                reset()

            }
        }
    })

    const { register, watch, formState: { errors }, handleSubmit, reset } = useForm()

    console.log(watch(["blog_Id", "user_id", "comment"]))

    const onsubmit = async (data) => {
        console.log("PostComment Data....", data)

        await mutate({ blog_Id: id, user_id: localStorage.getItem("id"), comment: data?.comment })
  
    }



    const getBlogDetails = async () => {
        try {
            const response = await dispatch(BlogsDetailssFetch(id))
            return response?.payload?.data
        } catch (error) {

        }
    }


    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['blogdetails'],
        queryFn: getBlogDetails,
    })

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    // console.log("Blog_Details_DATAAAA>....", data)


    return (
        <Layout>

            <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
                <Box component="div" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <div>
                        <img src={`https://doctor-service.onrender.com/${data?.image}`} alt="Photo" width="100%" />

                        {/* </div> */}
                        {/* <div style={{paddingLeft : "20px"}}> */}
                        <h1>{data?.title} </h1>
                        <p>Blog Id : {data?._id} </p>

                        <p>Description : {data?.description} </p>

                    </div>
                </Box>

                {/************************ Getting Comments**************** */}
                <Box component="div"  >
                    <div>
                        <h1>{getCommentsData.count} Comments</h1>
                        {
                            Array.isArray(getCommentsData?.data) && getCommentsData?.data?.slice()?.reverse()?.map((item, index) => {
                                return (
                                    <>
                                        <h3>  {item?.user_id?.name}  </h3>
                                        <p>Posted At | {item?.createdAt}</p>
                                        <p> {item?.comment} </p>
                                    </>
                                )
                            })
                        }


                    </div>
                </Box>

                {/************************ Posting Comments**************** */}


                <Box component="div"  >
                    <div>
                        <h1>Post Comments</h1>

                        <Box
                            component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate onSubmit={handleSubmit(onsubmit)} autoComplete="off" >

                            {/* <TextField margin="normal" required fullWidth id="blog_Id"  type='text' defaultValue={id}  disabled {...register("blog_Id", { required: true })} />

                            <TextField margin="normal" required fullWidth id="user_id"  type='text' defaultValue= {localStorage.getItem("id")} disabled {...register("blog_Id", { required: true })} /> */}


                            <TextField id="filled-multiline-static" label="Multiline"
                                fullWidth multiline rows={4} defaultValue="Comments" variant="filled"  {...register("comment", { required: true })} />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                {loading ? <SubmitLoader /> : "Submit"}
                            </Button>

                        </Box>


                    </div>
                </Box>



            </Container>
        </Layout>
    )
}
