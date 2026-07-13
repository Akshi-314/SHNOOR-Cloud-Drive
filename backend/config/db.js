console.log("DB FILE LOADED");
const mongoose = require("mongoose");

console.log("MONGO URI:",process.env.MONGO_URI);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed");
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;