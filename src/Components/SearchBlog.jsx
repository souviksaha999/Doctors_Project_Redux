import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Box, Container, Grid, TextField } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { FeaturedDoctorsFetch } from '../Slices/AboutSlice'
import { SearchFetch } from '../Slices/SearchSlice'
import axiosInstance from '../AxiosInstance/Api'




export default function SearchBlog() {

    const [input, setInput] = useState("")
    const [search, setSearch] = useState("")
    const [blogs, setBlogs] = useState()

    const dispatch = useDispatch()

    const getSearch = async () => {
        try {
            // const response = await axiosInstance.get(`https://doctor-service.onrender.com/blogsearch/${search}`)
            const response = await axiosInstance.get(`https://doctor-service.onrender.com/blogsearch/${input}`)
            console.log("XXX",response)
            setBlogs(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }



    // useEffect(() => {
    //     if (search) {
    //         getSearch();
    //     }
    // }, [search])
    
    useEffect(() => {
        if (input) {
            getSearch();
        }
    }, [input])

    const onchange = (e) => {
        console.log(e.target.value)
        setInput(e.target.value)
    }

    console.log("SEARCH", search)

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setSearch(input)
    // }


    /************** USING QUERY ***************** */

    // const searchBlog = async () => {
    //     try {
    //         const response = await dispatch(SearchFetch(input))
    //         return response?.payload?.data
    //     } catch (error) {

    //     }
    // }

    // const { isPending, isError, data, error, refetch } = useQuery({
    //     queryKey: ['searchblog'],
    //     queryFn: searchBlog,
    // })

    // if (data) {
    //     refetch()
    // }

    // if (isPending) {
    //     return <h1>Loading...</h1>
    // }

    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }

    // console.log("SEARCH_BLOG_DATAAAA>....", data)


    return (
        <Layout>
            {/* <Container maxWidth="lg" sx={{ marginTop: "100px" }}> */}


            <Box component="form"  sx={{ mt: 1, marginBottom: "100px" }}>


                <TextField placeholder='Search' margin="normal" required fullWidth id="search" type='text' name="" value={input} onChange={onchange} />



                {/* <Button type="submit" size='' variant="contained" sx={{ mt: 3, mb: 2 }} > */}
                {/* {loading ? <SubmitLoader /> : "Login" } */}
                {/* Submit
              </Button> */}


                {/* {blogs.length === 0 ?
                    (<><h4></h4></>) : (
                        <> */}

<h3>{blogs?.length} Blogs Found</h3>

{
    Array.isArray(blogs) && blogs?.map((item, index) => {
        return (
            <>
                {/* <p>  {item?.updatedAt} </p> */}
                <b>  {new Date(item?.updatedAt).toLocaleString('en-US',{
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                       })}</b>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        <img src={`https://doctor-service.onrender.com/${item?.image}`} alt="" height="50px" />

                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                        <h4> <Link to={`/blogdetails/${item._id}`} style={{ textDecoration: "none", color: "black" }}> {item?.title}  </Link>  </h4>

                    </div>
                </div>
            </>
        )
    })
}

                        {/* </>)} */}

                

            </Box>




            {/* </Container> */}
        </Layout>
    )
}
