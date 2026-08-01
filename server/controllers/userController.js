// מייבא את מודל המשתמש כדי לבצע פעולות מול MongoDB
const User = require('../models/User');

// יצירת משתמש חדש
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// שליפת כל המשתמשים
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// שליפת משתמש לפי ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// עדכון משתמש לפי ID
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// מחיקת משתמש לפי ID
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// שליפת פרופיל המשתמש המחובר
exports.getProfile = async (req, res, next) => {
  try {

    const user = await User.findById(req.user._id)
      .populate('savedRestaurants');

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};


// עדכון פרופיל המשתמש המחובר
exports.updateProfile = async (req, res, next) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

// שינוי סיסמה למשתמש המחובר
exports.changePassword = async (req, res, next) => {
  try {

    const { currentPassword, newPassword } = req.body;


    // שליפת המשתמש כולל הסיסמה המוצפנת
    const user = await User.findById(req.user._id)
      .select('+password');


    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }


    // בדיקה שהסיסמה הנוכחית נכונה
    const isPasswordCorrect = await user.comparePassword(
      currentPassword
    );


    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }


    // החלפת הסיסמה
    user.password = newPassword;


    // save יפעיל את bcrypt pre-save שכבר קיים לך במודל
    await user.save();


    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });


  } catch (error) {

    next(error);

  }
};
