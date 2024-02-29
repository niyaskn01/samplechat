const mongoose=require('mongoose')

module.exports=()=>{
  const mongoURL=process.env.MONGO_URL 
  try {
    mongoose.connect(mongoURL)
    console.log('connected with database')
  } catch (error) {
    console.log(error)
  }
}