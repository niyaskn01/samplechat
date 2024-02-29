const express=require('express')
const { registerUserController, loginUserController } = require('../controller/userControllers')
const { createConversationController, getConversationController } = require('../controller/conversationController')
const router=express.Router()

//create
router.post('/create',createConversationController)

//get
router.get('/get/:userID',getConversationController)


module.exports=router