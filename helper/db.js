const mongoose = require('mongoose');

module.exports= () => {
        mongoose.connect('mongodb://beratcem:beratcem99@ds255728.mlab.com:55728/heroku_sw6k24vb')
        
        mongoose.connection.on('open' ,() =>{
             console.log('MongoDB: Connected');
        });
        mongoose.connection.on('error' ,(err) =>{
            console.log('MongoDB: error',err);
       });
       mongoose.Promise = global.Promise;
    };