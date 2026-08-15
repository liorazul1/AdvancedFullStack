const express = require('express');
const router = express.Router();


const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile,
  changePassword,
  saveRestaurant,
  removeSavedRestaurant
} = require('../controllers/userController');

const validate = require('../middleware/validate');
const { createUserSchema } = require('../validation/userValidation');
// מייבא את Middleware ההגנה שבודק JWT
const { protect } = require('../middleware/authMiddleware');

// User Routes

// יצירת משתמש חדש - Create
router.post(
  '/',
  validate(createUserSchema),
  createUser
);

// שליפת כל המשתמשים - Read
router.get('/', getAllUsers);

// שליפת פרופיל המשתמש המחובר - Read
router.get('/profile', protect, getProfile);

// שליפת משתמש לפי מזהה - Read
router.get('/:id', getUserById);

// עדכון פרופיל המשתמש המחובר - Update
router.put('/profile', protect, updateProfile);

// שינוי סיסמה למשתמש המחובר - Update
router.put('/change-password', protect, changePassword);

// שמירת מסעדה במועדפים של המשתמש - Update
router.put(
  '/save-restaurant/:restaurantId',
  protect,
  saveRestaurant
);
// הסרת מסעדה מהמועדפים של המשתמש - Delete / Update
router.delete(
  '/save-restaurant/:restaurantId',
  protect,
  removeSavedRestaurant
);

// עדכון משתמש לפי מזהה - Update
router.put('/:id', updateUser);

// מחיקת משתמש לפי מזהה - Delete
router.delete('/:id', deleteUser);


module.exports = router;