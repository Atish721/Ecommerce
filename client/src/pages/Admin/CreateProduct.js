import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const CreateProduct = () =>{

    const [auth,setAuth]=useAuth()
    const [categories,setCategories]=useState([])
    const navigate = useNavigate()
  
    const [formData,setFormData]=useState({
        category:'',
        photo:'',
        name:'',
        description:'',
        price:'',
        quantity:'',
        shipping:'',
    })

    const handleInputChange = (e)=>{
        const {name,value,files} = e.target
     
        setFormData((prevData)=>({
            ...prevData,
            [name]:files?files[0]:value
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

    //Create product
    const handleSubmitProdcut = async (e)=>{
        e.preventDefault()
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/product/create-product`,{
                method:'POST',                             
                headers:{
                    'Content-Type': 'application/json',
                    Authorization:auth?.token,
                },
                body: JSON.stringify(formData)
            })

            if(response.ok)
            {
                const apiResponse = await response.json()
                if(apiResponse.success)
                {
                    console.log(apiResponse.message)
                    navigate('/dashobard/admin/products')
                }
                else
                {
                    console.log(apiResponse.error)
                }
            }
            else
            {
                throw new Error('Network response was not ok') 
            }
        }
        catch(error)
        {
            console.log(`Category error: ${error}`)
        }
    }

    return (
        <Layout title={'Create Product | Atish'}>
            <div className='container-fluid m-3 p-3 dashboard'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <h4>Create Product</h4>
                        <div className="m-1 w-75">
                            <div className="mb-3">
                                <select className="form-select" name="category" placeholder="Select a category" size='large' onChange={handleInputChange}>
                                    <option value={'0'}>--Select--</option>

                                    {categories?.map(category=>(                                    
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
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
                                <input type='text' name='name' defaultValue={formData.name} className='form-control'  placeholder='Enter product name' onChange={handleInputChange} required/>
                            </div>
                            <div className="mb-3">
                              <textarea type="text"  name='description' defaultValue={formData.description} placeholder="Enter description" className="form-control" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="number" name="price" min='0.01' defaultValue={formData.price} placeholder="Enter price" className="form-control" onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="number" name='quantity'  placeholder="Enter quantity" defaultValue={formData.quantity} className="form-control" onChange={handleInputChange} min='1'/>
                            </div>

                            <div className="mb-3">
                                <select className="form-select" defaultValue={1} name="shipping" placeholder="Select shipping" size='large' onChange={handleInputChange}>
                                    <option key={0} value={0}>No</option>
                                    <option key={1} value={1}>Yes</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleSubmitProdcut}>
                                CREATE PRODUCT
                                </button>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct