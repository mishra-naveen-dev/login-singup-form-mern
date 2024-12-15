const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI, {
            useNewUrlParser: true, // Enables the new connection string parser.
            useUnifiedTopology: true, // Ensures compatibility with MongoDB's server discovery and monitoring engine.
        }
        );
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to database!", error.message);
    }
};


module.exports = dbConnect;
