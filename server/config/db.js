// מייבא את ספריית Mongoose לצורך עבודה עם MongoDB
const mongoose = require('mongoose');

// טוען את משתני הסביבה מתוך קובץ .env
require('dotenv').config();

// פונקציה אסינכרונית שאחראית על החיבור למסד הנתונים
const connectDB = async () => {

  try {

    // התחברות למסד הנתונים באמצעות הכתובת שנמצאת בקובץ .env
    await mongoose.connect(process.env.MONGO_URI);

    // הודעה שתופיע אם החיבור הצליח
    console.log('MongoDB connected successfully');

  } catch (error) {

    // הדפסת הודעת שגיאה במקרה שהחיבור נכשל
    console.error('MongoDB connection failed:', error.message);

    // סגירת השרת במקרה של כשל בחיבור למסד הנתונים
    process.exit(1);

  }
};

// מייצא את פונקציית החיבור כדי שניתן יהיה להשתמש בה בקבצים אחרים
module.exports = connectDB;