import winston from 'winston';

// Set up the Winston logger
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),  // Log to the console
    new winston.transports.File({ filename: 'logs/app.log' })  // Log to a file
  ]
});

// Example logging functions
export const logInfo = (message: string) => {
  logger.info(message);
};

export const logError = (message: string) => {
  logger.error(message);
};

export const logWarn = (message: string) => {
  logger.warn(message);
};

export const logDebug = (message: string) => {
  logger.debug(message);
};

// Optionally, you can configure log level dynamically through environment variables
if (process.env.NODE_ENV === 'production') {
  logger.level = 'warn';  // In production, only warn and error logs will be shown
} else {
  logger.level = 'debug';  // In development, debug and info will be available
}
