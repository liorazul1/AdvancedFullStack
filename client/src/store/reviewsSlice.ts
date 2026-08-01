import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';


// פעולה אסינכרונית שמביאה את הביקורות של המשתמש המחובר
export const fetchMyReviews = createAsyncThunk(
    'reviews/fetchMyReviews',
    async (_, { rejectWithValue }) => {

        try {

            // פנייה לשרת לקבלת הביקורות של המשתמש המחובר
            const { data } = await api.get('/reviews/my-reviews');

            // מחזיר את רשימת הביקורות ל-Redux
            return data.data;

        } catch (err: any) {

            // מחזיר הודעת שגיאה במקרה שהבקשה נכשלה
            return rejectWithValue(
                err.response?.data?.message
            );

        }

    }
);


// מבנה ה-State של הביקורות ב-Redux
interface ReviewsState {

    reviews: any[];

    loading: boolean;

    error: string | null;

}


// ערכי ברירת מחדל של ה-State
const initialState: ReviewsState = {

    reviews: [],

    loading: false,

    error: null,

};


// יצירת Slice שמנהל את הביקורות
const reviewsSlice = createSlice({

    name: 'reviews',

    initialState,

    reducers: {},


    // טיפול במצבי השליפה מהשרת
    extraReducers: (builder) => {

        builder

            // הבקשה נשלחה
            .addCase(fetchMyReviews.pending, (state) => {

                state.loading = true;

                state.error = null;

            })


            // התקבלה תשובה תקינה
            .addCase(fetchMyReviews.fulfilled, (state, action) => {

                state.loading = false;

                // שמירת הביקורות שהתקבלו ב-Redux
                state.reviews = action.payload;

            })


            // הבקשה נכשלה
            .addCase(fetchMyReviews.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload as string;

            });

    },

});


// מייצא את ה-Reducer כדי לחבר אותו ל-Redux Store
export default reviewsSlice.reducer;