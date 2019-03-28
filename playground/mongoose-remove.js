const { ObjectID } = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//  console.log(result);
// });


// Todo.findOneAndRemove({ _id: '5c9ca7fb628c6fd4e92def47'}).then((todo) => {
//     console.log(todo)
// });

Todo.findByIdAndRemove('5c9ca7fb628c6fd4e92def47').then((todo) => {
    console.log(todo)
});
