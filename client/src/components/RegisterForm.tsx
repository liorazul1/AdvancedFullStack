import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const cuisines = [
    "Italian",
    "Asian",
    "Burgers",
    "Cafes",
    "Desserts",
    "Mexican",
    "Vegan",
    "Seafood",
];

const vibes = [
    "Date Night",
    "With Friends",
    "Family",
    "Hidden Gems",
    "Rooftop",
    "Trendy",
    "Wine & Dine",
    "Outdoor",
];

const priceRanges = ["$", "$$", "$$$", "$$$$"];


function RegisterForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState("$$");


    const [errors, setErrors] = useState<RegisterErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);



    const validate = () => {

        const newErrors: RegisterErrors = {};


        if (formData.username.trim().length < 2) {
            newErrors.username = "Min 2 characters";
        }


        if (!formData.email.includes("@")) {
            newErrors.email = "Valid email required";
        }


        if (formData.password.length < 6) {
            newErrors.password = "Min 6 characters";
        }


        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }


        return newErrors;
    };



    const toggleCuisine = (cuisine: string) => {

        setSelectedCuisines((prev) =>
            prev.includes(cuisine)
                ? prev.filter((item) => item !== cuisine)
                : [...prev, cuisine]
        );

    };



    const toggleVibe = (vibe: string) => {

        setSelectedVibes((prev) =>
            prev.includes(vibe)
                ? prev.filter((item) => item !== vibe)
                : [...prev, vibe]
        );

    };



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();


        const validationErrors = validate();


        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        try {

            setLoading(true);
            setServerError("");


            await api.post("/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                favoriteCuisines: selectedCuisines,
                favoriteVibes: selectedVibes,
                priceRangePreference: priceRange,
            });


            navigate("/login");


        } catch (err: any) {

            setServerError(
                err.response?.data?.message || "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };



    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-10"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="block text-sm font-black text-[#2d2d2d] mb-2 uppercase tracking-wider">
                        Username
                    </label>

                    <input
                        type="text"
                        value={formData.username}
                        placeholder="Your username"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value
                            })
                        }
                        className="w-full px-6 py-4 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:border-[#FF5733] focus:outline-none transition-all text-[#2d2d2d]"
                    />

                    {errors.username && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.username}
                        </p>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-black text-[#2d2d2d] mb-2 uppercase tracking-wider">
                        Email
                    </label>

                    <input
                        type="email"
                        value={formData.email}
                        placeholder="your@email.com"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                        className="w-full px-6 py-4 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:border-[#FF5733] focus:outline-none transition-all text-[#2d2d2d]"
                    />

                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.email}
                        </p>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-black text-[#2d2d2d] mb-2 uppercase tracking-wider">
                        Password
                    </label>

                    <input
                        type="password"
                        value={formData.password}
                        placeholder="••••••••"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                        className="w-full px-6 py-4 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:border-[#FF5733] focus:outline-none transition-all text-[#2d2d2d]"
                    />

                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-black text-[#2d2d2d] mb-2 uppercase tracking-wider">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={formData.confirmPassword}
                        placeholder="••••••••"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value
                            })
                        }
                        className="w-full px-6 py-4 bg-[#FAFAFA] rounded-2xl border-2 border-[#2d2d2d]/5 focus:border-[#FF5733] focus:outline-none transition-all text-[#2d2d2d]"
                    />

                    {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

            </div>


            <div className="border-t border-[#2d2d2d]/10 pt-8">

                <h2 className="text-2xl font-black text-[#2d2d2d] mb-2">
                    Favorite Cuisines
                </h2>

                <p className="text-[#2d2d2d]/50 mb-6">
                    Select the cuisines you love
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    {cuisines.map((cuisine) => (

                        <button
                            key={cuisine}
                            type="button"
                            onClick={() => toggleCuisine(cuisine)}
                            className={`p-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] hover:shadow-lg ${selectedCuisines.includes(cuisine)
                                    ? "bg-[#FF5733] text-white shadow-xl"
                                    : "bg-white border-2 border-[#2d2d2d]/10 text-[#2d2d2d]"
                                }`}
                        >

                            {selectedCuisines.includes(cuisine) && (
                                <Check className="inline w-4 h-4 mr-1" />
                            )}

                            {cuisine}

                        </button>

                    ))}

                </div>

            </div>


            <div>

                <h2 className="text-2xl font-black text-[#2d2d2d] mb-6">
                    Price Range Preference
                </h2>

                <div className="grid grid-cols-4 gap-3">

                    {priceRanges.map((price) => (

                        <button
                            key={price}
                            type="button"
                            onClick={() => setPriceRange(price)}
                            className={`py-4 rounded-2xl font-black transition-all hover:scale-[1.02] ${priceRange === price
                                    ? "bg-[#FF5733] text-white shadow-xl"
                                    : "bg-white border-2 border-[#2d2d2d]/10 text-[#2d2d2d]"
                                }`}
                        >
                            {price}
                        </button>

                    ))}

                </div>

            </div>


            <div>

                <h2 className="text-2xl font-black text-[#2d2d2d] mb-2">
                    Favorite Vibes
                </h2>

                <p className="text-[#2d2d2d]/50 mb-6">
                    What kind of experience are you looking for?
                </p>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    {vibes.map((vibe) => (

                        <button
                            key={vibe}
                            type="button"
                            onClick={() => toggleVibe(vibe)}
                            className={`p-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] hover:shadow-lg ${selectedVibes.includes(vibe)
                                    ? "bg-[#2d2d2d] text-white shadow-xl"
                                    : "bg-white border-2 border-[#2d2d2d]/10 text-[#2d2d2d]"
                                }`}
                        >

                            {selectedVibes.includes(vibe) && (
                                <Check className="inline w-4 h-4 mr-1" />
                            )}

                            {vibe}

                        </button>

                    ))}

                </div>

            </div>


            {serverError && (
                <p className="text-center text-sm text-red-500">
                    {serverError}
                </p>
            )}


            <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-[#FF5733] text-white font-black text-lg rounded-2xl hover:bg-[#FF5733]/90 hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50"
            >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && (
                    <ArrowRight className="w-5 h-5" />
                )}

            </button>


            <div className="text-center">

                <p className="text-[#2d2d2d]/50 font-medium">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-[#FF5733] font-black hover:underline"
                    >
                        Log In
                    </Link>

                </p>

            </div>


        </form>
    );
}

export default RegisterForm;