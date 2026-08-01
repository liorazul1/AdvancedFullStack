import { configureStore } from '@reduxjs/toolkit';

// מייבא את ה-Reducer של המסעדות כדי לחבר אותו ל-Redux Store
import restaurantsReducer from './restaurantsSlice';

// מייבא את ה-Reducer של הביקורות כדי לחבר אותו ל-Redux Store
import reviewsReducer from './reviewsSlice';

// יצירת Store מרכזי של Redux לניהול State גלובלי באפליקציה
export const store = configureStore({
  reducer: {

    // ניהול המסעדות ב-Redux
    restaurants: restaurantsReducer,

    // ניהול הביקורות ב-Redux
    reviews: reviewsReducer,

  },
});

// טיפוס שמייצג את כל ה-State הגלובלי של Redux
export type RootState = ReturnType<typeof store.getState>;

// טיפוס שמייצג את פעולת dispatch של Redux
export type AppDispatch = typeof store.dispatch;