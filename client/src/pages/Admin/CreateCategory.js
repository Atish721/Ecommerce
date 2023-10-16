import React,{useEffect,useState} from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import CategoryForm from "../../components/Forms/CategoryForm";

//Create
const CreateCategory = () =>{

    const [auth,setAuth]=useAuth()
    const [categories,setCategories]=useState([])
    const [formData,setFormData] = useState({
        name:'',
    })

    
    const handleInputChange = (e)=>{
        const {name,value}=e.target
 
        setFormData((prevData)=>({
             ...prevData,
             [name]:value,
        }))
     }

    // Handle Form
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try
        {
            const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/category/create-category`,{
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
                    getAllCategories()

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

                if(apiResponse.success)
                {
                    setCategories(apiResponse.data)
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
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllCategories()
    },[])

    return (
        <Layout title={'Category | Atish'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">

                        <h4>Categories</h4>

                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} formData={formData} handleInputChange={handleInputChange}/>
                        </div>

                        <div className="table-responsive w-75">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((category) => (
                                    <>
                                        <tr>
                                            <td key={category._id}>{category.name}</td>
                                            <td>
                                                <button className='btn btn-primary ms-2'  data-bs-toggle="modal" data-bs-target="#editCategoryModal">Edit</button>
                                                <button className='btn btn-danger ms-2'>Delete</button>
                                            </td>                                           
                                            
                                        </tr>
                                    </>                                           
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="modal fade" id="editCategoryModal" tabindex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="editCategoryModalLabel">Edit Category</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <CategoryForm handleSubmit={handleSubmitUpdate} formData={formDataUpdate} handleInputChange={handleInputChangeUpdate}/>
                                </div>
                              
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default CreateCategory