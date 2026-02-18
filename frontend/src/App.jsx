import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './components/Layout'
import Test from './pages/Test'
import PublicRoutes from './components/PublicRoutes'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* Public Routes here */}
          <Route element={<PublicRoutes />}>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

          </Route>
          {/* Protected Routes here */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              {/* Outlets  */}
              <Route path='/home' element={<Home />} />
              <Route path='/test' element={<Test />} />

            </Route>
          </Route>



        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
