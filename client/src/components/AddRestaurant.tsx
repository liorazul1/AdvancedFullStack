import { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import { useDispatch } from "react-redux";

import api from "../services/api";
import { fetchRestaurants } from "../store/restaurantsSlice";
import type { AppDispatch } from "../store/store";


// הגדרת מבנה הנתונים שמועבר לקומפוננטה
// onClose מאפשר לסגור את טופס הוספת המסעדה
interface AddRestaurantProps {
    onClose: () => void;
}

const cuisineOptions = [
    "Italian",
    "Asian",
    "Burgers",
    "Cocktails",
    "Cafes",
    "Desserts",
    "Mexican",
    "Vegan",
];

const locationOptions = [
    "Tel Aviv",
    "Jerusalem",
    "Haifa",
    "Eilat",
    "Herzliya",
    "Netanya",
    "Beer Sheva",
    "Ashdod",
];

const vibeOptions = [
    { name: "Date Night", color: "#FF6B9D" },
    { name: "With Friends", color: "#FF8C42" },
    { name: "Family Dinner", color: "#3AAFA9" },
    { name: "Hidden Gems", color: "#E8B923" },
    { name: "Rooftop Views", color: "#2C7873" },
    { name: "Trendy Bars", color: "#7D1935" },
    { name: "Wine & Dine", color: "#6C5B7B" },
    { name: "Outdoor Seating", color: "#C8E64A" },
];

const AddRestaurant = ({ onClose }: AddRestaurantProps) => {

    // מאפשר לבצע פעולות מול Redux Store
    const dispatch = useDispatch<AppDispatch>();


    // שמירת פרטי המסעדה שהוזנו בטופס
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cuisine: "",
        city: "",
        vibes: [] as string[],
        priceRange: "$$",
    });

    // שמירת קובץ התמונה שנבחר
    const [image, setImage] = useState<File | null>(null);



    // עדכון ערכי הטופס בהתאם לשדה שהשתנה
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const toggleVibe = (vibe: string) => {
        setFormData((prev) => ({
            ...prev,
            vibes: prev.vibes.includes(vibe)
                ? prev.vibes.filter((item) => item !== vibe)
                : [...prev.vibes, vibe],
        }));
    };

    // שליחת הטופס ויצירת מסעדה חדשה
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        // יצירת FormData לצורך שליחת נתונים וקובץ תמונה יחד
        const data = new FormData();


        // הוספת נתוני המסעדה ל-FormData
        Object.entries(formData).forEach(([key, value]) => {

            if (key !== "vibes") {
                data.append(key, value as string);
            }

        });

        formData.vibes.forEach((vibe) => {
            data.append("vibes", vibe);
        });



        // הוספת התמונה שנבחרה
        if (image) {

            data.append("image", image);

        }



        try {

            // שליחת בקשה לשרת ליצירת מסעדה חדשה
            await api.post("/restaurants", data);


            // רענון רשימת המסעדות לאחר יצירה מוצלחת
            dispatch(fetchRestaurants());


            // סגירת הטופס
            onClose();


        } catch (error) {

            console.error("Failed to create restaurant", error);

        }

    };



    return (

        <div className="mb-12 bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-10">


            {/* כותרת הטופס וכפתור סגירה */}
            <div className="flex justify-between items-start mb-8">


                <div>

                    <h2 className="text-4xl font-black text-[#2d2d2d]">
                        Suggest a Restaurant
                    </h2>


                    <p className="text-[#2d2d2d]/50 text-lg font-medium mt-2">
                        Share a place you love with the TastyMatch community
                    </p>

                </div>



                <button
                    onClick={onClose}
                    className="p-3 rounded-full hover:bg-[#FAFAFA] transition-colors"
                >

                    <X className="w-6 h-6 text-[#2d2d2d]" />

                </button>


            </div>




            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >


                <input
                    name="name"
                    placeholder="Restaurant name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733]"
                />



                <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733]"
                >
                    <option value="" disabled>
                        Select city
                    </option>

                    {locationOptions.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>



                <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    required
                    className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733]"
                >
                    <option value="" disabled>
                        Select cuisine
                    </option>

                    {cuisineOptions.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </select>


                <select
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                    className="p-4 rounded-2xl bg-[#FAFAFA] border border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733]"
                >

                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>

                </select>

                <div className="md:col-span-2">
                    <p className="font-black text-[#2d2d2d] mb-3">
                        Restaurant vibes
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {vibeOptions.map((vibe) => {
                            const isSelected = formData.vibes.includes(vibe.name);

                            return (
                                <button
                                    type="button"
                                    key={vibe.name}
                                    onClick={() => toggleVibe(vibe.name)}
                                    className={`px-5 py-3 rounded-full font-black text-sm transition-all hover:scale-[1.03] ${isSelected
                                            ? "text-white shadow-lg"
                                            : "bg-[#FAFAFA] text-[#2d2d2d] border border-[#2d2d2d]/5"
                                        }`}
                                    style={
                                        isSelected
                                            ? { backgroundColor: vibe.color }
                                            : {}
                                    }
                                >
                                    {vibe.name}
                                </button>
                            );
                        })}
                    </div>
                </div>


                <textarea
                    name="description"
                    placeholder="Tell us about this restaurant..."
                    value={formData.description}
                    onChange={handleChange}
                    className="md:col-span-2 p-4 rounded-2xl bg-[#FAFAFA] border border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733] min-h-[120px]"
                />




                {/* בחירת תמונה מהמחשב */}
                <label className="md:col-span-2 flex items-center gap-3 p-5 rounded-2xl bg-[#FAFAFA] cursor-pointer hover:bg-[#f5f5f5] transition-colors">

                    <Upload className="text-[#FF5733]" />


                    <span className="font-bold text-[#2d2d2d]/70">

                        {image
                            ? image.name
                            : "Upload restaurant image"
                        }

                    </span>



                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                            setImage(e.target.files?.[0] || null)
                        }
                    />


                </label>




                <button
                    type="submit"
                    className="md:col-span-2 flex items-center justify-center gap-2 py-4 rounded-full bg-[#FF5733] text-white font-black text-lg hover:scale-[1.02] transition-all"
                >

                    <Plus className="w-5 h-5" />

                    Add Restaurant

                </button>


            </form>


        </div>

    );

};


export default AddRestaurant;