const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


var UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid Email'
    }
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString()

  user.tokens.push({access,token})

  return user.save().then(()=>{
    return token
  });
}

UserSchema.statics.findByToken = function(token) {
  var User = this
  var decoded;
  try{

    decoded = jwt.verify(token,'abc123')
  }catch(e){
    return Promise.reject('Token Mistatch');
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
};


UserSchema.pre('save',function(next){
  var user = this

  if(user.isModified('password')){

    bcrypt.genSalt(10,(error,salt)=>{
      bcrypt.hash(user.password,salt,(error,hash)=>{
        user.password = hash
        next()
      })
    })

  }else{
    next()
  }



})

var User = mongoose.model('Users',UserSchema)

module.exports = {User}
