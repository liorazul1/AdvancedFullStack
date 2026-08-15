import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SaveRestaurantButton from "./SaveRestaurantButton";

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

type RestaurantCardProps = {
    restaurant: any;
    isSaved?: boolean;
}

const RestaurantCard = ({
    restaurant,
    isSaved = false,
}: RestaurantCardProps) => {

    const navigate = useNavigate();

    const accentColor =
        cuisineColors[restaurant.cuisine] || "#2C7873";

    const rating = Number(restaurant.rating ?? 0);

    const handleCardClick = () => {
        navigate(`/restaurants/${restaurant._id}`);
    };

    return (
        <article
            onClick={handleCardClick}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
            <div className="relative h-72 overflow-hidden">
                <img
                    src={
                        restaurant.image
                            ? `http://localhost:5000${restaurant.image}`
                            : undefined
                    }
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />

                <span
                    className="absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: accentColor }}
                >
                    {restaurant.cuisine}
                </span>

                <SaveRestaurantButton
                    restaurantId={restaurant._id}
                    initialSaved={isSaved}
                    className="absolute top-5 right-5"
                />
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-3 gap-3">
                    <h3 className="text-2xl font-black text-[#2d2d2d] leading-tight line-clamp-2">
                        {restaurant.name}
                    </h3>

                    <span className="font-bold text-[#2d2d2d]/60 whitespace-nowrap">
                        {restaurant.priceRange}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-[#2d2d2d]/60 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.city}</span>
                </div>

                <p className="text-[#2d2d2d]/60 line-clamp-2 mb-6">
                    {restaurant.description || "No description available."}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Star
                            className="w-5 h-5 fill-current"
                            style={{ color: accentColor }}
                        />

                        <span className="font-black text-[#2d2d2d]">
                            {rating.toFixed(1)}
                        </span>
                    </div>

                    <span className="font-bold text-[#2d2d2d] group-hover:translate-x-1 transition-transform">
                        View →
                    </span>
                </div>
            </div>
        </article>
    );
};

export default RestaurantCard;