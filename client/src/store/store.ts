import { configureStore } from '@reduxjs/toolkit';
// מייבא את ה-Reducer של המסעדות כדי לחבר אותו ל-Redux Store
import restaurantsReducer from './restaurantsSlice';

// יצירת Store מרכזי של Redux לניהול State גלובלי באפליקציה
export const store = configureStore({
  reducer: {
    // מחבר את ניהול המסעדות ל-Redux Store
    restaurants: restaurantsReducer,
  },
});

// טיפוס שמייצג את כל ה-State הגלובלי של Redux
export type RootState = ReturnType<typeof store.getState>;

// טיפוס שמייצג את פעולת dispatch של Redux
export type AppDispatch = typeof store.dispatch;