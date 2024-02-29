const express=require('express')
const { createMessageController, getMessageController } = require('../controller/messageController')
const router=express.Router()

//send message
router.post('/send',createMessageController)

//get messages
router.get('/get/:conversationID',getMessageController)

module.exports=router