import productModel from '../models/productModel.js'
import fs from 'fs'

const createProductController = async (req,res)=>{
    try
    {
        

        const { name, description,price,category,quantity,shipping} =req.fields
        const { photo} =req.files
        
 
        //Validation 
        switch(true)
        {
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})
            case !category:
                return res.status(500).send({error:'Category is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case !photo && photo.size>100000:
                return res.status(500).send({error:'Photo is required and should be less than 1mb'})
        }

        const slugName = name.replace(/\s+/g, '-').toLowerCase()

        const product = new productModel({
            name: name,
            slug: slugName,
            description: description,
            price: price,
            category: category,
            quantity: quantity,
        })

        if(photo)
        {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type

        }

        await product.save()

        res.status(201).send({
            success:true,
            message:'Product created successfully',
            data:product,
        })
    }
    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in create product',
            error:error,
        })
    }
}

export {createProductController}