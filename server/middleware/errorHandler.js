// Middleware גלובלי לטיפול בשגיאות
const globalErrorHandler = (err, req, res, next) => {
  // אם לשגיאה יש statusCode מוגדר משתמשים בו, אחרת מחזירים 500
  const statusCode = err.statusCode || 500;

  // אם קיימת הודעת שגיאה משתמשים בה, אחרת הודעת ברירת מחדל
  const message = err.message || 'Internal Server Error';

  // הדפסת השגיאה לקונסול לצורך Debug
  console.error(`ERROR: ${message}`, err.stack);

  // החזרת תשובת JSON אחידה ללקוח
  res.status(statusCode).json({
    success: false,
    message: message,

    // מציגים Stack Trace רק בסביבת פיתוח
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// ייצוא ה-Middleware לשימוש ב-app.js
module.exports = globalErrorHandler;