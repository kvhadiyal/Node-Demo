const {
  createLogger,
  format,
  transports,
} = require('winston');

const {
  combine,
  colorize,
  simple
} = format;
require('winston-daily-rotate-file');

function getLoogerFor(level) {
  return new (transports.DailyRotateFile)({
    filename: `${process.env.NODE_ENV}-${level}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20g',
    maxFiles: '14d',
    dirname: '../logs',
    localTime: true,
  });
}

function createLoggerFor(level) {
  return createLogger({
    format: combine(
      colorize(),
      simple(),
    ),
    transports: [
      getLoogerFor(level),
      new (transports.Console)()
    ],
  });
}

global.logger = createLoggerFor('log');
