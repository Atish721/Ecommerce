import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController,deleteProductController,getAllProductsController, getProductController, getProductPhotoController } from '../controllers/productController.js'
import expressFormidable from 'express-formidable'

const router = express.Router()

//Create
router.post('/create-product',requireSignIn,isAdmin,expressFormidable(),createProductController)

//Get all
router.get('/get-all-products',getAllProductsController)

//Get single
router.get('/get-product/:slug',getProductController)

//Get photo
router.get('/get-product-photo/:pid',getProductPhotoController)

//Delete
router.delete('/delete-product/:pid',deleteProductController)

export default router