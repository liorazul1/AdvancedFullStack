import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";
import api from "../services/api";

// מייבא קומפוננטות טעינה ושגיאה
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";


function Profile() {

    // שליפת פרטי המשתמש המחובר
    const {
        data: user,
        loading,
        error,
        refetch,
    } = useFetch("/users/profile");

    const [isEditing, setIsEditing] = useState(false);

    // שומר האם המשתמש נמצא במצב עריכת העדפות
    const [isEditingPreferences, setIsEditingPreferences] = useState(false);


    // שומר את העדפות המשתמש בזמן עריכה לפני שמירה לשרת
    const [preferences, setPreferences] = useState({
        favoriteCuisines: [] as string[],
        favoriteVibes: [] as string[],
        priceRangePreference: "$$",
    });

    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });

    // מעדכן את נתוני העריכה כאשר פרטי המשתמש נטענים מהשרת
    useEffect(() => {

        if (user) {

            // מילוי השדות של עריכת פרטים אישיים
            setFormData({
                username: user.username,
                email: user.email,
            });


            // מילוי ההעדפות הקיימות של המשתמש
            setPreferences({
                favoriteCuisines: user.favoriteCuisines || [],
                favoriteVibes: user.favoriteVibes || [],
                priceRangePreference: user.priceRangePreference || "$$",
            });

        }

    }, [user]);

    const handleSaveProfile = async () => {

        try {

            await api.put("/users/profile", formData);

            await refetch();

            setIsEditing(false);

        } catch (error) {

            console.log(error);

        }

    };

    // שינוי בחירה של מטבח או וייב בזמן עריכה
    const togglePreference = (
        type: "favoriteCuisines" | "favoriteVibes",
        value: string
    ) => {

        setPreferences((prev) => ({

            ...prev,

            [type]: prev[type].includes(value)

                ? prev[type].filter(item => item !== value)

                : [...prev[type], value]

        }));

    };

    // שמירת העדפות המשתמש בשרת
    const handleSavePreferences = async () => {

        try {

            await api.put(
                "/users/profile",
                preferences
            );


            await refetch();


            setIsEditingPreferences(false);


        } catch (error) {

            console.log(error);

        }

    };

    const cuisineColors: any = {
        Italian: "#FF5733",
        Japanese: "#7D1935",
        French: "#FF6B9D",
        Mediterranean: "#3AAFA9",
        American: "#C8E64A",
        Fusion: "#E8B923",
    };

    const vibeColors: any = {
        Romantic: "#FF6B9D",
        Family: "#3AAFA9",
        Trendy: "#7D1935",
        Outdoor: "#C8E64A",
        "Hidden Gems": "#E8B923",
        Rooftop: "#2C7873",
    };

    // רשימת המטבחים האפשריים לבחירה בעריכת העדפות
    const cuisineOptions = [
        "Italian",
        "Japanese",
        "French",
        "Mediterranean",
        "American",
        "Fusion",
    ];

    // רשימת הוייבים האפשריים לבחירה בעריכת העדפות
    const vibeOptions = [
        "Romantic",
        "Family",
        "Trendy",
        "Outdoor",
        "Hidden Gems",
        "Rooftop",
    ];

    // רשימת טווחי המחירים האפשריים לבחירה
    const priceOptions = [
        "$",
        "$$",
        "$$$",
        "$$$$",
    ];


    // בזמן טעינה מציג מסך טעינה
    if (loading) return <LoadingSpinner />;


    // במקרה של שגיאה מציג הודעת שגיאה
    if (error) return <ErrorMessage />;



    return (

        <div className="min-h-screen bg-white px-6 py-20">

            <div className="max-w-4xl mx-auto">


                <h1 className="text-5xl font-black text-[#2d2d2d] mb-12">
                    My Profile
                </h1>

                <div className="flex flex-wrap gap-4 mb-12">

                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-3
                         bg-[#FF5733]
                         text-white 
                         font-black
                         rounded-2xl
                         shadow-lg
                         hover:scale-105
                         hover:shadow-xl
                         transition-all"

                    >
                        ✏️ Edit Profile
                    </button>


                    <button
                        onClick={() => setIsEditingPreferences(true)}
                        className="px-6 py-3
                        bg-[#2d2d2d]
                         text-white
                         font-black
                         rounded-2xl
                         shadow-lg
                         hover:scale-105
                         hover:bg-[#FF5733]
                         transition-all"
                    >

                        🍽️ Edit Preferences
                    </button>


                    <button
                        className="
                        px-6 py-3
                        bg-[#FAFAFA]
                        text-[#2d2d2d]
                        font-black
                        rounded-2xl
                        border-2 border-[#2d2d2d]/10
                        hover:border-[#FF5733]
                        hover:text-[#FF5733]
                        transition-all"
                    >
                        🔐 Change Password
                    </button>

                </div>
                {
                    isEditing && (

                        <div className="flex gap-4 mb-12">

                            <button
                                onClick={handleSaveProfile}
                                className="
                    px-6 py-3
                    bg-[#FF5733]
                    text-white
                    font-black
                    rounded-2xl
                    hover:scale-105
                    transition-all
                "
                            >
                                Save Changes
                            </button>


                            <button
                                onClick={() => setIsEditing(false)}
                                className="
                    px-6 py-3
                    bg-[#FAFAFA]
                    text-[#2d2d2d]
                    font-black
                    rounded-2xl
                    border-2 border-[#2d2d2d]/10
                    hover:border-[#FF5733]
                    transition-all
                "
                            >
                                Cancel
                            </button>

                        </div>

                    )
                }



                {/* פרטים אישיים */}
                <section className="bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-10 mb-8">


                    <h2 className="text-2xl font-black text-[#2d2d2d] mb-8">
                        Personal Information
                    </h2>


                    <div className="space-y-5">


                        <div>
                            <p className="text-sm font-black uppercase text-[#2d2d2d]/50">
                                Username
                            </p>

                            {
                                isEditing ? (

                                    <input
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value
                                            })
                                        }
                                        className="
                                        w-full
                                        px-5
                                        py-3
                                        rounded-2xl
                                        bg-[#FAFAFA]
                                        border-2
                                         border-[#2d2d2d]/10
                                         focus:border-[#FF5733]
                                         focus:outline-none"
                                    />

                                ) : (

                                    <p className="text-xl font-bold text-[#2d2d2d]">
                                        {user?.username}
                                    </p>

                                )
                            }
                        </div>



                        <div>
                            <p className="text-sm font-black uppercase text-[#2d2d2d]/50">
                                Email
                            </p>

                            {
                                isEditing ? (

                                    <input
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value
                                            })
                                        }
                                        className="w-full
                                        px-5
                                        py-3
                                        rounded-2xl
                                        bg-[#FAFAFA]
                                        border-2
                                         border-[#2d2d2d]/10
                                         focus:border-[#FF5733]
                                         focus:outline-none"
                                    />

                                ) : (

                                    <p className="text-xl font-bold text-[#2d2d2d]">
                                        {user?.email}
                                    </p>

                                )
                            }
                        </div>


                    </div>

                </section>





                {/* העדפות אוכל */}
                <section className="bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-10">


                    <h2 className="text-2xl font-black text-[#2d2d2d] mb-8">
                        My Preferences
                    </h2>
                    {
                        isEditingPreferences && (

                            <div className="flex gap-4 mb-8">

                                <button
                                    onClick={handleSavePreferences}
                                    className="px-6 py-3
                                    bg-[#FF5733]
                                    text-white
                                    font-black
                                    rounded-2xl
                                    hover:scale-105
                                    transition-all"
                                >
                                    Save Preferences
                                </button>


                                <button
                                    onClick={() => setIsEditingPreferences(false)}
                                    className="px-6 py-3
                                    bg-[#FAFAFA]
                                    text-[#2d2d2d]
                                    font-black
                                    rounded-2xl
                                    border-2 border-[#2d2d2d]/10
                                    hover:border-[#FF5733]
                                    transition-allד"
                                >
                                    Cancel
                                </button>

                            </div>

                        )
                    }

                    <div className="space-y-6">


                        <div>

                            <p className="text-sm font-black uppercase text-[#2d2d2d]/50 mb-3">
                                Favorite Cuisines
                            </p>


                            <div className="flex flex-wrap gap-3">

                                {
                                    isEditingPreferences ? (

                                        cuisineOptions.map((cuisine: string) => (

                                            <button
                                                key={cuisine}
                                                onClick={() =>
                                                    togglePreference(
                                                        "favoriteCuisines",
                                                        cuisine
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        preferences.favoriteCuisines.includes(cuisine)
                                                            ? cuisineColors[cuisine]
                                                            : "#FAFAFA"
                                                }}
                                                className="
                px-5
                py-2
                rounded-full
                font-bold
                transition-all
                hover:scale-105
                "
                                            >
                                                {cuisine}
                                            </button>

                                        ))


                                    ) : (

                                        user?.favoriteCuisines?.length ? (

                                            user.favoriteCuisines.map((cuisine: string) => (

                                                <span
                                                    key={cuisine}
                                                    style={{
                                                        backgroundColor: cuisineColors[cuisine]
                                                    }}
                                                    className="
                    px-5
                    py-2
                    rounded-full
                    text-white
                    font-bold
                    hover:scale-105
                    hover:shadow-lg
                    transition-all"
                                                >
                                                    {cuisine}
                                                </span>

                                            ))

                                        ) : (

                                            <p className="text-[#2d2d2d]/50">
                                                No cuisines selected yet
                                            </p>

                                        )

                                    )
                                }

                            </div>

                        </div>





                        <div>

                            <p className="text-sm font-black uppercase text-[#2d2d2d]/50 mb-3">
                                Favorite Vibes
                            </p>


                            <div className="flex flex-wrap gap-3">

                                {
                                    isEditingPreferences ? (

                                        vibeOptions.map((vibe: string) => (

                                            <button
                                                key={vibe}
                                                onClick={() =>
                                                    togglePreference(
                                                        "favoriteVibes",
                                                        vibe
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        preferences.favoriteVibes.includes(vibe)
                                                            ? vibeColors[vibe]
                                                            : "#FAFAFA"
                                                }}
                                                className="
                px-5
                py-2
                rounded-full
                font-bold
                transition-all
                hover:scale-105
                "
                                            >
                                                {vibe}
                                            </button>

                                        ))


                                    ) : (

                                        user?.favoriteVibes?.length ? (

                                            user.favoriteVibes.map((vibe: string) => (

                                                <span
                                                    key={vibe}
                                                    style={{
                                                        backgroundColor: vibeColors[vibe]
                                                    }}
                                                    className="
                    px-5
                    py-2
                    rounded-full
                    text-white
                    font-bold
                    hover:scale-105
                    hover:shadow-lg
                    transition-all"
                                                >
                                                    {vibe}
                                                </span>

                                            ))

                                        ) : (

                                            <p className="text-[#2d2d2d]/50">
                                                No vibes selected yet
                                            </p>

                                        )

                                    )
                                }

                            </div>

                        </div>





                        <div>

                            <p className="text-sm font-black uppercase text-[#2d2d2d]/50">
                                Price Preference
                            </p>

                            {
                                isEditingPreferences ? (

                                    <div className="flex gap-3 mt-3">

                                        {priceOptions.map((price) => (

                                            <button
                                                key={price}
                                                onClick={() =>
                                                    setPreferences({
                                                        ...preferences,
                                                        priceRangePreference: price
                                                    })
                                                }
                                                className={`
                    px-5
                    py-3
                    rounded-2xl
                    font-black
                    transition-all
                    hover:scale-105
                    ${preferences.priceRangePreference === price
                                                        ? "bg-[#FF5733] text-white"
                                                        : "bg-[#FAFAFA] text-[#2d2d2d]"
                                                    }
                    `}
                                            >
                                                {price}
                                            </button>

                                        ))}

                                    </div>

                                ) : (

                                    <p className="text-xl font-bold text-[#2d2d2d]">
                                        {user?.priceRangePreference}
                                    </p>

                                )
                            }

                        </div>


                    </div>


                </section>



            </div>

        </div>

    );

}


export default Profile;