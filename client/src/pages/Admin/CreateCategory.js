import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

//Create
const CreateCategory = () =>{
    return (
        <Layout title={'Category | Atish'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <h4>Create Category</h4>
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default CreateCategory