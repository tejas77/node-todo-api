const { ObjectID } = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id = '5c9b3a7f96daf23f141b68e611';
// ObjectID.isValid(id);
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
        
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));
var userid = '5c948313989eb02624c401ef';
User.findById(userid).then((user) => {
    if (!user) {
        return console.log('Id not found');   
    }
    console.log('user By Id', user);
}).catch((e) => console.log(e));