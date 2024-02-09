import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import UserDetails from './pages/UserDetails'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import Login from './pages/Login'
import AddUser from './pages/AddUser'
import AdminHome from './pages/AdminHome'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute >
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='' element={<AdminHome />} />
          <Route path='users' element={<UserDetails />} />
          <Route path='add_user' element={<AddUser />} />
          <Route path='category' element={<Categories />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
