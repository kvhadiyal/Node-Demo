const {
    createLogger,
    format,
    transports,
  } = require('winston');
  
  const {
    combine,
    timestamp,
    prettyPrint,
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
        timestamp(),
        prettyPrint(),
      ),
      transports: [
        getLoogerFor(level),
      ],
    });
  }
  
  global.winston = createLoggerFor('log');
  