
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect using the environment variable
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // Exit the application with a failure code if DB connection fails
        process.exit(1); 
    }
};

module.exports = connectDB;



