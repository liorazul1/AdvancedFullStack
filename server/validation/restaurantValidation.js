// מייבא את ספריית JOI לצורך בדיקת נתונים שמגיעים מהלקוח
const Joi = require('joi');

// סכמת ולידציה ליצירת מסעדה חדשה
// המטרה היא לוודא שהנתונים תקינים לפני שהם מגיעים ל-Controller ול-MongoDB
const createRestaurantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
    .messages({
      'string.min': 'Restaurant name must be at least 2 characters',
      'string.max': 'Restaurant name must be up to 100 characters',
      'any.required': 'Restaurant name is required'
    }),

  description: Joi.string().max(500).optional(),

  image: Joi.string().uri().optional(),

  cuisine: Joi.string().min(2).max(50).required(),

  city: Joi.string().min(2).max(50).required(),

  priceRange: Joi.string()
    .valid('$', '$$', '$$$', '$$$$')
    .default('$$'),

  rating: Joi.number().min(0).max(5).optional(),

  reviewCount: Joi.number().min(0).optional(),

  vibes: Joi.array().items(Joi.string()).optional(),

  tags: Joi.array().items(Joi.string()).optional(),

  bookingUrl: Joi.string().uri().optional()
});

// ייצוא הסכמה כדי שנוכל להשתמש בה ב-Routes
module.exports = { createRestaurantSchema };