/**************** BUILTIN IMPORTS *********/
const _= require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
/**************** BUILTIN IMPORTS *********/

/**************** LOCAL IMPORTS *********/
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

/**************** LOCAL IMPORTS *********/

var app = express();

app.use(bodyParser.json());

app.post('/todos',(request,response)=>{
  var todo = new Todo({
    text:request.body.text
  })
  todo.save().then((doc)=>{
    response.send(doc)
  },(e)=>{
    response.status(400).send(e)
  })
})

app.get('/todos',(request,response)=>{
  Todo.find().then((todos)=>{
    response.send({todos})
  },(e)=>{
    response.status(400).send(e)
  })

})

app.get('/todos/:id',(request,response)=>{
  var id = request.params.id
  if(!ObjectID.isValid(id)){
      return response.status(400).send();
  }
  Todo.findById(id).then((todo)=>{
      response.send({todo})
  }).catch((e)=>{
    console.log(e)
  })
})


app.delete('/todos/:id',(request,response)=>{
  var id = request.params.id
  if(!ObjectID.isValid(id)){
    return response.status(400).send()
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      response.status(404).send({"message":"No Todo"})
    }else{
      response.send({todo,"message":"deleted"})
    }
  },(error)=>{
      response.status(400).send(error)
  })
})

app.patch('/todos/:id',(request,response)=>{

  var id = request.params.id
  var body = _.pick(request.body,['text','completed'])
  if(!ObjectID.isValid(id)){
    return response.status(400).send()
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime()
  }else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return response.send(404).send()
    }
    response.send({todo})
  }).catch((error)=>{
    response.status(400).send()
  })

})


app.post('/users',(request,response)=>{
  var body = _.pick(request.body,['email','password'])
  var user = new User(body)

  user.generateAuthToken().then((token)=>{
    response.header('x-auth',token).send(user);
  }).catch((error)=>{
    response.status(400).send(error)
  })
})


// var authenticate = (request,response,next) => {
//   token = request.header('x-auth');
//   User.findByToken(token).then((user)=>{
//     console.log(user)
//     if(!user){
//         return Promise.reject('No Document')
//     }
//     console.log(user)
//     request.user = user
//     request.token = token
//     next()
//   }).catch((error)=>{
//     response.status(401).send({body:error})
//   })
//
// }

app.get('/users/me',authenticate,(request,response)=>{
  response.send(request.user);
})

app.listen(3000,()=>{
  console.log('Started in port 3000');
})
