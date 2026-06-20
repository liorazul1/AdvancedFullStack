// מייבא את מודל הביקורת כדי לבצע פעולות מול MongoDB
const Review = require('../models/Review');

// יצירת ביקורת חדשה
exports.createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// שליפת כל הביקורות
exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'username email')
      .populate('restaurant', 'name city cuisine')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// שליפת ביקורות לפי מסעדה
exports.getReviewsByRestaurant = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      restaurant: req.params.restaurantId
    })
      .populate('user', 'username')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// עדכון ביקורת לפי ID
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// מחיקת ביקורת לפי ID
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};