import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {createCategoryController,updateCategoryController,getAllCategoriesController,getCategoriesController,deleteCategoryController} from '../controllers/categoryController.js'

const router = express.Router()

//Create
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//Update
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//Category list
router.get('/list-category',requireSignIn,isAdmin,getAllCategoriesController)

//Get category
router.get('/get-category/:slug',requireSignIn,isAdmin,getCategoriesController)

//Delete
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router