/**************** BUILTIN IMPORTS *********/
const {ObjectID} = require('mongodb')
/**************** BUILTIN IMPORTS *********/

/**************** LOCAL IMPORTS *********/
var {mongoose} = require('../server/db/mongoose');
var {Todo} = require('../server/models/todo');
var {User} = require('../server/models/user');
/**************** LOCAL IMPORTS *********/


// Todo.remove({}).then((result)=>{
//   console.log(result)
// })



//Todo.findOneRemove
Todo.findByIdAndRemove('5a5836eee89f7b504aee7c16').then((todo)=>{
  console.log(todo)
})
