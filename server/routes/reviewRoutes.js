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

const validate = require('../middleware/validate');
const { createReviewSchema } = require('../validation/reviewValidation');

// מייבא את Middleware ההגנה שבודק JWT
const { protect } = require('../middleware/authMiddleware');

// Review Routes

// יצירת ביקורת חדשה - Create
router.post(
  '/',
  protect,
  validate(createReviewSchema),
  createReview
);

// שליפת כל הביקורות - Read
router.get('/', getAllReviews);

// שליפת ביקורות לפי מסעדה - Read
router.get('/restaurant/:restaurantId', getReviewsByRestaurant);

// עדכון ביקורת לפי מזהה - Update
router.put('/:id', protect, updateReview);

// מחיקת ביקורת לפי מזהה - Delete
router.delete('/:id', protect, deleteReview);


// ייצוא ה-Router לשימוש בקבצים אחרים
module.exports = router;