const express = require('express');
const router = express.Router();


const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
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

// עדכון משתמש לפי מזהה - Update
router.put('/:id', updateUser);

// מחיקת משתמש לפי מזהה - Delete
router.delete('/:id', deleteUser);

// Future routes:
// GET /api/users/profile
// PUT /api/users/preferences
// POST /api/users/save-restaurant
// DELETE /api/users/save-restaurant/:id

module.exports = router;