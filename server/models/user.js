var mongoose = require('mongoose');
var User = mongoose.model('User', {
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    },
});
module.exports = {User};
// var newUser = new User({
//     email: 'tejas@gmail.com',
// });

// newUser.save().then((doc) => {
//     console.log('Saved user', doc);
// }, (e) => {
//     console.log('Unable to save user', e);
    
// });