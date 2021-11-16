// validation/ checking of conatct form 
const mongoose = require('mongoose');
// we use validator npm package for valiudation
const validator = require('validator');

const userScehma = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email!")
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


// create Collection  
const User = mongoose.model("User", userScehma);
module.exports = User;