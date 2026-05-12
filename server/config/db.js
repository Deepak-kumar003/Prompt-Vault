const mongoose = require('mongoose');
    
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to database: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`failed to connect to database: ${err.message}`);
        process.exit(1);
    }

}

module.exports = connectDB;