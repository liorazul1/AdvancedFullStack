// מייבא את אפליקציית Express שהוגדרה בקובץ app.js
const app = require('./app');

// מייבא את פונקציית החיבור למסד הנתונים MongoDB
const connectDB = require('./config/db');

// לוקח את מספר הפורט מקובץ .env
// ואם לא הוגדר פורט, משתמש ב-5000 כברירת מחדל
const PORT = process.env.PORT || 5000;

// מתחבר למסד הנתונים
connectDB().then(() => {

  // רק לאחר שהחיבור למסד הצליח,
  // מפעילים את השרת ומתחילים להאזין לבקשות
  app.listen(PORT, () => {

    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );

  });

});