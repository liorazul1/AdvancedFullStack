const rateLimit = require('express-rate-limit');

// הגבלת בקשות כללית לכל ה-API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // חלון זמן של 15 דקות
  max: 100, // מקסימום 100 בקשות מכל כתובת IP בפרק הזמן שהוגדר
  standardHeaders: true, // מחזיר מידע על מגבלת הבקשות ב-Headers המודרניים
  legacyHeaders: false, // מבטל שימוש ב-Headers הישנים של Rate Limit
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes.'
  },
});

// הגבלה מחמירה יותר עבור התחברות והרשמה
// נועד למנוע ניסיונות Brute Force על משתמשים
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // חלון זמן של 15 דקות
  max: 10, // עד 10 ניסיונות בלבד מכל IP
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.'
  },
});

module.exports = { apiLimiter, authLimiter };