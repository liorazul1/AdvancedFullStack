// מייבא את Navigate כדי להעביר משתמש לא מחובר לעמוד ההתחברות
import { Navigate, useLocation } from 'react-router-dom';

// מייבא את useAuth כדי לבדוק את מצב ההתחברות של המשתמש
import { useAuth } from '../context/AuthContext';

// מייבא את ReactNode כדי להגדיר טיפוס לתוכן שהקומפוננטה עוטפת
import type { ReactNode } from 'react';

// מגדיר את הטיפוס של ה-Props שהקומפוננטה מקבלת
type PrivateRouteProps = {
  children: ReactNode;
};

// קומפוננטה שמגנה על דפים שדורשים משתמש מחובר
function PrivateRoute({ children }: PrivateRouteProps) {
  // שולף מה-AuthContext את המשתמש המחובר ואת מצב הטעינה
  const auth = useAuth();

  // שומר את המיקום הנוכחי כדי שניתן יהיה לחזור אליו אחרי התחברות
  const location = useLocation();

  // אם ה-Context לא קיים, לא מציגים את הדף
  if (!auth) return null;

  // בזמן בדיקת ההתחברות לא מציגים עדיין את הדף
  if (auth.loading) return null;

  // אם אין משתמש מחובר, מעבירים לעמוד Login
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // אם המשתמש מחובר, מציגים את הדף המוגן
  return children;
}

// מייצא את הקומפוננטה לשימוש ב-App.tsx
export default PrivateRoute;