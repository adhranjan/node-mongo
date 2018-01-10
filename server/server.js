/**************** BUILTIN IMPORTS *********/
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')
/**************** BUILTIN IMPORTS *********/

/**************** LOCAL IMPORTS *********/
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');
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
    response.send({
      todos
    })
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
    console.log(1)
  })
})



app.listen(3000,()=>{
  console.log('Started in port 3000');
})
