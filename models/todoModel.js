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
    User: {type: Schema.Types.ObjectId, ref: "User"}
},
   {timestamps: true});

const userSchema = new mongoose.Schema({
    Username: {
        type: String
    },
    email: {
        type:String,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
    },
    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    role: {
        type: String,
    },
    todolist: [{
        type: Schema.Types.ObjectId, ref: "Todo"
    }]
},
{timestamps: true});


module.exports = mongoose.model('Todo', todoSchema);
module.exports = mongoose.model('User', userSchema);