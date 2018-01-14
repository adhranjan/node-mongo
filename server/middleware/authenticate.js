var {User} = require('./../models/user');

var authenticate = (request,response,next) => {
  token = request.header('x-auth');
  User.findByToken(token).then((user)=>{

    if(!user){
        return Promise.reject('No Document')
    }
    request.user = user
    request.token = token
    next()
  }).catch((error)=>{
    response.status(401).send({body:error})
  })
}

module.exports = {authenticate}
