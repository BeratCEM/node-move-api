const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DirectorSchema = new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:20
    },
    surname:{
        type:String,
        minlength:3,
        maxlength:20
    },
    bio: {
        type:String,
        minlength:10,
        maxlength:1000
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);
