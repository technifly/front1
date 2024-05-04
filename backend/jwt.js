
import jwt from 'jsonwebtoken';

export const  authmiddleware = async(req, res, next)=>{
    try{
        const at = req.headers['Authorization'];
        const token = at && at.split(' ')[1];
        if(!token){
            return res.status(400).json({err:'please use or generate token'})
        }
        const resp = await jwt.verify(token , process.env.skey);

        req.userid = resp.userid;
        next();
    }
    catch(err){
        res.status(404).json({err:'Invalid token'});
    }
};

export const generatetkn = (userdata)=>{
    return jwt.sign(userdata , process.env.skey);
}