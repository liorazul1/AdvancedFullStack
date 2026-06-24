// מייבא את JWT לצורך בדיקת Token
const jwt = require('jsonwebtoken');

// מייבא את מודל המשתמש כדי לשלוף את המשתמש המחובר
const User = require('../models/User');

// Middleware שמגן על Routes ודורש Token תקין
exports.protect = async (req, res, next) => {
  try {
    let token;

    // בדיקה אם נשלח Header מסוג Authorization עם Bearer Token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // אם לא נשלח Token — מחזירים שגיאת הרשאה
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      });
    }

    // בדיקת תקינות ה-Token ופענוח המידע שבתוכו
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // שליפת המשתמש מתוך המסד לפי ה-ID שנמצא בתוך ה-Token
    req.user = await User.findById(decoded.userId);

    // ממשיכים ל-Middleware או ל-Controller הבא
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalid or expired'
    });
  }
};