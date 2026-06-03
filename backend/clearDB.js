const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const clearDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected. Dropping database...');
        
        await mongoose.connection.db.dropDatabase();
        
        console.log('Database successfully completely cleared!');
        process.exit(0);
    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
};

clearDatabase();
