// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { check_token } from './Slices/Auth';
import Reg from './Account/Reg';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SignIn from './Account/SignIn';
import Contact from './Pages/Contact';
import AllDoctors from './Pages/AllDoctors';
import DetailsDoctor from './Pages/DetailsDoctor';
import AllDepartments from './Pages/AllDepartments';
import DepartmentsDoctors from './Pages/DepartmentDoctors';
import About from './Pages/About';
import AllBlogs from './BlogsPage/Blogs';
import BlogDetails from './BlogsPage/BlogDetails';
import Appointment from './Pages/Appointment';
import Dashboard from './Account/Dashboard';

// Create a client
const queryClient = new QueryClient()




function App() {

  const PrivateRoute = ({children})=>{
    const token = localStorage.getItem("token")
    return token!==null && token!== undefined && token!=="" ? (children) : (<Navigate to="/login" />)
  }

  const PublicRoute = [
    // { path: "/", component: <Home /> },
    { path: "/reg", component: <Reg /> },
    { path: "/login", component: <SignIn /> },
    // { path: "/allblogs", component: <AllBlogs /> },
    // { path: "/blogdetails/:id", component: <BlogDetails /> },
  ]
  const ProtectedRoute = [
    { path: "/", component: <Home /> },
    { path: "/contact", component: <Contact /> },
    { path: "/alldoctors", component: <AllDoctors /> },
    { path: "/detailsdoctor/:id", component: <DetailsDoctor /> },
    { path: "/alldepartments", component: <AllDepartments /> },
    { path: "/departmentdoctors/:id", component: <DepartmentsDoctors /> },
    { path: "/about", component: <About /> },
    { path: "/allblogs", component: <AllBlogs /> },
    { path: "/blogdetails/:id", component: <BlogDetails /> },
    { path: "/appointment/:id", component: <Appointment /> },
    { path: "/dashboard/:id", component: <Dashboard /> },

  ]

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(check_token())
  },[])



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

{/* // Provide the client to your App */}
    <QueryClientProvider client={queryClient}>

    <Router>
        <Routes>
          {
            Array.isArray(PublicRoute) && PublicRoute.map((item, index) => {
              return (

                <Route key={index} path={item.path} element={item.component} />

              )
            })
          }
          {
            Array.isArray(ProtectedRoute) && ProtectedRoute.map((item, index) => {
              return (

                <Route key={index} path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute> } />

              )
            })
          }
        </Routes>
      </Router>

    </QueryClientProvider>

      
    </>
  );
}

export default App;
