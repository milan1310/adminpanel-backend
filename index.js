require('dotenv').config();
const express = require('express');
const chalk = require('chalk');

const app = express();

const port = process.env.PORT || 3000;

// connect database
require('./config/db')();

// setting up middle wares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static('./storage/app/public'))


// use all the routers to run
// app.use('/',require('./routers/index.router'));
app.use('/auth',require('./routers/auth.router'));
app.use('/companie',require('./routers/companie.router'));
app.use('/employee',require('./routers/employee.router'));

app.listen(port,(e)=>{
    if (e) {
        console.log(chalk.red(e + 'error occured in server starting'))
    } else {
        console.log(chalk.magenta(`server is running on ${port}`));
    }
})