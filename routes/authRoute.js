import express from 'express'
import {loginController, registerController, testTokenController,forgotController} from '../controllers/authController.js'
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/test/token',requireSignIn,isAdmin,testTokenController)
router.post('/forgot-password',forgotController)

//Protected User route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(201).send({ok:true})
}) 

//Protected Admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(201).send({ok:true})
}) 

export default router