import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Upload } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SaveRestaurantButton from "../components/SaveRestaurantButton";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace("/api", "");

const cuisineColors: Record<string, string> = {
    Italian: "#FF5733",
    Asian: "#7D1935",
    Burgers: "#C8E64A",
    Cocktails: "#E8B923",
    Cafes: "#FF6B9D",
    Desserts: "#2C7873",
    Mexican: "#FF8C42",
    Vegan: "#3AAFA9",
};


function RestaurantDetails() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { user } = useAuth();
    const [isSaved, setIsSaved] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [currentImage, setCurrentImage] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);

    const {
        data: restaurant,
        loading,
        error
    } = useFetch(`/restaurants/${id}`);


    const {
        data: reviews
    } = useFetch(`/reviews/restaurant/${id}`);

    useEffect(() => {
        if (!user || !id) {
            setIsSaved(false);
            return;
        }

        api
            .get("/users/profile")
            .then((res) => {
                const savedRestaurants = res.data.data.savedRestaurants || [];

                const isRestaurantSaved = savedRestaurants.some(
                    (restaurant: any) =>
                        restaurant._id === id || restaurant === id
                );

                setIsSaved(isRestaurantSaved);
            })
            .catch(() => {
                setIsSaved(false);
            });
    }, [user, id]);

    useEffect(() => {
        if (restaurant?.image) {
            setCurrentImage(restaurant.image);
        }
    }, [restaurant]);

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file || !restaurant?._id) {
            return;
        }

        const data = new FormData();
        data.append("image", file);

        try {
            setUploadingImage(true);

            const response = await api.put(
                `/restaurants/${restaurant._id}`,
                data
            );

            setCurrentImage(response.data.data.image);
        } catch (error) {
            console.error("Failed to update restaurant image", error);
        } finally {
            setUploadingImage(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error) return <ErrorMessage />;

    if (!restaurant) return null;



    const accentColor =
        cuisineColors[restaurant.cuisine] || "#FF5733";

    const imageUrl = currentImage
        ? `${SERVER_URL}${currentImage}`
        : "https://placehold.co/1080x500?text=Restaurant";

    return (

        <div className="min-h-screen bg-white">
            <div className="relative h-[360px] md:h-[500px]">
                <img
                    src={imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />

                {user && (
                    <>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-4 md:px-5 py-3 rounded-full bg-white text-[#2d2d2d] font-black text-sm md:text-base shadow-xl hover:scale-105 transition-all disabled:opacity-60"
                        >
                            <Upload className="w-5 h-5 text-[#FF5733]" />

                            {uploadingImage ? "Uploading..." : "Replace Image"}
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                <div className="absolute top-5 md:top-8 right-5 md:right-12 z-20 flex gap-3">

                    <SaveRestaurantButton
                        restaurantId={restaurant._id}
                        initialSaved={isSaved}
                    />
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-5 md:px-12 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 lg:gap-12">

                    {/* Main Content */}

                    <main>
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-6 flex-wrap">
                                <span
                                    className="px-5 py-2 rounded-full text-white text-xs font-black uppercase tracking-wider"
                                    style={{
                                        backgroundColor: accentColor
                                    }}
                                >
                                    {restaurant.cuisine}
                                </span>



                                <span className="text-2xl font-black text-[#2d2d2d]/50">
                                    {restaurant.priceRange}
                                </span>



                                <span className="px-4 py-2 bg-[#2d2d2d]/5 rounded-full flex items-center gap-2 font-bold text-[#2d2d2d]/60">

                                    <MapPin className="w-4 h-4" />

                                    {restaurant.city}

                                </span>

                            </div>


                            <h1 className="text-4xl md:text-6xl font-black text-[#2d2d2d] tracking-tight mb-6">
                                {restaurant.name}
                            </h1>


                            <div className="flex items-center gap-3 md:gap-4 mb-8 flex-wrap">
                                <Star
                                    className="w-8 h-8 fill-current"
                                    style={{
                                        color: accentColor
                                    }}
                                />

                                <span className="text-3xl md:text-4xl font-black text-[#2d2d2d]">
                                    {restaurant.rating?.toFixed(1)}
                                </span>

                                <span className="text-lg font-bold text-[#2d2d2d]/50">
                                    ({restaurant.reviewCount} reviews)
                                </span>
                            </div>

                            <p className="text-lg md:text-xl leading-relaxed font-medium text-[#2d2d2d]/70">
                                {restaurant.description || "No description available."}
                            </p>
                        </div>

                        {/* Vibes */}

                        {restaurant.vibes?.length > 0 && (

                            <div className="mb-10">
                                <h2 className="text-3xl font-black mb-5 text-[#2d2d2d]">
                                    Vibes
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {restaurant.vibes.map((vibe: string) => (

                                        <span
                                            key={vibe}
                                            className="px-5 py-3 bg-[#FAFAFA] rounded-2xl font-bold text-[#2d2d2d]"
                                        >
                                            {vibe}
                                        </span>

                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tags */}

                        {restaurant.tags?.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-black mb-5 text-[#2d2d2d]">
                                    Tags
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {restaurant.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-4 py-2 rounded-full border-2 border-[#2d2d2d]/10 font-bold"
                                        >
                                            #{tag}
                                        </span>
                                    ))}

                                </div>
                            </div>

                        )}

                        <button
                            onClick={() =>
                                navigate(`/restaurants/${id}/rate`)
                            }
                            className="w-full md:w-auto px-8 md:px-10 py-4 md:py-5 rounded-3xl text-white font-black text-lg md:text-xl shadow-xl hover:scale-[1.02] transition-all"
                            style={{
                                backgroundColor: accentColor
                            }}
                        >
                            <Star className="inline w-6 h-6 mr-2 fill-white" />
                            Rate This Restaurant
                        </button>

                        {/* Reviews */}
                        <section className="mt-16">
                            <h2 className="text-4xl font-black mb-8 text-[#2d2d2d]">
                                Reviews
                            </h2>
                            {reviews?.length ? (
                                <div className="space-y-6">
                                    {reviews.map((review: any) => (
                                        <div
                                            key={review._id}
                                            className="p-8 rounded-3xl border border-[#2d2d2d]/5 shadow-lg"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <h3 className="text-xl font-black">
                                                    {review.user?.username || "Anonymous"}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <Star
                                                        className="w-5 h-5 fill-current"
                                                        style={{
                                                            color: accentColor
                                                        }}
                                                    />

                                                    <span className="font-black">
                                                        {review.rating}
                                                    </span>

                                                </div>
                                            </div>

                                            <p className="text-[#2d2d2d]/70 font-medium">
                                                {review.comment || "No comment"}
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            ) : (
                                <p className="text-lg text-[#2d2d2d]/50 font-medium">
                                    No reviews yet. Be the first to review this restaurant!
                                </p>
                            )}
                        </section>
                    </main>

                    {/* Sidebar */}

                    <aside>

                        <div className="lg:sticky lg:top-24 p-6 md:p-8 rounded-3xl shadow-xl border border-[#2d2d2d]/5">

                            <h2 className="text-2xl font-black mb-6">
                                Information
                            </h2>
                            <div className="space-y-6">

                                <div>
                                    <p className="text-sm font-black text-[#2d2d2d]/50 uppercase">
                                        Cuisine
                                    </p>

                                    <p className="font-bold">
                                        {restaurant.cuisine}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-[#2d2d2d]/50 uppercase">
                                        Location
                                    </p>

                                    <p className="font-bold">
                                        {restaurant.city}
                                    </p>

                                </div>
                                <div>
                                    <p className="text-sm font-black text-[#2d2d2d]/50 uppercase">
                                        Price Range
                                    </p>

                                    <p className="font-bold">
                                        {restaurant.priceRange}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );

}

export default RestaurantDetails;