import axios from 'axios';
import React, { useState } from 'react'

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    function handleChange(e) {
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData, [name]: value
        })

    }
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData, 'formData');
        const response = await axios.post('http://localhost:3000/signup', formData)
        console.log(response);
        alert(response.data.name)

    }
    return (
        <>
            <div className='flex h-screen bg-gray-100 flex-col items-center justify-center gap-4 '>


                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 rounded-lg w-lg  flex flex-col">
                    <h1 className='text-2xl text-gray-600 mx-auto mb-3 font-bold'>Sign Up</h1>
                    <div className='flex flex-col mb-1'>
                        <label className='text-gray-700' htmlFor="name">Name</label>
                        <input name='name' id='name' className='text-gray-700 px-3 py-2 outline-none bg-gray-200 rounded focus:ring-1 focus:ring-blue-400' type="text" onChange={handleChange} />

                    </div>
                    <div className='flex flex-col mb-1'>
                        <label className='text-gray-700' htmlFor="email">Email</label>
                        <input name='email' id='email' className='text-gray-700 px-3 py-2 outline-none bg-gray-200 rounded focus:ring-1 focus:ring-blue-400' type="text" onChange={handleChange} />

                    </div>
                    <div className='flex flex-col mb-1'>
                        <label htmlFor='password'>Password</label>
                        <input
                            name='password'
                            id='password'
                            type="text"
                            className='py-2 px-3 bg-gray-200'
                            onChange={handleChange} />
                    </div>
                    <button className='py-2 px-3 mt-3 bg-blue-600 text-white rounded' type='submit'>Send Data</button>

                </form>

            </div>
        </>
    )
}

export default Signup
