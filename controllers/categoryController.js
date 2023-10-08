import categoryModel from "../models/categoryModel.js"

const createCategoryController = async (req,res)=>{

    try {
        const {name}=req.body

        if(!name)
        {
            return res.status(401).send({
                success:false,
                message:'Name is required'
            })   

        }

        const isExist = await categoryModel.findOne({name:name})

        if(isExist)
        {
            return res.status(200).send({
                success:false,
                message:'Category already exist'
            })  
        }

        const slugName = name.replace(/\s+/g, '-').toLowerCase()
        const category = await new categoryModel({name:name,slug:slugName}).save()

        res.status(201).send({
            success:true,
            message:'New category created',
            data:category 
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in category create',
            error:error
        })
    }
    
}

//Update
const updateCategoryController = async (req,res) =>{
    try
    {
        const {name}=req.body
        const {id}=req.params

        const slugName = name.replace(/\s+/g, '-').toLowerCase()
        const category = await categoryModel.findByIdAndUpdate(id,{name:name,slug:slugName,new:true})


        res.status(201).send({
            success:true,
            message:'Category updated',
            data:category 
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:'Error in category update',
            error:error
        })
    }
}

//Get all 
const getAllCategoriesController = async (req,res)=>{

    try{
        const categories = await categoryModel.find({}).select({'name':1,'_id':1})

        res.status(201).send({
            success:true,
            message:'Categories list',
            data:categories,
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:'Error in get all categories',
            error:error,
        })
    }
}

//Get 
const getCategoriesController = async (req,res)=>{
    try{
        const {slug} = req.params
        const category = await categoryModel.findOne({slug:slug},{name:1,slug:1})

        res.status(201).send({
            success:true,
            message:'Get category',
            data:category,
        })

    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:'Error in get category',
            error:error,
        })
    }
}

//Delete
const deleteCategoryController = async (req,res)=>{
    try
    {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)

        res.status(201).send({
            success:true,
            message:'Category deleted successfully',
            data:true,
        })
    }
    catch(error)
    {
        res.status(500).send({
            success:false,
            message:'Error in delete category',
            error:error,
        })
    }
}

export {createCategoryController,updateCategoryController,getAllCategoriesController,getCategoriesController,deleteCategoryController}