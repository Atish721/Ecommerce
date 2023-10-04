import mongoose from 'mongoose'

async function dbConnect()
{
    try {
        mongoose.set('strict',false)
        const connect = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`Mongo connected : ${connect.connection.host}`)
    } catch (error) {
        console.log(`Mongo error : ${error}`)
    }
}


export default dbConnect