import React, { useState } from 'react'
import { FormBox, FormButton, FormContainer, FormTextField, FormTitle } from '../../styles/form'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axios/axios'
import toast, { Toaster } from 'react-hot-toast'

const formData=new FormData()
function Form({isSignIn}) {
  let userData
  const [inputData,setInputData]=useState({
    ...(!isSignIn && {name:''}),
    email:'',
    password:''
  })
  
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const {name,value,type,files}=e.target
    
    if(type==='file'){
      formData.append(name,files[0])
    }else{
      formData.append(name, value)
    }
    
  }

  const handleClick=async(e)=>{
    e.preventDefault()
      userData=Object.fromEntries(formData)
      if(!isSignIn && !userData.name) return toast.error('name is required')
      if(!userData.email) return toast.error('email is required')
      if(!userData.email.includes('@gmail.com')) return toast.error('enter valid email')
      if(!userData.password) return toast.error('password is required')
      if(!isSignIn && userData.password.length <6) return toast.error('password must be at least 6 characters long')
    try {
      const config={
        headers:{
          "Content-Type":"multipart/form-data"
          }
          }
      const {data} = await axiosInstance.post(`/user/${isSignIn ? 'login':'register'}`,userData,config)
     console.log(data)
      if(data.success && data.token){
      localStorage.setItem('userToken',data.token)
      localStorage.setItem('userData',JSON.stringify(data.user))
      navigate('/')
      toast.success(data.message)
     }else if(!data.token && data.success){
      navigate('/login')
      setTimeout(() => {
        toast.success(data.message)
      }, 300);
     }else{
      toast.error(data)
     }
     
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <FormContainer>
      <Toaster/>
      <FormBox>
        <FormTitle textAlign='center' variant="h4">
          {isSignIn ?'Welcome Back!!':'Welcome!!'}
        </FormTitle>
        {
          !isSignIn &&
          <FormTextField 
          variant='standard' 
          name='name'
          placeholder='enter username'
          onChange={handleChange}
          />
        }
        <FormTextField 
          variant='standard' 
          placeholder='enter email'
          name='email'
          type='email'
          onChange={handleChange}
          />
        <FormTextField 
          variant='standard' 
          placeholder='enter password'
          name='password'
          type='password'
          onChange={handleChange}
          />
          {
            !isSignIn &&
            <FormTextField 
            variant='standard' 
            name='image'
            type='file'
            // placeholder='enter username'
            onChange={handleChange}
            // onChange={(e)=>setImage(e.target.files[0])}
            />
          }
        <Typography 
        textAlign='center'
        variant='subtitle1' >{isSignIn ? "Don't have an account?" : "Have an account?"}
          <Link 
          to={isSignIn ? '/register' : '/login'}
          >{isSignIn ? 'register now':'login'}</Link>
        </Typography>
        <FormButton
          onClick={handleClick}
        >
          {isSignIn ? 'Sign In':'Sign up'}
        </FormButton>
      </FormBox>
    </FormContainer>
  )
}

export default Form