import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController } from '../controllers/productController.js'
import expressFormidable from 'express-formidable'

const router = express.Router()

//Create
router.post('/create-product',requireSignIn,isAdmin,expressFormidable(),createProductController)

export default router