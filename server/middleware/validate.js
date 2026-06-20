// Middleware גנרי לביצוע ולידציה באמצעות JOI
// מקבל Schema ומחזיר Middleware שניתן לחבר ל-Routes
const validate = (schema) => {

  return (req, res, next) => {

    // בודק את הנתונים שנשלחו ב-Body מול הסכמה שהתקבלה
    const { error, value } = schema.validate(req.body, {

      // מחזיר את כל השגיאות ולא רק את הראשונה
      abortEarly: false,

      // מסיר שדות שלא הוגדרו בסכמה
      stripUnknown: true,

    });

    // אם נמצאו שגיאות ולידציה
    if (error) {

      // אוסף את כל הודעות השגיאה למערך
      const errorMessages = error.details.map(
        d => d.message
      );

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    // מחליף את ה-Body בנתונים שעברו ניקוי וולידציה
    req.body = value;

    // ממשיך ל-Middleware הבא או ל-Controller
    next();

  };

};

// ייצוא הפונקציה לשימוש ב-Routes
module.exports = validate;