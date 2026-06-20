const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// User Routes

// יצירת משתמש חדש - Create
router.post('/', createUser);

// שליפת כל המשתמשים - Read
router.get('/', getAllUsers);

// שליפת משתמש לפי מזהה - Read
router.get('/:id', getUserById);

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