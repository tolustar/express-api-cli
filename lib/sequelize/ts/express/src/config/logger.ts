import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

class Logger {
  /**
   * Logger handles all logs in the application
   */
  static logger = winston.createLogger({
    format: format.combine(format.timestamp(), format.simple()),
    transports: [
      new winston.transports.File({
        filename: 'logs/server/error.log',
        level: 'error',
        handleExceptions: true
      }),
      new winston.transports.File({
        filename: 'logs/server/all.log',
        level: 'info',
        handleExceptions: true
      }),
      new winston.transports.DailyRotateFile({
        maxFiles: '14d',
        level: 'info',
        dirname: 'logs/server/daily',
        datePattern: 'YYYY-MM-DD',
        filename: '%DATE%.log'
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true
      })
    ]
  });

  static logStream = {
    /**
     * A writable stream for winston logger.
     *
     * @param {any} message
     */
    write(message) {
      /**
       * morganLogger logs all http request in a dedicated file and on console
       */
      const morganLogger = winston.createLogger({
        format: format.combine(format.simple()),
        transports: [
          new winston.transports.File({
            filename: 'logs/requests/all.log',
            level: 'debug',
            handleExceptions: true
          }),
          new winston.transports.Console({
            level: 'debug',
            handleExceptions: true
          }),
          new winston.transports.DailyRotateFile({
            maxFiles: '14d',
            level: 'info',
            dirname: 'logs/requests/daily',
            datePattern: 'YYYY-MM-DD',
            filename: '%DATE%.log'
          })
        ]
      });
      morganLogger.info(message.toString());
    }
  };
}

export default Logger;
