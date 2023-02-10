const chalk = require('chalk');
const mongoose = require('mongoose');
const User = require('../models/user.model')

const options = {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  };
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI,options).then((res)=>{
        console.log(chalk.blue("Database connected with collection:= ") + chalk.white(res.connection.db.namespace));
    }).catch(e => console.log(chalk.red(e)));


const seedUser = {
    email: 'admin@admin.com',
    password: 'password'
}

const seedDB = async () => {
    await User.create(seedUser);
}

seedDB().then(() => {
    console.log(chalk.blueBright('database seeding completed'));
    mongoose.connection.close();
}).catch(e => console.log(chalk.redBright('error in databse seeding ' + e)));