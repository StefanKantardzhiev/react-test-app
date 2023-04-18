const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const authController = require('./controllers/authController')
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/auth');
const offerController = require('./controllers/offerController');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
const connectionString = 'mongodb://127.0.0.1:27017/GermanMechanics';



start();

async function start() {
    mongoose.set('strictQuery', true)
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();
    app.use(authMiddleware);
    app.use(cookieParser(cookieSecret));
    app.use(express.json());
    app.use(cors());
    // app.use(trimBody());
    // app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service active' });
    });

    // app.use('/users');
    app.use('/auth', authController)
    app.use('/offers', offerController);
   

    app.listen(3030, () => console.log('REST service started on port 3030!'));
}