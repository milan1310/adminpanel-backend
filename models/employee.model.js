const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        trim: true,
        lowercase:true
    },
    lastname:{
        type:String,
        required: true,
        trim: true,
        lowercase:true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, 'this email already exist'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        },
    },
    phone:{
        type:Number,
        required:true,
        trim:true
    },
    companie:{
        type:String,
        required:true
    }
},{timestamps:true});



const Employee = mongoose.model('employee',employeeSchema);

module.exports = Employee;