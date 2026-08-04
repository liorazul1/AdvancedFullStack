require('dotenv').config();

const express = require('express');
const cors = require('cors');

const helmet = require('helmet');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');

const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');

const globalErrorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const path = require('path');

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

// מאפשר הצגת תמונות מהשרת כאשר ה-Frontend וה-Backend רצים ב-Origins שונים
// נדרש עבור טעינת תמונות שהועלו באמצעות Multer
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
  })
);

app.use('/api', apiLimiter); // מגביל כמות בקשות לכל נתיבי ה-API
app.use('/api/auth/login', authLimiter); // מגביל ניסיונות התחברות
app.use('/api/auth/register', authLimiter); // מגביל ניסיונות הרשמה
app.use(express.json()); // מאפשר לשרת לקרוא JSON מהלקוח

// מאפשר גישה לתמונות שהועלו דרך Multer
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

app.use(logger); // מדפיס בקשות לקונסול

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handler — חייב להיות אחרון
app.use(globalErrorHandler);

module.exports = app;