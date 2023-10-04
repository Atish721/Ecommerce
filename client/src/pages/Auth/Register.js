import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

import '../../styles/AuthStyles.css';

const Register = () =>{

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        address:'',
        password:'',
        answer:'',
      })

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {

            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });



            if(response.ok)
            {
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

    return (
        <Layout title={'Sign Up | Atish'}>
            <div className='form-container'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <input type='text' name='name' className='form-control' placeholder='Name'  value={formData.name} onChange={handleInputChange} required/>
                    </div>
                    <div className='mb-3'>
                        <input type='email' name='email' className='form-control'  placeholder='Email' value={formData.email} onChange={handleInputChange} required/>                        
                    </div>
                    <div className='mb-3'>
                        <input type='number' name='phone' className='form-control'  placeholder='Phone' maxLength={12} value={formData.phone} onChange={handleInputChange} required/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' name='address' className='form-control'  placeholder='Address' value={formData.address} onChange={handleInputChange}/>                      
                    </div>                    
                    <div className='mb-3'>
                        <input type='password' name='password' className='form-control'  placeholder='Password' value={formData.password} onChange={handleInputChange} required/>
                    </div>
                    <div className='mb-3'>
                        <input type='text' name='answer' className='form-control'  placeholder='What is your favorite sports?' value={formData.answer} onChange={handleInputChange}/>                      
                    </div>
                    
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register