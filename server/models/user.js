const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
      minlength: 6,
      select: false
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

// הצפנת סיסמה לפני שמירת משתמש, רק אם שדה הסיסמה נוצר או השתנה
userSchema.pre('save', async function() {
  // אם הסיסמה לא שונתה, אין צורך להצפין אותה שוב
  if (!this.isModified('password')) return;

  // הצפנת הסיסמה באמצעות bcrypt לפני השמירה
  this.password = await bcrypt.hash(this.password, 12);

});

// פונקציה להשוואת סיסמה רגילה מול הסיסמה המוצפנת במסד
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);