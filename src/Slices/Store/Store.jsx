import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../Auth"
import ContactSlice from '../ContactSlice'
import AllDoctorsSlice from '../AllDoctorsSlice'
import DoctorDetailsSlice from '../DoctorDetailsSlice'
import AllDepartmentsSlice from '../AllDepartmentSlice'
import DepartmentDoctorsSlice from '../DepartmentDoctorSlice'
import AboutSlice from '../AboutSlice'
import BlogsSlice from '../BlogsSlice'
import DetailsBlogSlice from '../BlogDetailsSlice'
import BlogGetCommentsSlice from '../BlogGetCommentsSlice'
import BlogPostCommentsSlice from '../BlogPostCommentSlice'
import RecentBlogSlice from '../RecentBlogSlice'
import SearchBlogSlice from '../SearchSlice'
import AppointmentSlice from '../AppointmentSlice'
import DashboardSlice from '../DashBoardSlice'



export const store = configureStore({
  reducer: {
    auth : authSlice,
    contact : ContactSlice,
    alldoctors : AllDoctorsSlice,
    detailsdoctor : DoctorDetailsSlice,
    alldepartments : AllDepartmentsSlice,
    departmentdoctors : DepartmentDoctorsSlice,
    about : AboutSlice,
    blogs : BlogsSlice,
    blogdetails : DetailsBlogSlice,
    blogcommentsfetch : BlogGetCommentsSlice,
    blogcommentspost : BlogPostCommentsSlice,
    recentblogs : RecentBlogSlice,
    searchblogs : SearchBlogSlice,
    appointment : AppointmentSlice,
    dashboard : DashboardSlice,

  },
})