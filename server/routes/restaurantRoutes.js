// מייבא את Express
const express = require('express');

// יצירת Router של Express
const router = express.Router();

// מייבא את פונקציות ה-CRUD מתוך ה-Controller
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

const validate = require('../middleware/validate');
const { createRestaurantSchema } = require('../validation/restaurantValidation');

// מייבא את Middleware ההגנה שבודק JWT
const { protect } = require('../middleware/authMiddleware');

// Restaurant Routes

// יצירת מסעדה חדשה - Create
router.post(
  '/',
  protect,
  validate(createRestaurantSchema),
  createRestaurant
);

// שליפת כל המסעדות - Read
router.get('/', getAllRestaurants);


// שליפת מסעדה לפי מזהה - Read
router.get('/:id', getRestaurantById);

// עדכון מסעדה לפי מזהה - Update
router.put('/:id', protect, updateRestaurant);

// מחיקת מסעדה לפי מזהה - Delete
router.delete('/:id', protect, deleteRestaurant);

// Future routes:
// GET /api/restaurants/search
// GET /api/restaurants/city/:city
// GET /api/restaurants/cuisine/:cuisine
// GET /api/restaurants/vibe/:vibe
// GET /api/restaurants/recommended
// GET /api/restaurants/top-rated

// ייצוא ה-Router לשימוש בקבצים אחרים
module.exports = router;