const mongoose = require('mongoose');
require('dotenv').config();

const setupTestDB = () => {
    beforeAll(async () => {
        const mongoUri = 'mongodb://user:user@localhost:27018/my_database?authSource=admin';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            retryWrites: false,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        // Clear all collections before each test
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany();
        }
    });
};

module.exports = setupTestDB;