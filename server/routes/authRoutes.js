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

const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validation/authValidation');

// הרשמת משתמש חדש
router.post('/register', validate(registerSchema), register);

// התחברות משתמש קיים
router.post('/login', validate(loginSchema), login);

// שליפת המשתמש המחובר - דורש Token תקין
router.get('/me', protect, getMe);

module.exports = router;