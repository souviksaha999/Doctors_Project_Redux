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
import { DashBoardFetch } from '../Slices/DashBoardSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';




export default function Dashboard() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const getDashboard = async () => {
        try {
            const response = await dispatch(DashBoardFetch(id))
            return response?.payload?.data
        } catch (error) {

        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboard,
    })

    if (isPending) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log("DASHBOARD__DATAAAA....", data)


    return (
        <Layout>
            <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
                <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>

                    <Box component="div" sx={{ backgroundColor: "rgb(34, 58, 102)", color: "white", height: "250px", width: "300px" }}>

                        {/* <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> */}
                        <img src={`${process.env.REACT_APP_BASE_URL}/${localStorage.getItem("image")}`} />
                        <h3 sx={{ paddingTop: "80px" }}>{localStorage.getItem("name")}</h3>
                        <h3 sx={{ paddingTop: "80px" }}>{localStorage.getItem("email")}</h3>
                        <h3 sx={{ paddingTop: "80px" }}>{localStorage.getItem("phone")}</h3>

                        {/* </div> */}


                    </Box>
                    <Box component="div">
                        <h3 sx={{ paddingTop: "80px" }}>{localStorage.getItem("email")}</h3>
                        <h3 sx={{ paddingTop: "80px" }}>{localStorage.getItem("phone")}</h3>

                    </Box>



                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Sl. No</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Message</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="center">Dr. Pic</TableCell>
                                <TableCell align="center">Dr. Name</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Status</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{localStorage.getItem("name")}</TableCell>
                                        <TableCell align="center">{new Date(item.createdAt).toLocaleString().slice(0, 9)}</TableCell>
                                        <TableCell align="center">{item?.message.slice(0, 19)}</TableCell>
                                        <TableCell align="center">{item?.department_id?.departmentName}</TableCell>
                                        <TableCell align="center"><img src={`${process.env.REACT_APP_BASE_URL}/${item?.doctor_id?.image}`} alt="" height="60px" /></TableCell>
                                        <TableCell align="center">{item?.doctor_id?.name}</TableCell>
                                        <TableCell align="center">{item?.doctor_id?.aperture_time}-{item?.doctor_id?.departure_time}  </TableCell>
                                        <TableCell align="center">{item?.isPending === false ? (
                                            <>
                                            <FiberManualRecordTwoToneIcon fontSize='small' color='error' />Pending
                                            </>) :
                                            (
                                            <>
                                            <DoneAllTwoToneIcon fontSize='small' color='success' />Confirmed
                                            </>
                                        )}</TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Layout>
    )
}
