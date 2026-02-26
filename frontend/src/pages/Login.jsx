import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../services/api'
function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [password, setPassword] = useState('')

    async function handleSendData() {
        // const response = await axios.post('http://localhost:3000/login', {           // old 
        //   email, password
        // },{})

        const response = await api.post('/login', {                                    // New
            email, password
        })
        console.log(response);
        setMsg(response.data.msg)
        // alert(response.data.msg)
        if (response.data.login === true) {
            navigate('/home')
        }

    }
    return (
        <>
            <div className='flex h-screen bg-gray-100 flex-col items-center justify-center gap-4 '>


                <div className="bg-white p-4 rounded-lg w-lg  flex flex-col">
                    <h1 className='text-2xl text-gray-600 mx-auto mb-3 font-bold'>Login</h1>

                    <div className='flex flex-col mb-1'>
                        <label className='text-gray-700' htmlFor="email">Email</label>
                        <input id='email' className='text-gray-700 px-3 py-2 outline-none bg-gray-200 rounded focus:ring-1 focus:ring-blue-400' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>
                    <div className='flex flex-col mb-1'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            type="password"
                            value={password}
                            className='py-2 px-3 bg-gray-200'
                            onChange={function (event) {
                                // console.log(event);
                                setPassword(event.target.value)

                            }} />
                    </div>
                    <button className='py-2 px-3 mt-3 bg-blue-600 text-white rounded' onClick={handleSendData}>Send Data</button>
                    <p className='text-2xl'>{msg}</p>
                </div>

            </div>
        </>
    )
}

export default Login
