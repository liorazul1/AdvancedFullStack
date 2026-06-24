// מייבא את מודל המשתמש לצורך הרשמה והתחברות
const User = require('../models/User');

// מייבא את JWT לצורך יצירת Token למשתמש מחובר
const jwt = require('jsonwebtoken');

// פונקציה פנימית ליצירת Token לפי מזהה המשתמש
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// הרשמת משתמש חדש
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // בדיקה אם כבר קיים משתמש עם אותו אימייל
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already in use'
      });
    }

    // יצירת משתמש חדש
    // הסיסמה תוצפן אוטומטית ב-User Model באמצעות pre-save hook
    const user = await User.create({
      username,
      email,
      password
    });

    // יצירת Token למשתמש החדש
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// התחברות משתמש קיים
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // בגלל שבמודל הגדרנו select:false לסיסמה,
    // כאן אנחנו מבקשים במפורש לקבל גם את שדה הסיסמה
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // השוואה בין הסיסמה שהמשתמש הקליד לבין הסיסמה המוצפנת במסד
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // יצירת Token לאחר התחברות מוצלחת
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// שליפת המשתמש המחובר לפי ה-Token
exports.getMe = async (req, res, next) => {
  try {

    // req.user יגיע מה-protect middleware
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};