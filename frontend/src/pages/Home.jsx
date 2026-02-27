import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../services/api';

function Home() {
    const [form, setForm] = useState({
        name: '',
        fName: '',
        rollNo: ''
    });

    const [students, setStudents] = useState([])
    const [search, setSearch] = useState('')
    // const [debounced, setDebounced] = useState('')
    const [updatedId, setUpdatedId] = useState(null)
    const [totalStudents, setTotalStudents] = useState(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)
    const limit = 10;

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({
            ...form, [name]: value
        })
    }
    const getAllStudents = async () => {
        if (loading) return
        if (totalPages && page > totalPages) return
        try {

            setLoading(true)
            const response = await api.get(`/students?&page=${page}&limit=${limit}`)

            setStudents(prev => [...prev, ...response.data.students])
            setTotalStudents(response.data.totalStudents)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error.message);
            alert(error.response.data)
            setLoading(false)
        } finally {

            setLoading(false)
        }

    }

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setDebounced(search)
    //     }, 500);
    //     console.log(timer);


    //     return () => clearTimeout(timer);
    // }, [search])

    // useEffect(() => {
    //     getAllStudents()
    //     setPage(1)
    // }, [debounced])

    useEffect(() => {
        getAllStudents()
    }, [page])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100 && !loading) {
                setPage(old => old + 1)
            }
        }
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [page, loading, totalStudents])

    return (
        <div className='min-h-screen w-full bg-gray-200 p-6'>

            <form className='w-lg bg-white mx-auto p-4 rounded-2xl' onSubmit={async (event) => {
                event.preventDefault();
                try {
                    // agr user ne update button par click nhi kiya ho to ye else run hoga
                    if (updatedId) {
                        // const response = await axios.post('http://localhost:3000/students/update', {
                        //     Id: updatedId,
                        //     ...form
                        // })

                        const response = await api.post('/students/update', {
                            Id: updatedId,
                            ...form
                        })

                        if (response.data.updatedStudents) {

                            getAllStudents()
                        }
                    } else {
                        // const response = await axios.post('http://localhost:3000/students/create', form);
                        const response = await api.post('/students/create', form);
                        console.log(response);
                        if (response.data.success) {
                            getAllStudents()
                        }
                    }


                } catch (error) {
                    console.log(error.message);

                }
            }}>
                <div className='mb-2 flex flex-col text-sm'>
                    <label htmlFor="name">Name:</label>
                    <input className='py-2 px-3 bg-gray-100 ' type="text" id='name' name='name' onChange={handleChange} value={form.name} />
                </div>
                <div className='mb-2 flex flex-col text-sm'>
                    <label htmlFor="fName">FName:</label>
                    <input className='py-2 px-3 bg-gray-100 ' type="text" id='fName' name='fName' onChange={handleChange} value={form.fName} />
                </div>
                <div className='mb-2 flex flex-col text-sm'>
                    <label htmlFor="rollNo">RollNo:</label>
                    <input className='py-2 px-3 bg-gray-100 ' type="number" id='rollNo' name='rollNo' onChange={handleChange} value={form.rollNo} />
                </div>
                <button type='submit' className='py-2 px-3 bg-blue-600 hover:bg-blue-300 text-white'>Save Data</button>
            </form>
            <input type="text" className='mt-10 block mx-auto px-4 py-2 bg-gray-50' placeholder='Search by name...'
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <table className='w-[600px] bg-white mx-auto rounded p-2 mt-4'>
                <thead className=' border-b-2'>
                    <tr>
                        <th>Name</th>
                        <th>F Name</th>
                        <th>Roll No</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {students?.map((student) => {
                        return <tr className='m-2 p-4' key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.fName}</td>
                            <td>{student.rollNo}</td>
                            <td className='space-x-2 space-y-2'>
                                <button className='bg-blue-500 hover:bg-blue-800 text-white px-4 py-2' onClick={() => {
                                    console.log(student, 'handleUpdate');
                                    setUpdatedId(student._id) // ab as main student id hai

                                    console.log(updatedId, 'updatedId');
                                    setForm({ /// and form data update hoga as row ke motabaak
                                        name: student.name,
                                        fName: student.fName,
                                        rollNo: student.rollNo
                                    })
                                }}>Update</button>



                                <button onClick={async () => {
                                    // hum yaha pe api call krh hai and os ke sath student id send krh hai and backend sey response ayga os main success true
                                    const response = await api.post('/students/delete', {
                                        id: student._id
                                    })
                                    if (response.data.success) getAllStudents()
                                }}>Delete</button>
                            </td>
                        </tr>
                    })}
                    {loading && <tr className='m-2 p-4 text-center font-semibold text-gray-700'>
                        <td>Loading...</td>
                    </tr>}
                    {page == totalPages && <tr className='m-2 p-4 text-center font-semibold text-gray-700'>
                        <td>No more data found</td>
                    </tr>}
                </tbody>
            </table>
            {/* <button onClick={getAllStudents}>get All students</button> */}
        </div >
    )
}

export default Home
