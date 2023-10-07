import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'


const ForgotPassword = ()=>{
     
    const navigate = useNavigate()

    const [formData,setFormData]=useState({
        email:'',
        answer:'',
        newPassword:'',
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
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if(response.ok)
            {
                const apiResponse = await response.json()
                
                navigate('/login')
            }
            else
            {
                throw new Error('Network response was not ok')
            }

        } catch (error) {
            console.log(`Register form error : ${error}`)
        }
    }

    return(
        <Layout title={'Forgot Password | Atish'}>
            <div className='form-container'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                  
                    <div className='mb-3'>
                        <input type='email' name='email' className='form-control' placeholder='Email' value={formData.email} onChange={handleInputChange} required/>
                    </div>         
                    <div className='mb-3'>
                        <input type='text' name='answer' className='form-control' placeholder='Your favorite sports' value={formData.answer} onChange={handleInputChange} required/>
                    </div>               

                    <div className='mb-3'>
                        <input type='password' name='newPassword' className='form-control'  placeholder='New Password' value={formData.newPassword} onChange={handleInputChange} required/>
                    </div>

                    {/* <div className='mb-3'>
                        <input type='password' name='password' className='form-control' placeholder='Your favorite sports' value={formData.answer} onChange={handleInputChange} required/>
                    </div>     */}
                  
                    <button type='submit' className='btn btn-primary'>Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword