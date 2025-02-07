import express from 'express';
import { userSaveData } from '../controller/Userdetails.js';


const router = express.Router();

router.post("/userSaveData",userSaveData)

export default router