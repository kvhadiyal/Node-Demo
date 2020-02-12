const logger = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../../logs');

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
module.exports = {
  devLogStream: logger('dev', {       
    stream: rfs('dev.log', {
      interval: '1d', // rotate daily
      path: logDirectory,
      compress: true,
    }),
    skip: (req, res) => { return res.statusCode < 400; },
  }),
  errorLogStream: logger('common', {
    stream: rfs('error.log', {
      interval: '1d', // rotate daily
      path: logDirectory,
      compress: true,
    }),
  }),
};
