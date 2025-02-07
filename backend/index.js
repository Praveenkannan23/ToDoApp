import express from 'express';
const app = express()

app.use(express.json())

import cors from 'cors';
app.use(cors())

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/router.js';


dotenv.config()

app.use("/auth",router)

const PORT = process.env.PORT

const MongoDb = process.env.MongoDb

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(MongoDb).then(console.log("Database connected")).catch((err)=>console.log(err))
