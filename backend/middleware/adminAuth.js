import jwt from "jsonwebtoken"

const adminAuth = async(req,res,next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false, message:"No token: unauthorised access- Login again"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_ID + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Access denied: unauthorised access- Login again"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
    

}

export default adminAuth