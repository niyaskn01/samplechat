import {styled} from '@mui/system'
import {Box, Button, TextField, Typography} from "@mui/material"
import { colors } from '../theme'
import '@fontsource/oxygen'

export const FormContainer=styled(Box)(()=>({
    background:colors.lightBlue,
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}))

export const FormTitle=styled(Typography)(({theme})=>({
  fontWeight:700,
  fontFamily:'oxygen',
  [theme.breakpoints.down('md')]:{
    fontWeight:500
  }
}))

export const FormBox=styled(Box)(({theme})=>({
  display:'flex',
  justifyContent:'center',
  background:'white',
  padding:15,
  flexDirection:'column',
  width:'30%',
  borderRadius:'10px',
  gap:15,
  [theme.breakpoints.down('md')]:{
    width:'70%'
  }
}))

export const FormTextField = styled(TextField)({
  width:'80%',
  alignSelf:'center',
  '& input': {
    fontSize: 20,
    fontWeight: 400,
    fontFamily: 'oxygen',
    padding:'10px'
  }
});

export const FormButton=styled(Button)(({theme})=>({
  background:colors.black,
  color:'white',
  '&:hover':{
    background:colors.black
  },
  alignSelf:'center',
  marginTop:5,
  width:'50%',
  [theme.breakpoints.down('md')]:{
    width:'40%',
  }
}))