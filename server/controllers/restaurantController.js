// מייבא את מודל המסעדה כדי לבצע פעולות מול MongoDB
const Restaurant = require('../models/restaurant');

// יצירת מסעדה חדשה
exports.createRestaurant = async (req, res, next) => {
  try {

    const restaurant = await Restaurant.create({
      ...req.body,

      // שמירת נתיב התמונה שהועלתה באמצעות Multer
      image: req.file
        ? `/uploads/${req.file.filename}`
        : ''
    });


    res.status(201).json({
      success: true,
      data: restaurant
    });


  } catch (error) {
    next(error);
  }
};

// שליפת כל המסעדות
exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().sort('-createdAt');

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    next(error);
  }
};

// שליפת מסעדה לפי ID
exports.getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    next(error);
  }
};

// עדכון מסעדה לפי ID
exports.updateRestaurant = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body
    };

    // אם הועלתה תמונה חדשה, מעדכנים את נתיב התמונה במסעדה
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    next(error);
  }
};

// מחיקת מסעדה לפי ID
exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};