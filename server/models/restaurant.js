const mongoose = require('mongoose');

// Schema של מסעדה
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String
  },

  image: {
    type: String
  },

  cuisine: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$'
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  reviewCount: {
    type: Number,
    default: 0
  },

  vibes: {
    type: [String],
    default: []
  },

  tags: {
    type: [String],
    default: []
  },

  bookingUrl: {
    type: String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);