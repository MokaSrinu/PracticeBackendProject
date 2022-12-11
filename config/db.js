const mongoose = require('mongoose');

const MONGOURI = 'mongodb://localhost:27017/practice';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI,{
            useNewUrlParser : true
        });
        console.log('Connected to DataBase!');
    } catch (error) {
        console.log('Connection to DataBase failed!',error);
        throw error;
    }
}

module.exports = InitiateMongoServer;