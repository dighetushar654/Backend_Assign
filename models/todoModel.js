const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = require("mongoose");


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
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
   {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);