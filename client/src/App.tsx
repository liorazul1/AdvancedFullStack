// מייבא את Routes ו-Route להגדרת הנתיבים של האפליקציה
import { Routes, Route } from 'react-router-dom';

// מייבא lazy ו-Suspense כדי לטעון דפים רק כשהמשתמש נכנס אליהם
import { lazy, Suspense } from 'react';

// מייבא את קומפוננטת הניווט הראשית
import Navbar from './components/Navbar';

import Footer from "./components/Footer";

// מייבא קומפוננטה שמגנה על דפים שדורשים התחברות
import PrivateRoute from './components/PrivateRoute';

// מייבא קומפוננטת טעינה שתוצג בזמן טעינת דפים
import LoadingSpinner from './components/LoadingSpinner';

//  Lazy Loading של הדפים כדי לשפר ביצועים
const Home = lazy(() => import('./pages/Home'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const RestaurantDetails = lazy(() => import('./pages/RestaurantDetails'));
const AddReview = lazy(() => import('./pages/AddReview'));
const NotFound = lazy(() => import('./pages/NotFound'));

// קומפוננטת App מגדירה את מבנה הניווט הראשי של האתר
function App() {
  return (
    <>
      <Navbar />

      <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
        <Routes>
          {/* נתיבים ציבוריים */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />


          {/* נתיב מוגן - רק משתמש מחובר יכול לדרג מסעדה */}
          <Route
            path="/restaurants/:id/rate"
            element={
              <PrivateRoute>
                <AddReview />
              </PrivateRoute>
            }
          />

          {/* נתיב ברירת מחדל לכל כתובת שלא קיימת */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <Footer />
    </>
  );
}

// מייצא את App לשימוש ב-main.tsx
export default App;