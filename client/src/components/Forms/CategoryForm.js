import React, { useState } from "react";

const CategoryForm = ({handleSubmit,formData,handleInputChange})=>{

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">                    
                    <input type="text" name="name" className="form-control" placeholder="Enter category name" value={formData.name} onChange={handleInputChange}/>
                </div>
              
              
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </>
    )
}

export default CategoryForm