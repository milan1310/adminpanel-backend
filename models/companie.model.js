const mongoose = require('mongoose');
const validator = require('validator');
const chalk = require('chalk');

const companieSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        unique:[true, 'This companie name already exist'],
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
    logo:{
        type:String,
        required:true,
        trim:true
    },
    website:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if(!validator.isURL(value,{protocols:['http','https']})){
                throw new Error(chalk.redBright('invalid URL and protocol should be https & http'));
            }
        },
    }
},{
    timestamps:true
});

companieSchema.methods.toJSON = function (){
    const companieObject = this.toObject();

    delete companieObject.__v

    return companieObject;
}


const Companie = mongoose.model('companie',companieSchema);
module.exports = Companie;