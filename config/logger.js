var winston = require('winston');
require('winston-daily-rotate-file');
var transport = new (winston.transports.DailyRotateFile)({
    filename: './log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: 'info'
});
var logger = new (winston.createLogger)({
    transports: [
      transport
    ]
});

module.exports = {
  'logger':logger
}