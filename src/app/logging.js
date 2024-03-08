import winston from 'winston';

// @variable {logger} - Inisialisasi logger menggunakan winston
export const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [ new winston.transports.Console({}) ]
});