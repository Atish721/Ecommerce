import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export async function requireSignIn(req,res,next)
{
    try {        
        const decode = await jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next()
    } catch (error) {
        console.log(`Token middleware error : ${error}`)
        res.status(500).send({
            success:false,
            message:'Error in verify token',
            error:error
        })
    }
}

export async function isAdmin(req,res,next)
{
    try {        
        const user = await userModel.findById({_id:req.user._id})
        if(user.role===1)
        {
            next()            
        }
        else
        {
            res.status(401).send({
                success:false,
                message:'Unauthorized access'
            })
        }
    } catch (error) {
        console.log(`Is admin middleware error : ${error}`)
        res.status(500).send({
            success:false,
            message:'Error in verify admin',
            error:error
        })
    }
}