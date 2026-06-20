require('dotenv').config();

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

const globalErrorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();

// הגדרות CORS מתוך משתני הסביבה
const corsOptions = {
  origin: process.env.CLIENT_URL, // כתובת ה-Frontend שמותר לה לגשת לשרת
  credentials: true, // מאפשר שליחת Cookies / הרשאות בין הלקוח לשרת
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // סוגי הבקשות המותרות
  optionsSuccessStatus: 204 // תשובה תקינה לבקשות preflight
};

// Middleware גלובלי
app.use(cors(corsOptions)); // מפעיל את הגדרות ה-CORS
app.use(express.json()); // מאפשר לשרת לקרוא JSON מהלקוח
app.use(logger); // מדפיס בקשות לקונסול

// Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Error handler — חייב להיות אחרון
app.use(globalErrorHandler);

module.exports = app;