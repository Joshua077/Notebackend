const asyncHandler = require('express-async-handler');
const { generateToken } = require('../helpers/webToken');
const StudentsBlog = require('../model/userModel');



const registerController = asyncHandler(async(req,res)=>{
    const {name, email, password, pic} = req.body
    const Existing =  await StudentsBlog.findOne({ email})
    
    if (Existing){
     return   res.status(400).json({message:"user already exists"})
        
    }

    const newUser = await StudentsBlog.create({
        name,
        email,
        password,
        pic,
       

    })
 
    if(!newUser){
       return res.status(400).json({message:"user not created"})
    }
   return  res.json({
        name,
        email,
        password : newUser.password,
        token : generateToken(newUser._id),
        isAdmin : newUser.isAdmin,
        id: newUser._id,
        pic : newUser.pic
       
    })
})


const loginController = asyncHandler( async(req, res) =>{
    const {email, password} = req.body
    const existingUser = await StudentsBlog.findOne({ email})
   if(existingUser && ( await existingUser.comparePassword(password))){
res.status(200).json({
    name: existingUser.name,
    email,
    password : existingUser.password,
    token : generateToken(existingUser._id),
    isAdmin : existingUser.isAdmin,
    id: existingUser._id,
    pic : existingUser.pic
   
})
   }
   else{
    res.status(400)
    throw new Error ('Invalid username or password provided')
   }
})
module.exports ={
    registerController,
    loginController,
}