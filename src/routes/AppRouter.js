import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//Home
import Home from '../pages/Home'
import Sss from '../pages/Sss'
import Contact from '../pages/Contact'
import PostDetail from '../pages/PostDetail'

//Admin
import Dashboard from '../pages/Admin/Dashboard'
import Services from '../pages/Admin/Services';
import AdminContacts from '../pages/Admin/AdminContacts'
import AdminFaqs from '../pages/Admin/AdminFaqs'
import AdminSocials from '../pages/Admin/AdminSocials'
import AdminUsers from '../pages/Admin/AdminUsers'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminPosts from '../pages/Admin/AdminPosts'
import AdminTeamApplications from '../pages/Admin/AdminTeamApplications'
//*
import Unauthorized from '../pages/Unauthorized'
import NotFound from '../pages/NotFound'
import ApplicationForm from '../pages/ApplicationForm'
import TraineeForm from '../pages/TraineeForm'
import AdminTrainee from '../pages/Admin/AdminTrainee'
const AppRouter = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sss' element={<Sss />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/p/:slugUrl' element={<PostDetail />}/>
        <Route path='/team-application' element={<ApplicationForm />}/>
        <Route path='/trainee-application' element={<TraineeForm />}/>
        <Route path='/admin' element={user ? <Dashboard /> : <Navigate to="/login"/>}/>
        <Route path='/admin/services' element={user ? <Services /> : <Navigate to="/login"/>}/>
        <Route path='/admin/contacts' element={user ? <AdminContacts /> : <Navigate to="/login"/>}/>
        <Route path='/admin/team-applications' element={user ? <AdminTeamApplications /> : <Navigate to="/login"/>}/>
        <Route path='/admin/trainee-applications' element={user ? <AdminTrainee /> : <Navigate to="/login"/>}/>
        <Route path='/admin/faqs' element={user ? <AdminFaqs /> : <Navigate to="/login"/>}/>
        <Route path='/admin/socials' element={user ? <AdminSocials /> : <Navigate to="/login"/>}/>
        <Route path='/admin/posts' element={user ? <AdminPosts /> : <Navigate to="/login"/>}/>
        <Route path='/admin/users' element={user ? <AdminUsers /> : <Navigate to="/login"/>}/>
        <Route path='/unauthorized' element={<Unauthorized />}/>
        <Route path='/login' element={<AdminLogin />}/>
        <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default AppRouter