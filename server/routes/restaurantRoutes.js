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


// Restaurant Routes

// יצירת מסעדה חדשה - Create
router.post('/', createRestaurant);

// שליפת כל המסעדות - Read
router.get('/', getAllRestaurants);


// שליפת מסעדה לפי מזהה - Read
router.get('/:id', getRestaurantById);

// עדכון מסעדה לפי מזהה - Update
router.put('/:id', updateRestaurant);

// מחיקת מסעדה לפי מזהה - Delete
router.delete('/:id', deleteRestaurant);


// ייצוא ה-Router לשימוש בקבצים אחרים
module.exports = router;