const conversationModel = require('../model/conversationModel')
const messageModel=require('../model/messageModel')
const userModel = require('../model/userModel')

//create 
module.exports.createMessageController=async(req,res)=>{
  const {conversationID,senderID,recieverID,message}=req.body
  try {

   if(!conversationID){
    const newConversation=await conversationModel.create({members:[senderID,recieverID]})
    await new messageModel({
      senderID,
      conversationID:newConversation._id,
      message
    }).save()
    res.status(200).send({
      success:true
    })
    return
   }
   await new messageModel({
    conversationID,message,senderID
   }).save()

    res.status(200).send({
      success:true
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

module.exports.getMessageController=async(req,res)=>{
  const {conversationID}=req.params
  try {
    const messages=await messageModel.find({conversationID})
    const conversationUserData=await Promise.all(messages.map(async(message)=>{
      const user=await userModel.findById(message.senderID)
      return {
        user:{
          _id:user._id,
          email:user.email,
          name:user.name
        },message:message.message
      }
    }))
    res.status(200).send({
      success:true,
      conversationUserData
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}