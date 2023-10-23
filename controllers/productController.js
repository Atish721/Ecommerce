import { error } from 'console'
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
            shipping:shipping,
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

//Get all product
const getAllProductsController = async (req,res)=>{
    try
    {
        const products = await productModel.find({}).populate('category').select({'photo':0}).limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:'Products found',
            data:products,
            countTotal:products.length
        })

    }catch(error)
    {
        res.status(500).send({
            success:false,
            message:'Error in get all products',
            error:error,
        })
    }
}

//Get product
const getProductController = async (req,res)=>{
    try
    {
        const product = await productModel.findOne({slug:req.params.slug}).select({'photo':0}).populate('category') 
        res.status(200).send({
            success:true,
            message:'Product found',
            data:product,
        })

    }catch(error)
    {
        res.status(500).send({
            success:false,
            message:'Error in get product',
            error:error,
        })
    }
}

//Get product's photo by product id
const getProductPhotoController = async (req,res)=>{
    try{
        const productId = req.params.pid
        const product = await productModel.findById(productId).select({'photo':1})

        if(product.photo.data)
        {
            res.set('Content-Type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in get product photo',
            error:error,
        })
    }
}

//Delete product
const deleteProductController = async (req,res)=>{
    try{
        const productId = req.params.pid
        await productModel.findByIdAndDelete(productId).select({'photo':0})

        res.status(200).send({
            success:true,
            message:'Product deleted successfully',
            data:true,
        })

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:'Error in delete product photo',
            error:error,
        })
    }
}

export {createProductController,getAllProductsController,getProductController,getProductPhotoController,deleteProductController}