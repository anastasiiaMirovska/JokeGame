const mongoose = require('mongoose');
const app = require('./app'); // Імпортуємо app без запуску сервера

const connectDB = async () => {
    try {
        console.log("Connecting to db...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        setTimeout(connectDB, 3000);
    }
};

const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

if (require.main === module) {
    startServer(); // Запускаємо сервер тільки якщо цей файл викликається напряму
}

module.exports = { app, connectDB };
