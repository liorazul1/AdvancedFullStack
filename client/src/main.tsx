// מייבא את StrictMode של React לבדיקות נוספות בזמן פיתוח
import { StrictMode } from 'react';

// מייבא את createRoot שמחבר את React לאלמנט root ב-HTML
import { createRoot } from 'react-dom/client';

// מייבא את BrowserRouter כדי לאפשר ניווט בין דפים באפליקציה
import { BrowserRouter } from 'react-router-dom';

// מייבא את Provider כדי לחבר את Redux לכל האפליקציה
import { Provider } from 'react-redux';

// מייבא את GoogleOAuthProvider כדי לאפשר התחברות באמצעות Google 
import { GoogleOAuthProvider } from "@react-oauth/google";

// מייבא את ה-Store המרכזי של Redux
import { store } from './store/store';

// מייבא את AuthProvider לניהול מצב ההתחברות בכל האפליקציה
import { AuthProvider } from './context/AuthContext';

// מייבא את קומפוננטת App הראשית
import App from './App';

// מייבא את קובץ ה-CSS הראשי
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);