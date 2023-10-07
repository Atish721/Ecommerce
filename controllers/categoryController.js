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

        const slugName = name.replace(/\s+/g, '-').toLowerCase();
        const category = await new categoryModel({name:name,slug:slugName}).save()

        res.status(201).send({
            success:true,
            message:'New category created',
            data:category 
        })

    } catch (error) {
        console.log(`Category error : ${error}`)
        res.status(500).send({
            success:false,
            message:'Error in category',
            error:error
        })
    }
    
}

export default createCategoryController