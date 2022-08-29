var jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const StudentsBlog = require('../model/userModel');


const verifyUser =  asyncHandler(async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){

        try{
            token =  req.headers.authorization.split(" ")[1];
            console.log(token, "token")
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
                console.log(decoded, "decoded")
            req.user = await StudentsBlog.findById(decoded.id).select("-password");
            console.log(req.user, "user")
            next();
        }catch(err){
            console.log(err.message,"reereeee")
            res.status(401);
            throw new Error("Not authorized, bad token ");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }

})

module.exports = verifyUser