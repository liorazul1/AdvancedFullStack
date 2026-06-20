// Middleware גלובלי לטיפול בשגיאות
const errorHandler = (err, req, res, next) => {

  // אם הוגדר קוד שגיאה - משתמשים בו
  // אחרת מחזירים 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // אם קיימת הודעת שגיאה - משתמשים בה
  // אחרת מחזירים הודעת ברירת מחדל
  const message = err.message || 'Internal server error';

  // בסביבת פיתוח מדפיסים את פירוט השגיאה המלא לקונסול
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // מחזירים תשובת JSON מסודרת ללקוח
  res.status(statusCode).json({

    success: false,

    message,

    // מציגים Stack Trace רק בסביבת פיתוח
    stack:
      process.env.NODE_ENV === 'development'
        ? err.stack
        : undefined

  });

};

// ייצוא הפונקציה לשימוש בקבצים אחרים
module.exports = errorHandler;