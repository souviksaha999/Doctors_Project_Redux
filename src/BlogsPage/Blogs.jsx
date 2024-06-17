import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Box, Container, Grid, Pagination, Stack } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { BlogssFetch } from '../Slices/BlogsSlice'
import { RecentBlogFetch } from '../Slices/RecentBlogSlice'
import SearchBlog from '../Components/SearchBlog'




export default function AllBlogs() {

    const [page, setPage] = React.useState(1);
    let itemPerPage = 2
    const handleChange = (event, value) => {
        setPage(value);
    };

    const dispatch = useDispatch()

    const { data: recentBlogData } = useSelector((state) => {
        // console.log("RECENT_BLOG_STATE....", state?.recentblogs)
        return state?.recentblogs
    })

    useEffect(() => {
        dispatch(RecentBlogFetch())
    }, [])



    const getAllBlogs = async () => {
        try {
            const response = await dispatch(BlogssFetch())
            return response?.payload?.data
        } catch (error) {

        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['allblogs'],
        queryFn: getAllBlogs,
    })

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    // console.log("ALLBLOG_DATAA>....", data)

    let PaginatedData = data.slice((page - 1) * itemPerPage, page * itemPerPage)


    return (
        <Layout>
            <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
                <h1>All Blogs</h1>

                <Grid container spacing={2} >
                    <Grid item md={8}>
                        <div >

                            {
                                Array.isArray(PaginatedData) && PaginatedData?.map((item, index) => {
                                    return (
                                        <>
                                            <Card key={index} elevation={20} sx={{ maxWidth: "50vw" }} style={{ marginTop: "20px" }}>

                                                <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
                                                    <img src={`https://doctor-service.onrender.com/${item?.image}`} alt="Photo" width="100%" />

                                                </Box>

                                                <Typography variant="body" color="text.secondary" sx={{marginTop : "20px"}}>
                                                    {/* {item?.createdAt} */}
                                                   <b> {new Date(item?.createdAt).toLocaleString('en-US',{
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                       })} </b>
                                                </Typography> <br />
                                                <Typography variant="body" color="text.secondary">
                                                    Blog Id :{item?._id}
                                                </Typography>

                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {item?.title}
                                                    </Typography>

                                                    <Typography variant="body" color="text.secondary">
                                                        {item?.description?.slice(0, 230)}
                                                    </Typography>


                                                </CardContent>
                                                <CardActions>
                                                    <Button variant='outlined' color='secondary' size="small" >
                                                        <Link to={`/blogdetails/${item?._id}`} style={{ textDecoration: "none", color: "black" }}> Read More.. </Link></Button>
                                                </CardActions>

                                            </Card>

                                        </>
                                    )
                                })
                            }

                        </div>

                    </Grid>



                    <Grid item md={4}>

                            <SearchBlog />

                        {
                            Array.isArray(recentBlogData?.data) && recentBlogData?.data?.map((item, index) => {
                                return(
                                    <>
                                       <p>  {new Date(item?.updatedAt).toLocaleString('en-US',{
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                       })} </p>

                                       <div style={{display : "flex", alignItems : "center"}}>
                                        <div>
                                        <img src={`https://doctor-service.onrender.com/${item?.image}`} alt="" height="50px" />

                                        </div>
                                        <div style={{paddingLeft: "10px"}}>
                                        <h4> <Link to={`/blogdetails/${item._id}`} style={{textDecoration : "none", color : "black" }}> {item?.title}  </Link>  </h4>

                                        </div>
                                       </div>
                                    </>
                                )

                            })
                        }
                    </Grid>

                </Grid>

                <Stack spacing={2}>
                    <Typography>Page: {page}</Typography>
                    <Pagination count={Math.ceil(data.length / itemPerPage)} page={page} onChange={handleChange} variant="outlined" color="secondary" />
                </Stack>

            </Container>
        </Layout>
    )
}
