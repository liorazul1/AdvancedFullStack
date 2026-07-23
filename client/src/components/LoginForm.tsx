import { useState, type FormEvent } from 'react';
import api from '../services/api';

// מגדיר אילו שגיאות יכולות להיות בטופס
interface LoginErrors {
  email?: string;
  password?: string;
}

function LoginForm() {
  // שומר את הערכים שהמשתמש מקליד בשדות
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // שומר את שגיאות הוולידציה של הטופס
  const [errors, setErrors] = useState<LoginErrors>({});

  // שומר הודעת שגיאה שמתקבלת מהשרת
  const [serverError, setServerError] = useState('');

  // פונקציה שבודקת האם הנתונים שהוזנו תקינים
  const validate = () => {

    // אובייקט שיכיל את כל השגיאות שנמצאו
    const newErrors: LoginErrors = {};

    // אם כתובת המייל לא מכילה @ נוסיף הודעת שגיאה
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }

    // אם הסיסמה קצרה מ-6 תווים נוסיף הודעת שגיאה
    if (formData.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }

    // מחזיר את כל השגיאות שנמצאו
    return newErrors;
  };

  // פונקציה שמופעלת כאשר המשתמש שולח את הטופס
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    // מונע מהדפדפן לרענן את העמוד
    e.preventDefault();

    // מריץ את בדיקות התקינות
    const validationErrors = validate();

    // אם נמצאו שגיאות - מציג אותן ועוצר את שליחת הטופס
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      // שולח את נתוני ההתחברות לשרת
      const { data } = await api.post('/auth/login', formData);

      // שומר את הטוקן שהשרת החזיר כדי שהמשתמש יישאר מחובר
      localStorage.setItem('token', data.token);

      // בהמשך נעדכן גם את מצב ההתחברות של האפליקציה

    } catch (err: any) {

      // אם ההתחברות נכשלה מציגים את הודעת השגיאה מהשרת
      setServerError(err.response?.data?.message || 'Login failed');
    }
  };

  // כרגע המצגת עדיין לא מציגה את הטופס עצמו
  return null;
}

export default LoginForm;