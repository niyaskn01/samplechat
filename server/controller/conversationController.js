const conversationModel=require('../model/conversationModel')
const userModel = require('../model/userModel')

//create
module.exports.createConversationController=async(req,res)=>{
  const {senderID,recieverID}=req.body
  try {
    await conversationModel.create({members:[senderID,recieverID]})
    res.status(200).send({
      success:true,
      message:'new conversation created'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

//get all conversations
module.exports.getConversationController=async(req,res)=>{
  const {userID}=req.params
  try {
    const conversations=await conversationModel.find({members:{$in:userID}}).sort({updatedAt:-1})
    const conversationData=await Promise.all(conversations.map(async(conversation)=>{
      const recieverID=await conversation.members.filter((member)=>member!==userID)
    const userInfo= await userModel.findById(recieverID)

    return {
      user:{
        _id:userInfo._id,
        email:userInfo.email,
        name:userInfo.name
      },
      conversationID:conversation._id
    }
    }))
    res.status(200).send({
      success:true,
      conversationData
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}
