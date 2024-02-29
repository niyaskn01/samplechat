const { hashPassword, comparaPassword } = require('../helper/authHelper')
const { generateToken } = require('../middleware/authMiddleware')
const userModel=require('../model/userModel')
const fs=require('fs')

//register user
const registerUserController=async(req,res)=>{
  const {name,email,password}=req.fields
  const {image}=req.files

  try {
    const existingUser=await userModel.findOne({email})

    if(existingUser) return res.send('user already exists')

    const hashedPassword=await hashPassword(password)

    const user=new userModel({
      name,email,password:hashedPassword
    }) 
    if(image){
      user.image.data=fs.readFileSync(image.path)
      user.image.ContentType=image.type
    }

    await user.save()

    res.status(200).send({
      success:true,
      message: 'User has been registered'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
}

//login user
const loginUserController=async(req,res)=>{
  const {email,password}=req.fields
  try {
    let user=await userModel.findOne({email})
    if(!user) return res.send('invalid email')

    const validUser=await comparaPassword(password,user.password)
    if(!validUser) return res.send('invalid password')

    const token=generateToken(user._id)

    user=await userModel.findByIdAndUpdate(user._id,{token},{new:true})

    res.status(200).send({
      success:true,
      message:'user logged in',
      token:user.token,
      user:{
        _id:user._id,
        name:user.name,
        email:user.email
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

//get all users
const getUsersController=async(req,res)=>{
  const {userID}=req.params
  try {
    const allusers=await userModel.find()
    const users=allusers.filter(user=>user._id.toString()!==userID.toString())
    res.status(200).send({
      success:true,
      users
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

//get image
const getImageController=async(req,res)=>{
  const {userID}=req.params
  try {
    const user=await userModel.findById(userID).select('image')
    if(user){
      res.set('Content-Type', user.image.ContentType);
      res.status(200).send(user.image.data);
    }else{
      res.send('no user found')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

module.exports={
  registerUserController,
  loginUserController,
  getUsersController,
  getImageController
}