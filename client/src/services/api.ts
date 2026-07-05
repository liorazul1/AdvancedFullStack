import axios from 'axios';

// יצירת מופע Axios מרכזי לכל קריאות ה-API מול השרת
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// הוספת JWT Token לכל בקשה יוצאת, אם קיים Token ב-localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// טיפול גלובלי בשגיאת 401: מחיקת Token והעברה לעמוד Login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;