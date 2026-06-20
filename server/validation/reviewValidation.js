// מייבא את ספריית JOI לצורך בדיקת נתונים שמגיעים מהלקוח
const Joi = require('joi');

// סכמת ולידציה ליצירת ביקורת חדשה
// המטרה היא לוודא שהנתונים תקינים לפני שהם מגיעים ל-Controller ול-MongoDB
const createReviewSchema = Joi.object({
  user: Joi.string().required()
    .messages({
      'any.required': 'User id is required'
    }),

  restaurant: Joi.string().required()
    .messages({
      'any.required': 'Restaurant id is required'
    }),

  rating: Joi.number().min(1).max(5).required()
    .messages({
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be up to 5',
      'any.required': 'Rating is required'
    }),

  comment: Joi.string().max(500).optional()
});

// ייצוא הסכמה כדי שנוכל להשתמש בה ב-Routes
module.exports = { createReviewSchema };