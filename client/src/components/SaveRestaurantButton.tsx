import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

type SaveRestaurantButtonProps = {
    restaurantId: string;
    initialSaved?: boolean;
    className?: string;
};

const SaveRestaurantButton = ({
    restaurantId,
    initialSaved = false,
    className = "",
}: SaveRestaurantButtonProps) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [isSaved, setIsSaved] = useState(initialSaved);

    useEffect(() => {
        setIsSaved(initialSaved);
    }, [initialSaved]);

    const handleSaveClick = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        try {
            if (isSaved) {
                await api.delete(`/users/save-restaurant/${restaurantId}`);
                setIsSaved(false);
            } else {
                await api.put(`/users/save-restaurant/${restaurantId}`);
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Failed to update saved restaurant", error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSaveClick}
            className={`w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-110 transition-all ${className}`}
        >
            <Heart
                className="w-5 h-5"
                fill={isSaved ? "#FF5733" : "none"}
                color={isSaved ? "#FF5733" : "#2d2d2d"}
            />
        </button>
    );
};

export default SaveRestaurantButton;