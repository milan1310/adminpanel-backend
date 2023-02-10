const Employee = require('../models/employee.model');
const validator = require('validator')


exports.createNewRecord = async (req,res)=>{
    try {
        const {firstname,lastname,email,phone,companie} = req.body;
        const response = await Employee.create({firstname,lastname,email,phone,companie});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json('Something went wrong' + error);
    }
}


// Read single record
exports.readSingleRecord = async(req,res)=>{
    try {
        const email = req.body.email;
        if(validator.isEmail(email)){
            const response = await Employee.findOne({email:email})
            res.status(200).json(response);
        }else{
            res.status(401).json('Please enter valid email')
        }
    } catch (error) {
        res.status(500).json('Something went wrong' + error)
    }
}

// Read multiple records
exports.readManyRecords = async(req,res)=>{
    try {
        const emails = req.body.emails;
        console.log(emails);
        if(typeof(emails) === 'object'){
            emails.forEach(email => {
                if(!validator.isEmail(email)){
                    throw new Error('Please enter valid email')
                }
            });
            const response = await Employee.find({'email':emails});
            res.status(200).json(response);
        }else{
            res.status(400).json('Input should be in array formate')
        }
    } catch (error) {
     res.status(500).json('Something went wrong' + error)   
    }
}

// Read All records
exports.readAllRecords = async (req,res)=>{
    try {
            const response = await Employee.find({});
            res.status(200).json(response);
        
    } catch (error) {
     res.status(500).json('Something went wrong' + error)   
    }
}


// Update single record
exports.updateSingleRecord = async(req,res) =>{
    try {
        const filter = {email:req.body.email};
        const update = req.body;
        delete update.email;
        const response = await Employee.findOneAndUpdate(filter,update,{new:true});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json('Something went wrong' + error);
    }
}

// Delete one record
exports.deleteSingleRecord = async(req,res)=>{
    try {
        const filter = {email:req.body.email}

        const response = await Employee.findOneAndDelete(filter);
        res.status(200).json({
            status:"Successfully deleted the record",
            response
        })
    } catch (error) {
        res.status(500).json('Something went wrong' + error);
    }
}

exports.deleteManyRecords = async(req,res)=>{
    try {
        const emails = req.body.emails;
        if(typeof(emails) === 'object'){
            const response = await Employee.deleteMany({'email':emails});
            res.status(200).json({
                Success:"Success fully deleted following records",    
                emails,
                response
            });
        }else{
            res.status(400).json('Input should be in array formate')
        }
    } catch (error) {
     res.status(500).json('Something went wrong' + error)   
    }
    
}