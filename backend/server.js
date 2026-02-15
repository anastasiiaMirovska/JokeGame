import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config.js';
import { jokesService } from './services/jokes.service.js';

const connectDB = async (retries = 10) => {
    try {
        console.log("Connecting to db...");
        // Використовуй або config.database.mongoUrl, або process.env.MONGO_URI (вибери щось одне)
        await mongoose.connect(config.database.mongoUrl || process.env.MONGO_URI);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        if (retries === 0) throw new Error('Could not connect to database');
        console.log("Retrying in 3 seconds...");
        await new Promise(res => setTimeout(res, 3000));
        return connectDB(retries - 1);
    }
};

const start = async () => {
    try {
        await connectDB();
        const port = config.app.port || process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`🚀 Server listening on port ${port}`);
            // Запускаємо фонову задачу тільки тут!
            jokesService.addJokes(5);
        });
    } catch (e) {
        console.error('Fatal: Server failed to start:', e);
        process.exit(1);
    }
};

start();