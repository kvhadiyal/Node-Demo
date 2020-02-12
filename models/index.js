const {
  _,
} = global;
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const utils = require('../helper/utils');
let connectionString = `mongodb://`;

if (!utils.empty(process.env.DBUSER)) {
  connectionString += `${process.env.DBUSER}:${process.env.DBPASSWORD}@`;
}

connectionString += `${process.env.DBHOST}:27017/${process.env.DATABASE}`;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(connectionString).then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.log(err)
  utils.echoLog(err.message);
});


const basename = path.basename(__filename);
const db = {
  Schema: mongoose.Schema,
};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.collection.name] = model;
  });

module.exports = db;
