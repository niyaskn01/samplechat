const express=require('express')
const { registerUserController, loginUserController, getUsersController, getImageController } = require('../controller/userControllers')
const router=express.Router()
const formidable=require('express-formidable')

//register
router.post('/register',formidable(),registerUserController)

//login
router.post('/login',formidable(),loginUserController)

//get all users
router.get('/get-all/:userID',getUsersController)

//get photo
router.get('/get-photo/:userID',getImageController)


module.exports=router