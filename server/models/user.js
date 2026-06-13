const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    favoriteCuisines: {
      type: [String],
      default: []
    },

    favoriteVibes: {
      type: [String],
      default: []
    },

    priceRangePreference: {
      type: String,
      enum: ['$', '$$', '$$$', '$$$$'],
      default: '$$'
    },

    savedRestaurants: [{
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);