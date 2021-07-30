const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    todotitle: {
        type: String,
    },
    status: {
        type: String,
    },
    category:{
        type: String
    }
},
   {timestamps: true});


module.exports = mongoose.model('Todo', todoSchema);