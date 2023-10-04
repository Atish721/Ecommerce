import userModel from '../models/userModel.js'
import {hashPassword,comparePassword} from '../helpers/authHelper.js'
import jwt from 'jsonwebtoken'

export async function registerController(req,res)
{
    try {
        console.log('Request body',req.body)
        const {name,email, phone, password, address,answer} = req.body

        if(!name)
        {
            return res.send({error:'Name is required'})
        }
        if(!email)
        {
            return res.send({error:'Email is required'})
        }
        if(!phone)
        {
            return res.send({error:'Phone is required'})
        }
        if(!password)
        {
            return res.send({error:'Password is required'})
        }
        if(!answer)
        {
            return res.send({error:'Answer is required'})
        }
    
        const existingUser = await userModel.findOne({email:email},{email:1,_id:0})

        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Email already exists',
                data:existingUser
            })   
        }

        const hashedPassword = await hashPassword(password)

        const user = await userModel.create({name:name,email:email,phone:phone,address:address,password:hashedPassword,answer:answer})

        res.status(201).send({
            success:true,
            message:'Register successful',
            data:user 
        })


    } catch (error) {
        console.log(`Registration error : ${error}`)
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error:error
        })
    }
}


export async function loginController(req,res)
{
    try {
        const {email,password}=req.body

        if(!email || !password)
        {
            return res.status(501).send({
                success:false,
                message:'Invalid email or password'
            })   

        }

        const user = await userModel.findOne({email:email},{password:1,name:1,_id:1,email:1,phone:1,address:1})//,{password,_id,name,email,phone,address}

        if(!user)
        {
            return res.status(501).send({
                success:false,
                message:'Invalid email or password'
            })   
        }

        const match = await comparePassword(password,user.password)

        if(!match)
        {
            return res.status(501).send({
                success:false,
                message:'Invalid email or password'
            })   
        }

        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.status(200).send({
            success:true,
            message:'Login successfully',
            data:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                token:token,
            }
        })

    } catch (error) {
        console.log(`Login error : ${error}`)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error:error
        })
    }
}

export async function forgotController(req,res)
{
    try {
        const {email,answer,newPasword} = req.body
        if(!email)
        {
            res.status(400).send({message:'Email is required'})
        }
        if(!answer)
        {
            res.status(400).send({message:'Answer is required'})
        }
        if(!newPasword)
        {
            res.status(400).send({message:'New password is required'})
        }
        
        const user = await userModel.findOne({email:email,answer:answer})
        if(!user)
        {
            return res.status(400).send({success:false,message:'Email or Answare are invalid'})
        }

        const hashed = await hashPassword(newPasword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})

        res.status(200).send({success:true,message:'Password reset successfully.'})

    } catch (error) {
        console.log(`Forget password error : ${error}`)
        res.status(500).send({
            success:false,
            message:'Error in forgot password',
            error:error
        })
    }
}

export async function testTokenController(req,res)
{
    res.send({message:'Auth test'})
    console.log(`Auth is valid`)
}