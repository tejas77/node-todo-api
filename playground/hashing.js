const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//        console.log(hash);
        
//     });
// });

var hashedPass = '$2a$10$gBAyclIkwGFu7O52/eGI6u8hsU2eZrl1mSCRUI6k7F.YaeEbIJyvO';

bcrypt.compare(password, hashedPass, (err, res) => {
    console.log(res);
});
// var salt = bcrypt.salt(10);

// var data = {
//     id: 10
// };
// var token = jwt.sign(data, '123abc');
// console.log(`token: ${token}`);

// var decoded = jwt.verify(token, '123abc');
// console.log(`decoded: `, decoded);

// var message = 'I am user 1';
// var hash = SHA256(message).toString();

// console.log('Message: ', message);

// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString(),
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();
// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
    
// } else {
//     console.log('Data was changed');
    
// }
