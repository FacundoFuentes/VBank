const jwt = require('jsonwebtoken');
require('dotenv').config()

const getToken =(userInfo) => {
    return jwt.sign(userInfo,process.env.JWT_SECRET, {expiresIn: '60000'});
}

const verifyToken=(req,res,next) => {
    const token= req.headers.authorization;
    if(token){
        const onlytoken= token.slice(7,token.length);
        jwt.verify(onlytoken,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({param:"authError",msg:"Invalid Token"})
            }
            req.user= decode
            next()
            return;
        })
    } else{
        return res.status(401).send({param:"authError",msg:"Token not Found"})
    }
}
module.exports ={
    getToken,
    verifyToken
}