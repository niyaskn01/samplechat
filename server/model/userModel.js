const mongoose=require('mongoose')
const schema=mongoose.Schema
const userSchema=new schema({
  name:{
    type:String,required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,required:true
  },
  image:{
    data:Buffer,
    ContentType:String
  },
  token:{
    type:String
  }
})

module.exports=mongoose.model('user',userSchema)