import { Box, IconButton} from "@mui/material";
import {styled} from '@mui/system'
import { colors } from "../theme";
import '@fontsource/oxygen'
import { FormTextField } from "../form";

export const DashboardContainer=styled(Box)(({theme})=>({
  display:'flex',
  height:'100vh',
  width:'100%',
  [theme.breakpoints.down]:{
    position:'relative',
    height:'100vh'
  }
}))

export const SideBox=styled(Box,{
  shouldForwardProp:prop=>prop!=='show'
})(({show,theme})=>({
  background:colors.thinBlue,
  flex:1,
  display:'flex',
  flexDirection:'column',
  [theme.breakpoints.down('md')]:{
    display:show?'block':'none',
    opacity:'0.6',
    position:'absolute',
    zIndex:100,
  }
}))

export const RightBox=styled(Box,{
  shouldForwardProp:prop=>prop!=='showright'
})(({showright,theme})=>({
  background:colors.thinBlue,
  flex:1,
  display:'flex',
  flexDirection:'column',
  [theme.breakpoints.down('md')]:{
    display:showright?'block':'none',
    opacity:'0.6',
    position:'absolute',
    right:0,
    zIndex:100,
  }
}))

export const MainBox=styled(Box)(({theme})=>({
  flex:3,
}))

export const AvatarBox=styled(Box)(()=>({
  display:'flex',
  alignItems:'center',
  padding:'20px'
}))

export const UserBox=styled(Box)(({theme})=>({
  display:'flex',
  padding:'5px 0px 5px 20px',
  marginBottom:5,
  cursor:'pointer',
  [theme.breakpoints.down('md')]:{
    postion:'absolute'
  }
}))

export const UsersBox=styled(Box)(({theme})=>({
  overflow:'scroll',
  '&::-webkit-scrollbar':{
    display:'none'
  },
  [theme.breakpoints.down('md')]:{
    postion:'relative'
  }
}))

export const ProfileBox=styled(Box)(()=>({
  width:'100%',
  display:'flex',
  justifyContent:'center',
  padding:'10px 0',
}))

export const Profile=styled(Box)(({theme})=>({
  display:'flex',
  width:'35%',
  [theme.breakpoints.down('md')]:{
    width:'40%'
  },
  padding:'0px 25px',
  background:colors.thinBlue,
  borderRadius:40,
  justifyContent:'space-between',
  alignItems:'center'
}))

export const ChatBox = styled(Box)({
  flex: 1,
  overflowY: 'scroll',
  padding: '10px',
  height:'74vh',
  '&::-webkit-scrollbar':{
    display:'none'
  }
});

export const MessageBoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const UserMessageBox=styled(Box)(()=>({
  background:colors.primary,
  padding:'10px',
  fontSize:'20px',
  color:'white',
  marginLeft:'auto',
  borderRadius:'14px 0px 14px 14px',
  marginRight:'20px',
  maxWidth:'35%',
  width:'max-content',
  fontFamily:'oxygen',
  marginBottom:5,
  height:'max-content',
  wordWrap: 'break-word'
}))

export const OtherMessageBox=styled(Box)(()=>({
  borderRadius:'0px 14px 14px 14px',
  background:colors.thinBlue,
  marginLeft:'20px',
  maxWidth:'35%',
  width:'max-content',
  padding:'10px',
  fontSize:'20px',
  fontFamily:'oxygen',
  marginBottom:5,
  height:'max-content',
  wordWrap: 'break-word'
}))

export const InputBox=styled(Box)(()=>({
  display:'flex',
  position:"sticky",
  bottom:0,
  alignItems:'center'
}))
export const InputField=styled(FormTextField)(()=>({
  marginLeft:10
}))

export const ShowLeft=styled(IconButton)(({theme})=>({
  [theme.breakpoints.up('md')]:{
    display:'none'
  },
  zIndex:150,
  position:'fixed',
  left:20,
  top:20
}))

export const ShowRight=styled(IconButton)(({theme})=>({
  [theme.breakpoints.up('md')]:{
    display:'none'
  },
  zIndex:150,
  position:'fixed',
  right:20,
  top:20
}))

export const LogoutBox=styled(IconButton)(()=>({
  position:'fixed',
  bottom:10,
  left:10,
}))
