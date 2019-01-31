// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');
  // deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  // deleteMany
  // db.collection('Users').deleteMany({ name: 'Tejas'}).then((result) => {
  //   console.log(result);
  // });
  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'Eat Lunch'}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete
    // db.collection('Users').findOneAndDelete({ _id: new ObjectID("5c1a041493e1ae0c385777de") }).then((result) => {
    //   console.log(result);
    // });
  client.close();
});
