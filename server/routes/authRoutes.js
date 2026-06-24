// מייבא את Express
const express = require('express');

// יצירת Router של Express
const router = express.Router();

// מייבא את פונקציות ההרשמה, ההתחברות ושליפת המשתמש המחובר
const {
  register,
  login,
  getMe
} = require('../controllers/authController');

// מייבא את Middleware ההגנה שבודק JWT
const { protect } = require('../middleware/authMiddleware');

// הרשמת משתמש חדש
router.post('/register', register);

// התחברות משתמש קיים
router.post('/login', login);

// שליפת המשתמש המחובר - דורש Token תקין
router.get('/me', protect, getMe);

// ייצוא ה-Router לשימוש בקבצים אחרים
module.exports = router;