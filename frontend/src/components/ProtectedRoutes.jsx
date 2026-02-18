import React, { useEffect, useState } from 'react'
import api from '../services/api';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
    const [ok, setOk] = useState(null);
    const [user, setUser] = useState(null)
    const getStudents = async () => {
        try {
            const res = await api.get('/me')
            console.log(res);
            if (res.status === 200) {
                setOk(true)
                setUser(res.data.user);
            }
        } catch (error) {
            console.log(error);
            setOk(false)

        }
    }
    useEffect(() => {
        getStudents()
    }, [])

    if (ok === null) return <p>Checking</p>
    if (!ok) return <Navigate to='/' /> // /login
    if (ok) return <Outlet /> //dashboard


}

export default ProtectedRoutes
