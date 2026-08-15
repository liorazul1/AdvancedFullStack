import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

import SaveRestaurantButton from "../components/SaveRestaurantButton";


const cuisineColors: Record<string, string> = {
    Italian: "#FF5733",
    Asian: "#7D1935",
    Japanese: "#7D1935",
    French: "#FF6B9D",
    Contemporary: "#FF5733",
    Mediterranean: "#3AAFA9",
    American: "#C8E64A",
    Fusion: "#E8B923",
    International: "#2C7873",
};



function RestaurantDetails() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


    const {
        data: restaurant,
        loading,
        error
    } = useFetch(`/restaurants/${id}`);


    const {
        data: reviews
    } = useFetch(`/reviews/restaurant/${id}`);



    if (loading) return <LoadingSpinner />;

    if (error) return <ErrorMessage />;

    if (!restaurant) return null;



    const accentColor =
        cuisineColors[restaurant.cuisine] || "#FF5733";

    const imageUrl = restaurant.image
        ? `http://localhost:5000${restaurant.image}`
        : "https://placehold.co/1080x500?text=Restaurant";

    return (

        <div className="min-h-screen bg-white">


            <div className="relative h-[500px]">


                <img
                    src={imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />


                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />



                <div className="absolute top-8 right-12 flex gap-3">


                    <SaveRestaurantButton
                        restaurantId={restaurant._id}
                    />


                </div>


            </div>





            <div className="max-w-[1400px] mx-auto px-12 py-16">


                <div className="grid grid-cols-[1fr_350px] gap-12">



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





                            <h1 className="text-6xl font-black text-[#2d2d2d] tracking-tight mb-6">
                                {restaurant.name}
                            </h1>





                            <div className="flex items-center gap-4 mb-8">


                                <Star
                                    className="w-8 h-8 fill-current"
                                    style={{
                                        color: accentColor
                                    }}
                                />


                                <span className="text-4xl font-black text-[#2d2d2d]">
                                    {restaurant.rating?.toFixed(1)}
                                </span>



                                <span className="text-lg font-bold text-[#2d2d2d]/50">
                                    ({restaurant.reviewCount} reviews)
                                </span>


                            </div>




                            <p className="text-xl leading-relaxed font-medium text-[#2d2d2d]/70">
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

                            className="px-10 py-5 rounded-3xl text-white font-black text-xl shadow-xl hover:scale-[1.02] transition-all"

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


                        <div className="sticky top-24 p-8 rounded-3xl shadow-xl border border-[#2d2d2d]/5">


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