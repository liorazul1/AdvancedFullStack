// מייבא את Express
const express = require('express');

// יצירת Router של Express
const router = express.Router();

// מייבא את פונקציות ה-CRUD מתוך ה-Controller
const {
  createReview,
  getAllReviews,
  getReviewsByRestaurant,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');


// Review Routes

// יצירת ביקורת חדשה - Create
router.post('/', createReview);

// שליפת כל הביקורות - Read
router.get('/', getAllReviews);

// שליפת ביקורות לפי מסעדה - Read
router.get('/restaurant/:restaurantId', getReviewsByRestaurant);

// עדכון ביקורת לפי מזהה - Update
router.put('/:id', updateReview);

// מחיקת ביקורת לפי מזהה - Delete
router.delete('/:id', deleteReview);


// ייצוא ה-Router לשימוש בקבצים אחרים
module.exports = router;