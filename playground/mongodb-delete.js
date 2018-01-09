const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log(`Unable to connect to server ${err}`);
  }
  console.log('Connected to Mongo Server');
  //
  // db.collection("Todos").deleteMany({text:"Go to mess"}).then((result)=>{
  //   console.log(result)
  // })
  //
  // db.collection("Todos").deleteOne({text:"Hello world"}).then((result)=>{
  //   console.log(result)
  // })

  db.collection("Todos").findOneAndDelete({dead:false}).then((result)=>{
      console.log(result)
  });

//  db.close();
});
