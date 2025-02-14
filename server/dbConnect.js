const mongoose = require('mongoose');

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
    const mongoURI = process.env.DB; 

    if (!mongoURI) {
        console.error("mongodb connection sucessfully");
        return;
    }

    mongoose.connect(mongoURI, connectionParams)
        .then(() => {
            console.log("Connected to database successfully");
        })
        .catch((err) => {
            console.log("Error connecting to database: ", err);
        });

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB connection disconnected");
    });
};

module.exports = dbConnect;
