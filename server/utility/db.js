const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL).then((info) => {
        console.log("Mongodb connected successfully :", info.connection.host)
    }).catch((err) => {
        console.log("Error in connecting to mongodb :", err)
    })
}

module.exports = dbConnection;