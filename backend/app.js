import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from './config.js';
import indexRouter from './routes/index.js';
// import healthRouter from './routes/health.js';
import jokesRouter from './routes/jokes.js';
import { fetchMultipleJokes } from './services/jokeService.js';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
    origin: function(origin, callback){
        // allow localhost and Docker frontend requests
        if(!origin || origin.includes('localhost') || origin.includes('web')){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

app.use(cors(corsOptions));

app.use('/', indexRouter);
// app.use('/health', healthRouter);
app.get('/health', (req, res) => res.sendStatus(200));
app.use('/api/joke', jokesRouter);


const connectDB = async (retries=10) => {
    try {
        console.log("Connecting to db...");
        await mongoose.connect(config.database.mongoUrl);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        if (retries === 0){
            throw new Error('Could not connect to database')
        }
        console.log("Retrying...");
        await new Promise(res => setTimeout(res, 3000));
        return connectDB(retries-1)
    }
};

const start = async () => {
    try {
        await connectDB()
        await app.listen(config.app.port, config.app.host)
        console.log(`Server listening on ${config.app.port} `)
        fetchMultipleJokes(1);
    } catch (e) {
        console.error('Server failed:', err);
        process.exit(1);
    }
}

start();


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
