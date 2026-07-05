import { configureStore } from '@reduxjs/toolkit';

// יצירת Store מרכזי של Redux לניהול State גלובלי באפליקציה
export const store = configureStore({
  reducer: {},
});

// טיפוס שמייצג את כל ה-State הגלובלי של Redux
export type RootState = ReturnType<typeof store.getState>;

// טיפוס שמייצג את פעולת dispatch של Redux
export type AppDispatch = typeof store.dispatch;