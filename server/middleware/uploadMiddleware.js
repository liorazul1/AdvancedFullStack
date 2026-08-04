// מייבא את Multer לטיפול בהעלאת קבצים
const multer = require('multer');

// מייבא את path לצורך שמירת סיומת הקובץ
const path = require('path');


// הגדרת אחסון הקבצים
const storage = multer.diskStorage({

    // תיקיית שמירת התמונות
    destination: (req, file, cb) => {

        cb(null, 'uploads/');

    },


    // יצירת שם ייחודי לקובץ
    filename: (req, file, cb) => {

        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1E9)}`;


        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );

    }

});


// בדיקת סוג הקובץ
const fileFilter = (req, file, cb) => {

    const allowed = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];


    if (allowed.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error(
                'Only JPEG, PNG, and WebP images are allowed'
            ),
            false
        );

    }

};


// יצירת middleware של העלאת קבצים
const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 15 * 1024 * 1024
    }

});


// ייצוא לשימוש ב-Routes
module.exports = upload;