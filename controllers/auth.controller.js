const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const chalk = require('chalk');


exports.login= async(req,res)=>{
    try {
        const user = await User.findByCredentials(
          req.body.email,
          req.body.password
        );
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
      } catch (error) {
        res.status(500).send("There are problem in server :" + error);
      }
}

exports.auth = async (req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SCRETE);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user){  
            throw new Error(chalk.red("Invalid User"))
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send("Please authanticate..."+error)
    }
}