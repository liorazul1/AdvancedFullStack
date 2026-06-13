const mongoose = require('mongoose');

// Schema של ביקורת / דירוג
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  comment: {
    type: String,
    maxlength: 500
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);