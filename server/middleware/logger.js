// Middleware שאחראי לתעד כל בקשה שנכנסת לשרת
const logger = (req, res, next) => {

  // יצירת חותמת זמן בפורמט סטנדרטי
  const timestamp = new Date().toISOString();

  // הדפסת תאריך, סוג הבקשה והנתיב לקונסול
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // מעביר את הבקשה ל-Middleware או ל-Route הבא
  next();

};

// ייצוא הפונקציה לשימוש בקבצים אחרים
module.exports = logger;