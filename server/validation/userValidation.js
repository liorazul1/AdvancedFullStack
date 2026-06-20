// מייבא את ספריית JOI לצורך בדיקת נתונים שמגיעים מהלקוח
const Joi = require('joi');

// סכמת ולידציה ליצירת משתמש חדש
// המטרה היא לוודא שהנתונים תקינים לפני שהם מגיעים ל-Controller ול-MongoDB
const createUserSchema = Joi.object({
  username: Joi.string().min(2).max(50).required()
    .messages({
      'string.min': 'Username must be at least 2 characters',
      'string.max': 'Username must be up to 50 characters',
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
    }),

  favoriteCuisines: Joi.array().items(Joi.string()).optional(),

  favoriteVibes: Joi.array().items(Joi.string()).optional(),

  priceRangePreference: Joi.string()
    .valid('$', '$$', '$$$', '$$$$')
    .default('$$'),

  savedRestaurants: Joi.array().optional()
});

// ייצוא הסכמה כדי שנוכל להשתמש בה ב-Routes
module.exports = { createUserSchema };