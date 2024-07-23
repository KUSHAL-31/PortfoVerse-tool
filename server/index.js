const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const path = require("path");
const errMiddleware = require("./middlewares/error");
const dbConnection = require("./utility/db");

require("dotenv").config();
// Defining express middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.use(errMiddleware);

//handling uncaught error
process.on("uncaughtException", (err) => {
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to uncaught error");
    process.exit(1);
})

// Cloudinary initialization

dbConnection();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
})


//unhandled promise rejection
process.on("unhandledRejection", err => {
    console.log("Error: ", err.message);
    console.log("Shutting down the server due to unhandled promisse rejection");

    server.close(() => {
        process.exit(1);
    })
})

