import { useState, type FormEvent } from 'react';
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

// מגדיר אילו שגיאות יכולות להיות בטופס
interface LoginErrors {
    email?: string;
    password?: string;
}

function LoginForm() {
    // שומר את הערכים שהמשתמש מקליד בשדות
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // שומר את שגיאות הוולידציה של הטופס
    const [errors, setErrors] = useState<LoginErrors>({});

    // שומר הודעת שגיאה שמתקבלת מהשרת
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();

    const { login } = useAuth();

    // פונקציה שמופעלת לאחר התחברות מוצלחת דרך Google
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const { data } = await api.post("/auth/google", {
                credential: credentialResponse.credential,
            });

            login(data.user, data.token);

            navigate("/explore");
        } catch (err: any) {
            setServerError(err.response?.data?.message || "Google login failed");
        }
    };

    // פונקציה שבודקת האם הנתונים שהוזנו תקינים
    const validate = () => {

        // אובייקט שיכיל את כל השגיאות שנמצאו
        const newErrors: LoginErrors = {};

        // אם כתובת המייל לא מכילה @ נוסיף הודעת שגיאה
        if (!formData.email.includes('@')) {
            newErrors.email = 'Valid email required';
        }

        // אם הסיסמה קצרה מ-6 תווים נוסיף הודעת שגיאה
        if (formData.password.length < 6) {
            newErrors.password = 'Min 6 characters';
        }

        // מחזיר את כל השגיאות שנמצאו
        return newErrors;
    };

    // פונקציה שמופעלת כאשר המשתמש שולח את הטופס
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        // מונע מהדפדפן לרענן את העמוד
        e.preventDefault();

        // מריץ את בדיקות התקינות
        const validationErrors = validate();

        // אם נמצאו שגיאות - מציג אותן ועוצר את שליחת הטופס
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            // שולח את נתוני ההתחברות לשרת
            const { data } = await api.post('/auth/login', formData);

            // שומר את הטוקן שהשרת החזיר כדי שהמשתמש יישאר מחובר
            login(data.user, data.token);

            // מעבר לעמוד הראשי לאחר התחברות מוצלחת
            navigate('/explore');

        } catch (err: any) {

            // אם ההתחברות נכשלה מציגים את הודעת השגיאה מהשרת
            setServerError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <p className="text-sm font-black text-[#2d2d2d] uppercase tracking-wider mb-2">
                    Email
                </p>

                <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:border-[#FF5733] focus:outline-none transition-all text-[#2d2d2d] placeholder-[#2d2d2d]/30 font-medium"
                />

                {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <p className="text-sm font-black text-[#2d2d2d] uppercase tracking-wider mb-2">
                    Password
                </p>

                <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:border-[#FF5733] focus:outline-none transition-all text-[#2d2d2d] placeholder-[#2d2d2d]/30 font-medium"
                />

                {errors.password && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            {serverError && (
                <p className="text-center text-sm text-red-500">
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                className="w-full px-8 py-5 bg-[#FF5733] text-white hover:bg-[#FF5733]/90 font-black text-lg rounded-2xl hover:scale-[1.02] transition-all shadow-xl"
            >
                Log In
            </button>

            {/* הפרדה בין התחברות רגילה להתחברות באמצעות Google */}
            <div className="flex items-center gap-4">
                <div className="h-px bg-[#2d2d2d]/10 flex-1" />

                <span className="text-sm font-bold text-[#2d2d2d]/40">
                    or
                </span>

                <div className="h-px bg-[#2d2d2d]/10 flex-1" />
            </div>

            {/* כפתור ההתחברות הרשמי של Google */}
            <div className="flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setServerError("Google login failed")}
                />
            </div>

            <div className="text-center">
                <p className="text-[#2d2d2d]/50 font-medium">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-[#FF5733] font-black hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </form>
    );

}

export default LoginForm;