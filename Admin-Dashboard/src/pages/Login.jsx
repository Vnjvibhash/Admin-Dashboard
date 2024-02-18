import React, { useState } from 'react'
import '../styles/style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [checked, setCheckBox] = useState(false)
    const [error, setError] = useState(null)
    
    const navigate = useNavigate()

    const setCheckBoxVal = (val) => {
        console.log(val.target.checked)
        setCheckBox(val.target.checked)
    }

    axios.defaults.withCredentials = true;
    const handleSubmit = async (event) => {
        if (checked) {
            event.preventDefault()
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            await axios.post('http://localhost:3000/api/auth', formData)
                .then(result => {
                    console.log(result.data)
                    if (result.data.Status) {
                        localStorage.setItem("valid", true)
                        if (result.data.user.role === 1) {
                            localStorage.setItem("role", 1)
                            navigate('/dashboard')
                        } else if (result.data.user.role === 2) {
                            localStorage.setItem("role", 2)
                            navigate('/dashboard')
                        } else {
                            localStorage.setItem("role", 3)
                            // navigate('/home')
                        }

                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }else{
            setError('Please agree with terms & conditions')
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-50 border loginForm'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="password" name='password' placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input type="checkbox" name="tick" id="tick" className='me-2' onChange={(val) => setCheckBoxVal(val)} />
                        <label htmlFor="password">You are Agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login