const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log(`Unable to connect to server ${err}`);
  }
  console.log('Connected to Mongo Server');

  db.collection('Todos').find({age:12}).count().then((count)=>{
    console.log(`Todo count: ${count}`)
  },(err)=>{
    console.log("failed to fetch",err)
  });

  db.close();
});
