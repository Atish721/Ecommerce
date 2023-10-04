
import dotenv from 'dotenv'
import express from 'express'
import dbConnect from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()

//Port
const PORT = process.env.PORT

//DB connection
dbConnect()

//Middleware
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/v1/auth/',authRoutes)


app.get('/',(req,res)=>{
    res.send({
        message:'Welcome to the Atish'
    })
})


//Start server
var server = app.listen(PORT,()=>{
    console.log(`Server is running ${process.env.NODE_ENV} mode on http://127.0.0.1:${PORT}`)
    console.log(server.address().address)
    console.log(server.address().port)
})