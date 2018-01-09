var mongoose = require('mongoose')


var Todo = mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});

module.exports = {Todo};
//
// var newTodo = new Todo({
//   text:'    apple banana    ',
//   completedAt:1200
// })
//
// newTodo.save().then((doc)=>{
//   console.log(doc)
// },(e)=>{
//   console.log('Something went wrong')
//   console.log(JSON.stringify(e,undefined,2))
// })
