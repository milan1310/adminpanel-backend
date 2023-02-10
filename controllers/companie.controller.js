const Companie = require('../models/companie.model');
const multer = require('multer');
const sharp = require('sharp')
const path  = require('path');
const fs = require('fs');

const removeFileSync =  (filename)=>{
    try {
        fs.unlinkSync(path.join(__dirname,'../',filename));
        return `${filename} file deleted success fully`
    } catch (error) {
        throw new Error('Something went wrong while deleting file' + error)
    }
}

const checkImageSize = async(imagePath)=>{
    try {
        const metadata = await sharp(imagePath).metadata();
        if(metadata.width >= 100 && metadata.height >= 100){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
        console.log(error);
    }
}

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./storage/app/public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname);
    }
});

exports.upload = multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            cb(null,true)
        }else{
            return cb(new Error('Only png/jpg/jpeg files are allowed'))
        } 
    }
})

exports.viewLogo = async(req,res) =>{
    try {
        const name = req.params.name;
        const response = await Companie.findOne({name:name});
        res.send(`<img src="./storage/app/public/${response.logo}">`);
    } catch (error) {
        res.send(error)
    }
}

exports.createNewRecord = async (req,res)=>{
    try {
        const {name,email,website} = req.body;
        const logo = req.file.path;
        if (checkImageSize(path.join(__dirname,'../',logo))) {
            const response = await Companie.create({name,email,logo,website});
            res.status(200).json(response);
        } else {
           res.send.json({
            status:"fails",
            messgae:"Logo shize should be minimumu of 100x100"
           })   
        }
    } catch (error) {
        res.status(500).json('Something went wrong' + error);
    }
}


// Read single record
exports.readSingleRecord = async(req,res)=>{
    try {
        const name = req.body.name;
        const response = await Companie.findOne({name:name})
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json('Something went wrong' + error)
    }
}

// Read multiple records
exports.readManyRecords = async(req,res)=>{
    try {
        const names = req.body.names;
        if(typeof(names) === 'object'){
            const response = await Companie.find({'name':names});
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
            const response = await Companie.find({});
            res.status(200).json(response);
        
    } catch (error) {
     res.status(500).json('Something went wrong' + error)   
    }
}


// Update single record
exports.updateSingleRecord = async(req,res) =>{
    try {
        const filter = {name:req.body.name};
        const update = req.body;
        delete update.name;
        const response = await Companie.findOneAndUpdate(filter,update,{new:true});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json('Something went wrong' + error);
    }
}

// Delete one record
exports.deleteSingleRecord = async(req,res)=>{
    try {
        const filter = {name:req.body.name}

        const response = await Companie.findOneAndDelete(filter);
        const deleteFile = removeFileSync(response.logo);
        res.status(200).json({
            status:"Successfully deleted the record",
            fileDelete: deleteFile,
            response
        })
    } catch (error) {
        res.status(500).json('Something went wrong' + error);
    }
}

exports.deleteManyRecords = async(req,res)=>{
    try {
        const names = req.body.names;
        if(typeof(names) === 'object'){
            const response = await Companie.deleteMany({'name':names});
            console.log(response);
            res.status(200).json({
                Success:"Success fully deleted following records",
                names,
                response
            });
        }else{
            res.status(400).json('Input should be in array formate')
        }
    } catch (error) {
     res.status(500).json('Something went wrong' + error)   
    }
    
}