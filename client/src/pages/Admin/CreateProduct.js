import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const CreateProduct = () =>{

    const [auth,setAuth]=useAuth()
    const [categories,setCategories]=useState([])
  
    const [formData,setFormData]=useState({
        category:'',
        photo:'',
        name:'',
    })

    const handleInputChange = (e)=>{
        const {name,value,files} = e.target
     
        setFormData((prevData)=>({
            ...prevData,
            [name]:value,
            [name]:files?files[0]:'',
        }))
    }

    //Get all products
    const getAllCategories = async ()=>{
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/category/list-category`,
            {
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:auth?.token
                }
            })

            if(response.ok)
            {
                const apiResponse = await response.json()

                if(apiResponse?.success)
                {
                    setCategories(apiResponse?.data)
                }
                else
                {
                    console.log(apiResponse?.error)
                }
            }
            else
            {
                throw new Error('Network response was not ok')
            }

        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategories()
    },[])

    return (
        <Layout title={'Create Product | Atish'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <h4>Create Product</h4>
                        <div className="m-1">
                            <select className="form-select mb-3" placeholder="Select a category" size='large' onChange={handleInputChange}>
                                {categories?.map(c=>(
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary">
                                    {formData.photo ? formData.photo.name : 'Upload photo'}
                                    <input type="file" name="photo" accept="image/*" onChange={handleInputChange} hidden />
                                </label>
                                {formData.photo && (
                                    <div className="text-right mt-3">
                                        <img src={URL.createObjectURL(formData.photo)} alt='product_photo' height={'100vh'} className="img img-responsive"/>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type='text' name='name' className='form-control'  placeholder='Enter product name' onChange={handleInputChange} required/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct