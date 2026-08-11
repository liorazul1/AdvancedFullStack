import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}
const cuisines = [
    { name: "Italian", color: "#FF5733" },
    { name: "Asian", color: "#7D1935" },
    { name: "Burgers", color: "#C8E64A" },
    { name: "Cocktails", color: "#E8B923" },
    { name: "Cafes", color: "#FF6B9D" },
    { name: "Desserts", color: "#2C7873" },
    { name: "Mexican", color: "#FF8C42" },
    { name: "Vegan", color: "#3AAFA9" },
];

const vibes = [
    { name: "Date Night", color: "#FF6B9D" },
    { name: "With Friends", color: "#FF8C42" },
    { name: "Family Dinner", color: "#3AAFA9" },
    { name: "Hidden Gems", color: "#E8B923" },
    { name: "Rooftop Views", color: "#2C7873" },
    { name: "Trendy Bars", color: "#7D1935" },
    { name: "Wine & Dine", color: "#6C5B7B" },
    { name: "Outdoor Seating", color: "#C8E64A" },
];

const cities = [
    { name: "Tel Aviv", color: "#FF5733" },
    { name: "Jerusalem", color: "#7D1935" },
    { name: "Haifa", color: "#3AAFA9" },
    { name: "Eilat", color: "#E8B923" },
    { name: "Herzliya", color: "#FF6B9D" },
    { name: "Netanya", color: "#2C7873" },
    { name: "Beer Sheva", color: "#FF8C42" },
    { name: "Ashdod", color: "#C8E64A" },
];

const priceRanges = ["$", "$$", "$$$", "$$$$"];

function RegisterForm() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<string[]>([]);


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
    const toggleCity = (city: string) => {
        setSelectedCities((prev) =>
            prev.includes(city)
                ? prev.filter((item) => item !== city)
                : [...prev, city]
        );
    };

    const togglePrice = (price: string) => {
        setPriceRange((prev) =>
            prev.includes(price)
                ? prev.filter((item) => item !== price)
                : [...prev, price]
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


            const { data } = await api.post("/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                favoriteCuisines: selectedCuisines,
                favoriteVibes: selectedVibes,
                favoriteCities: selectedCities,
                priceRangePreference: priceRange,
            });

            login(data.user, data.token);

            navigate("/");


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
                            key={cuisine.name}
                            type="button"
                            onClick={() => toggleCuisine(cuisine.name)}
                            style={{
                                backgroundColor: selectedCuisines.includes(cuisine.name) ? cuisine.color : "white",
                                color: selectedCuisines.includes(cuisine.name) ? "white" : "#2d2d2d",
                                borderColor: selectedCuisines.includes(cuisine.name) ? cuisine.color : "rgba(45,45,45,0.1)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = cuisine.color;
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = selectedCuisines.includes(cuisine.name) ? cuisine.color : "white";
                                e.currentTarget.style.color = selectedCuisines.includes(cuisine.name) ? "white" : "#2d2d2d";
                            }}
                            className="p-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] hover:shadow-lg border-2"
                        >
                            {selectedCuisines.includes(cuisine.name) && (
                                <Check className="inline w-4 h-4 mr-1" />
                            )}

                            {cuisine.name}
                        </button>

                    ))}

                </div>

            </div>

            <div>
                <h2 className="text-2xl font-black text-[#2d2d2d] mb-2">
                    Favorite Cities
                </h2>

                <p className="text-[#2d2d2d]/50 mb-6">
                    Select your favorite dining cities
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {cities.map((city) => (
                        <button
                            key={city.name}
                            type="button"
                            onClick={() => toggleCity(city.name)}
                            style={{
                                backgroundColor: selectedCities.includes(city.name) ? city.color : "white",
                                color: selectedCities.includes(city.name) ? "white" : "#2d2d2d",
                                borderColor: selectedCities.includes(city.name) ? city.color : "rgba(45,45,45,0.1)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = city.color;
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = selectedCities.includes(city.name) ? city.color : "white";
                                e.currentTarget.style.color = selectedCities.includes(city.name) ? "white" : "#2d2d2d";
                            }}
                            className="p-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] hover:shadow-lg border-2"
                        >
                            {selectedCities.includes(city.name) && (
                                <Check className="inline w-4 h-4 mr-1" />
                            )}

                            {city.name}
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
                            key={vibe.name}
                            type="button"
                            onClick={() => toggleVibe(vibe.name)}
                            style={{
                                backgroundColor: selectedVibes.includes(vibe.name) ? vibe.color : "white",
                                color: selectedVibes.includes(vibe.name) ? "white" : "#2d2d2d",
                                borderColor: selectedVibes.includes(vibe.name) ? vibe.color : "rgba(45,45,45,0.1)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = vibe.color;
                                e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = selectedVibes.includes(vibe.name) ? vibe.color : "white";
                                e.currentTarget.style.color = selectedVibes.includes(vibe.name) ? "white" : "#2d2d2d";
                            }}
                            className="p-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] hover:shadow-lg border-2"
                        >
                            {selectedVibes.includes(vibe.name) && (
                                <Check className="inline w-4 h-4 mr-1" />
                            )}

                            {vibe.name}
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
                            onClick={() => togglePrice(price)}
                            className={`py-4 rounded-2xl font-black transition-all hover:scale-[1.02] ${priceRange.includes(price)
                                ? "bg-[#FF5733] text-white shadow-xl"
                                : "bg-white border-2 border-[#2d2d2d]/10 text-[#2d2d2d]"
                                }`}
                        >
                            {price}
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