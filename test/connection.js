const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise;

//Connect to the database before tests run - before provided by mocha
before(function (done) {
    //connect to mongoDB
    mongoose.connect('mongodb://localhost/weplanDB');
    mongoose.connection.once('open', function () {
        console.log('connection has been made, now make some fireworks...');
        done();
    }).on('error', function (error) {
        console.log('connection error:', error);
    });
});

//Drop the characters collection before each test - beforeEach provided by mocha
// beforeEach(function(done) {
//     //Drop the collection
//     mongoose.connection.collections.users.drop(function() {
//         done(); //now we're done, tell the beforeEach.
//     });
// });