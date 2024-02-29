const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const db=require('./config/connect')
const userRouter=require('./routes/userRoutes')
const messageRouter=require('./routes/messageRoutes')
const conversationRouter=require('./routes/conversationRoutes')
const userModel = require('./model/userModel')
const io=require('socket.io')(9001,{
  cors:{
    origin:'*'
  }
})

let users=[]
io.on('connection',socket=>{
  console.log('user connected',socket.id) 
  socket.on('addUser',userID=>{
    const existingUser=users.find(user=>user?.userID===userID)
    if(!existingUser){
      const user={userID,socketID:socket.id}
      users.push(user)
      
    }io.emit('getUsers',users)
  })
  socket.on('sendMessage',async({senderID,recieverID,conversationID,message})=>{
    const reciever=users.find(user=>user?.userID===recieverID)
    const sender=users.find(user=>user?.userID===senderID)
    const user=await userModel.findOne({_id:senderID})
    if(reciever){
      io.to(reciever.socketID).emit('getMessage',{
        senderID,
        message,
        recieverID,
        conversationID,
        user
      })
    } 
    if(sender){
      io.to(sender.socketID).emit('getMessage',{
        senderID,
        message,
        recieverID,
        conversationID,
        user
      })
    }
  })
  socket.on('disconnect',()=>{
    users=users.filter(user => user.socketID !== socket.id)
    io.emit('getUsers',users)
  })
})
  
app.use(express.json())
app.use(cors()) 
db()  

app.get('/',(req,res)=>{ 
  res.send('api checked') 
})
 
app.use('/user',userRouter)
app.use('/message',messageRouter)
app.use('/conversation',conversationRouter)
  
const port = process.env.PORT
app.listen(port,()=>console.log('server is connect at ',port))