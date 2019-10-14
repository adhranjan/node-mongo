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
},{
  usePushEach: true
});

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

/*
* Add token in user list
*/
UserSchema.methods.addToken = function(token){
  var user = this

  return user.update({
    $push:{
      tokens:{token}
    }
  });
}



UserSchema.methods.removeToken = function(token){
  var user = this

  return user.update({
    $pull:{
      tokens:{token}
    }
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



UserSchema.statics.findByCredentials = function(email,password){
  var user = this
  return user.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject('Not Registered, Try registration first')
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password, user.password, function(error, result) {
          if(!result){
            reject('Not Match')
          }else{
            resolve(user)
          }

      });
    });
  })

}



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
