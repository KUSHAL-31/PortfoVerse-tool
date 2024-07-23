const { createLogger, format, transports } = require("winston");
const { colorize, json, timestamp, combine } = format;

const logFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
    format.printf(({ level, message, timestamp }) => {
        return `${level}: ${message} : ${timestamp}`;
    })
);
// Create a Winston logger
const logger = createLogger({
    level: "info",
    format: combine(colorize(), timestamp(), json()),
    transports: [
        new transports.Console({
            format: logFormat,
        }),
        new transports.File({ filename: "app.log" }),
    ],
});

module.exports = logger;