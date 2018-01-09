/**************** BUILTIN IMPORTS *********/
var express = require('express');
var bodyParser = require('body-parser');
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

app.get('/todos',(req,res)=>{

})


app.listen(3000,()=>{
  console.log('Started in port 3000');
})
