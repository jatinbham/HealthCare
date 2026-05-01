import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import HealthForm from './components/HealthForm/HealthForm'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/about/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github from './components/Github/Github.jsx'

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<Layout />}>

      <Route index element={<Home />} />

      <Route path="about" element={<About />} />

      <Route path="contact" element={<Contact />} />

      <Route path="user/:userid" element={<User />} />

      <Route path='health-analysis' element={<HealthForm />} />

      <Route path='login' element={<Login />} />

      <Route path='signup' element={<Signup />} />

      <Route
    path="dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

      <Route
         path='github' 
         element={<Github />}
      />

    </Route>

  )

)

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <RouterProvider router={router} />

  </React.StrictMode>

)