// מייבא את ספריית JOI לצורך בדיקת נתונים שמגיעים מהלקוח
const Joi = require('joi');

// סכמת ולידציה להרשמת משתמש חדש
const registerSchema = Joi.object({
  username: Joi.string().min(2).max(30).required()
    .messages({
      'string.min': 'Username must be at least 2 characters',
      'string.max': 'Username must be up to 30 characters',
      'any.required': 'Username is required'
    }),

  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be valid',
      'any.required': 'Email is required'
    }),

  password: Joi.string().min(6).required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    })
});

// סכמת ולידציה להתחברות משתמש קיים
const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.email': 'Email must be valid',
      'any.required': 'Email is required'
    }),

  password: Joi.string().required()
    .messages({
      'any.required': 'Password is required'
    })
});

// ייצוא הסכמות כדי שנוכל להשתמש בהן ב-Routes
module.exports = { registerSchema, loginSchema };