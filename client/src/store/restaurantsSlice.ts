import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// פעולה אסינכרונית שמביאה את רשימת המסעדות מהשרת ושומרת את תוצאת השליפה ב-Redux
export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // פונה לשרת דרך ה-API המרכזי של האפליקציה כדי לקבל את כל המסעדות
            const { data } = await api.get('/restaurants');

            // מחזיר את הנתונים ל-Redux במקרה שהשליפה הצליחה
            return data.data;
        } catch (err: any) {
            // מחזיר ל-Redux את הודעת השגיאה כדי שניתן יהיה לטפל בה בהמשך
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

// מגדיר את המבנה של ה-State עבור ניהול המסעדות ב-Redux
interface RestaurantsState {
    restaurants: any[];
    loading: boolean;
    error: string | null;
}

// יצירת ערכי ברירת המחדל של ה-State
const initialState: RestaurantsState = {
    restaurants: [],
    loading: false,
    error: null,
};

// יצירת Slice שמרכז את כל המידע והפעולות הקשורות למסעדות
const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {},


    // מטפל בכל המצבים האפשריים של שליפת המסעדות מהשרת
    extraReducers: (builder) => {
        // Pending - הבקשה יצאה לשרת ועדיין ממתינים לתשובה
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;

                // מנקה שגיאה קודמת כדי שלא תוצג בזמן ניסיון טעינה חדש
                state.error = null;
            })

            // Fulfilled - התקבלה תשובה תקינה מהשרת
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false;

                // שומר את רשימת המסעדות שהתקבלה ב-Redux
                state.restaurants = action.payload;
            })

            // Rejected - השרת החזיר שגיאה
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.loading = false;

                // שומר את הודעת השגיאה כדי שניתן יהיה להציג אותה למשתמש
                state.error = action.payload as string;
            });
    },
});

// מייצא את ה-Reducer כדי שניתן יהיה לחבר אותו ל-Redux Store
export default restaurantsSlice.reducer;