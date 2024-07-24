const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const errMiddleware = require("./middlewares/error");
const dbConnection = require("./utility/db");
const cors = require("cors");
const Helmet = require("helmet");
const morganMiddleware = require("./middlewares/loggers/morgan");
const limiter = require("./middlewares/rateLimiter");

require("dotenv").config();
// Defining express middlewares

// Cors policy
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
}));

app.use(Helmet());

// API logging middleware
app.use(morganMiddleware);

// Rate limiter 
app.use('/api', limiter);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())

app.use(errMiddleware);

// Defining routes
app.use("/api/v1/user", require("./routes/user"));

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

