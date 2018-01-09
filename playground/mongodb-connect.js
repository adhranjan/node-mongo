const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log(`Unable to connect to server ${err}`);
  }
  console.log('Connected to Mongo Server');
  // db.collection('Todos').insertOne({
  //   text:"Hello world",
  //   name:"Ranjan",
  //   fucked:false,
  //   not:"falses "
  // },(err,result)=>{
  //   if(err){
  //     return console.log("failed to insert",err)
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // })

  db.collection('Users').insertOne({
    name:"Ranjan Adhikari",
    dob:"08/03/1994",
    gender:"Male",
    age:12
  },(err,result)=>{
    if(err){
      return console.log("failed")
    }
    console.log(result.ops[0]._id.getTimestamp())
    console.log(JSON.stringify(result.ops,undefined,2))
  })

  db.close();
});
