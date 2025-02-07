import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
    const token = req.header.authorization?.split("")[1]

    if(!token){
        return res.status(401).json({msg:"token Not Found"}) 
    }
    try{
        const decoded = jwt.verify(token,"kannan")
        req.user=decoded
        next()
    }catch(error)
    {
        console.log(error)
        return res.status(400).json({msg:"Invalid token"})
        
    }
}