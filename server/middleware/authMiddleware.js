const jwt=require('jsonwebtoken')

//generate token
module.exports.generateToken=(userID)=>{
  return jwt.sign({id:userID},'secret',{expiresIn:'30d'})
}