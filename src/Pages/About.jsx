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
import { FeaturedDoctorsFetch } from '../Slices/AboutSlice'
import FeaturedDoctors from '../Components/FeaturedDoctors'
import PersonalcareDoctors from '../Components/PersonalcareDoctors'
import ChildcareDoctors from '../Components/ChildcareDoctors'




export default function About() {


    return (
        <Layout>

            <h1 style={{marginTop: "100px"}}>Featured / Specialist Doctors</h1>
             <FeaturedDoctors />

            <h1>Personal Care Doctors</h1>
             <PersonalcareDoctors />

            <h1>Child Care Doctors</h1>
             <ChildcareDoctors />
        </Layout>
    )
}
