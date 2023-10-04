import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css'
import { useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../../context/auth'


const Login = ()=>{

    const navigate = useNavigate()
    const location = useLocation()

    const [auth,setAuth]=useAuth()

    const [formData,setFormData]=useState({
        email:'',
        password:'',
    })

    const handleInputChange = (e)=>{
        const {name,value}=e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/login`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if(response.ok)
            {
                const apiResponse = await response.json()
                setAuth({
                    ...auth,
                    user:apiResponse.data,
                    token:apiResponse.data.token
                })

                localStorage.setItem('auth',JSON.stringify(apiResponse.data))

                navigate(location.state || '/')
            }
            else
            {
                throw new Error('Network response was not ok')
            }

        } catch (error) {
            console.log(`Register form error : ${error}`)
        }
    }

    return (
        <Layout title='Login | Atish'>
            <div className='form-container'>
                <h1>Login In</h1>
                <form onSubmit={handleSubmit}>
                  
                    <div className='mb-3'>
                        <input type='email' name='email' className='form-control'  placeholder='Email' value={formData.email} onChange={handleInputChange} required/>                        
                    </div>
               
                    <div className='mb-3'>
                        <input type='password' name='password' className='form-control'  placeholder='Password' value={formData.password} onChange={handleInputChange} required/>
                    </div>
              
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-primary' onClick={()=>{navigate('/forgot-password')}}>Forgot Password?</button>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login