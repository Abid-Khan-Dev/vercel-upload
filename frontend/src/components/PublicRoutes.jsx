import React, { useEffect, useState } from 'react'
import api from '../services/api';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {
    const [ok, setOk] = useState(null);

    const getStudents = async () => {
        try {
            const res = await api.get('/students')
            console.log(res);
            if (res.status === 200) {
                setOk(true)
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
    if (!ok) return <Outlet />
    if (ok) return <Navigate to='/home' />


}

export default PublicRoutes
