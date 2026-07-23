// מייבא את Hooks של React לניהול מצב, אפקטים ופונקציות ממואמות
import { useState, useEffect, useCallback } from 'react';

// מייבא את מופע Axios המרכזי של הפרויקט
import api from '../services/api';

// Hook מותאם אישית שמבצע בקשת GET ומנהל נתונים, טעינה ושגיאות
export const useFetch = (url: string) => {

  // שומר את הנתונים שהתקבלו מהשרת
  const [data, setData] = useState<any>(null);

  // שומר האם מתבצעת כרגע בקשת API
  const [loading, setLoading] = useState(true);

  // שומר הודעת שגיאה במקרה שהבקשה נכשלה
  const [error, setError] = useState<string | null>(null);

  // פונקציה שמבצעת את קריאת הנתונים מהשרת
  const fetchData = useCallback(async () => {

    // מפעיל מצב טעינה
    setLoading(true);

    // מנקה שגיאה קודמת
    setError(null);

    try {

      // שולח בקשת GET לשרת
      const response = await api.get(url);

      // שומר את הנתונים שחזרו מהשרת
      setData(response.data.data);

    } catch (err: any) {

      // שומר את הודעת השגיאה שחזרה מהשרת או הודעה כללית
      setError(err.response?.data?.message || 'Something went wrong');

    } finally {

      // מסיים את מצב הטעינה גם אם הבקשה הצליחה וגם אם נכשלה
      setLoading(false);

    }

  }, [url]);

  // מפעיל את קריאת הנתונים בטעינה הראשונה ובכל שינוי של הכתובת
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // מחזיר את הנתונים, מצב הטעינה, השגיאה ואפשרות לטעון מחדש
  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};