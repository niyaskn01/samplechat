import React, { useEffect, useState, useCallback, useRef } from 'react'
import { AvatarBox, ChatBox, DashboardContainer, InputBox, InputField, LogoutBox, MainBox, MessageBoxContainer, OtherMessageBox, Profile, ProfileBox, RightBox, ShowLeft, ShowRight, SideBox, UserBox, UserMessageBox, UsersBox } from '../../styles/dashboard'
import { Avatar, Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { axiosInstance, baseURL } from '../../axios/axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'

function Dashboard() {
  const theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.down('md'))
  const dummy=useRef(null)
  const navigate=useNavigate()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('userData')))
  const [socket,setSocket]=useState(null)
  const [conversations,setConversations]=useState([])
  const [show,setShow]=useState(false)
  const [showRight,setShowRight]=useState(false)
  const [convoID,setConvoID]=useState("")
  const [otherID,setOtherID]=useState('')
  const [users,setUsers]=useState([])
  const [messages,setMessages]=useState({})
  const [message,setMessage]=useState('')

  useEffect(()=>{
    setSocket(io('http://localhost:9001'))
  },[])
  // console.log(messages)
  useEffect(()=>{
    socket?.emit('addUser', user?._id)
    socket?.on('getUsers',users=>{
        console.log('thyre')
        console.log('active users :',users)
      
    })
    socket?.on('getMessage',data=>{
        setMessages(prev=>({
          ...prev,
          messages:[...prev.messages,{user:data.user,message:data.message}]
        }))
        console.log(messages) 
      })
  },[socket])
  
  useEffect(()=>{
    dummy?.current?.scrollIntoView({behaviour:'smooth'});
  },[messages.messages])

  const fetchConversations = useCallback(async () => {
    try {
        const { data } = await axiosInstance(`/conversation/get/${user?._id}`);
        
        if(data.success) {
          setConversations(data?.conversationData)
        }
      
    } catch (error) {
      console.log(error);
    }
  },[user._id]);

  //get messages
  const fetchMessage=async(conversationID,user)=>{
    try {
      const {data}=await axiosInstance(`/message/get/${conversationID}`)
      setConvoID(conversationID)
      if(data.success){
        setMessages({messages:data.conversationUserData,user:user})
      }
    } catch (error) {
      console.log(error)
    }
  }

  //send message
  const handleSendMessage=async()=>{
    const senderID=user?._id;
    const recieverID=messages?.user?._id 
    const conversationID=convoID
    socket?.emit('sendMessage',{
      senderID:user?._id,
      recieverID:messages?.user?._id,
      conversationID:convoID,
      message
    })
    try {
      const {data}=await axiosInstance.post('/message/send',{
        senderID,recieverID,conversationID,message
      })
      if(data.success){
        setMessage('')
        fetchConversations();
      }
    } catch (error) {
      console.log(error)
    }
  }

  //get all users
  const getAllUsers=useCallback(async()=>{
    try {
      const {data}=await axiosInstance(`/user/get-all/${user?._id}`)
      setUsers(data?.users)
    } catch (error) {
      console.log(error)
    }
  },[user._id])

  //userClick
  const userClick=async(user)=>{
    setOtherID(user?._id)
    let conversationID
    const existingUser=conversations.find(conversation=>conversation.user._id===user._id)
    if(existingUser){
      conversationID=existingUser.conversationID
    } else{
      conversationID=null
    }
    fetchMessage(conversationID,user)
  }

  //logout
  const handleLogout=()=>{
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }

  useEffect(()=>{
    fetchConversations();
    getAllUsers();
  },[user,fetchConversations,getAllUsers])
  return (
    <DashboardContainer>
        <ShowLeft onClick={()=>setShow(!show)}>
          {
            show?<CloseIcon/>:<ArrowForwardIosIcon/>
          }
        </ShowLeft>
      <SideBox show={show}>
        <AvatarBox>
          <Avatar sx={{height:50,width:50,marginRight:2}} 
           src={`${baseURL}/user/get-photo/${user._id}`}/>
          <Box>
            <Typography variant='h6'>{user?.name}</Typography>
            <Typography>{user?.email}</Typography>
          </Box>
        </AvatarBox>
        <Divider/>
        
          <Typography variant='h5' textAlign='center' sx={{marginTop:1}}>
            Recent Chats
          </Typography>
          {
            conversations?.length  === 0 ? 
          <Box sx={{height:'30%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Typography variant='h5' textAlign='center' sx={{marginTop:1}}>
              No Conversations found
            </Typography>
          </Box>
          :

          <UsersBox>
          {
            conversations.map(({user,conversationID})=>(
              <>
              <UserBox 
              key={`${user._id}-${Math.random()}`}
                onClick={()=>fetchMessage(conversationID,user)}
              >
                <Avatar sx={{height:50,width:50,marginRight:2}} 
                src={`${baseURL}/user/get-photo/${user._id}`}
                />
              
                  <Box>
                    <Typography variant='h6'>{user.name}</Typography>
                    <Typography>{user.email}</Typography>
                  </Box>
                
                
              </UserBox>
              <Divider/>
              </>
            ))
          }
        </UsersBox>
          }
      </SideBox>
      
      <MainBox>
      {
        messages?.user ?
        <>
        <ProfileBox>
        <Profile>
          <Avatar sx={{height:50,width:50,marginRight:2}} 
           src={`${baseURL}/user/get-photo/${messages?.user._id}`}/>
          {
            !matches ?
            <Box>
              <Typography variant='h6'
              >{messages?.user?.name}</Typography>
              <Typography
              >{messages?.user?.email}</Typography>
            </Box>
            :
            <Typography variant='h5'>
              {messages?.user?.name}
            </Typography>
          }
          
        </Profile>
        </ProfileBox>
        <ChatBox>
          {
            messages?.messages?.length > 0 ?
        <MessageBoxContainer>
          {
            messages?.messages?.map(({message,user:{_id}})=>(
              _id===user?._id ?
              ( <>
                  <UserMessageBox key={Math.random()}>
                    {message}
                  </UserMessageBox>
                  
                </>
              ):(
                <OtherMessageBox key={Math.random()}>
                  {message}
                </OtherMessageBox>
              )
            ))
          }
          <span ref={dummy}></span>
          </MessageBoxContainer>
          :
          <Box
            height='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='h6'>No messages</Typography>
          </Box>
          }
        </ChatBox>
        <InputBox>
          <InputField placeholder='type something'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            
          />
          <IconButton
            onClick={handleSendMessage}
            sx={{ marginLeft:'20px',pointerEvents: !message ? 'none' : 'auto'  }}
          >
            <SendIcon 
            sx={{ fontSize: '40px' }}
            />
          </IconButton>
        </InputBox>
        </>
        :
        <Box height='100%' 
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Typography
           variant='h5'
          >Choose to Chat</Typography>
        </Box>
      }
      </MainBox>
      <ShowRight onClick={()=>setShowRight(!showRight)}>
          {
            showRight?<CloseIcon/>:<ArrowBackIosNewIcon/>
          }
      </ShowRight>
      <LogoutBox onClick={handleLogout}>
        <LogoutIcon fontSize='large' color="error"/>
      </LogoutBox>
      <RightBox showright={showRight}>
      <Typography variant='h5' textAlign='center' sx={{marginTop:1}}>
            Users
          </Typography>
          <UsersBox >
          {
            users.map(user=>(
              <Box key={Math.random()}
                onClick={()=>userClick(user)}
              >
              <UserBox>
                <Avatar sx={{height:50,width:50,marginRight:2}} 
                 src={`${baseURL}/user/get-photo/${user._id}`}/>
                <Box>
                  <Typography variant='h6'>{user.name}</Typography>
                  <Typography>{user.email}</Typography>
                </Box>
              </UserBox>
              <Divider/>
              </Box>
            ))
          }
        </UsersBox>
      </RightBox>
    </DashboardContainer>
  )
}

export default Dashboard