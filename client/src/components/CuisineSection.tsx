import {
    UtensilsCrossed,
    Coffee,
    Cake,
    Sparkles,
    Wine,
    Leaf,
    Pizza,
    Soup,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Italian', color: '#FF5733',  icon: Pizza },
    { name: 'Asian', color: '#7D1935', icon: Soup },
    { name: 'Burgers', color: '#C8E64A', icon: UtensilsCrossed },
    { name: 'Cocktails', color: '#E8B923', icon: Wine },
    { name: 'Cafes', color: '#FF6B9D', icon: Coffee },
    { name: 'Desserts', color: '#2C7873', icon: Cake },
    { name: 'Mexican', color: '#FF8C42', icon: Sparkles },
    { name: 'Vegan', color: '#3AAFA9', icon: Leaf },
];

const CuisineSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 px-12 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h2 className="text-6xl font-black text-[#2d2d2d] mb-3 tracking-tight">
                        Explore by Cuisine
                    </h2>

                    <p className="text-xl text-[#2d2d2d]/50 font-medium">
                        Find exactly what you're craving
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-5">
                    {categories.map((category) => {
                        const Icon = category.icon;

                        return (
                            <button
                                key={category.name}
                                onClick={() =>
                                    navigate(
                                        `/explore?cuisine=${encodeURIComponent(category.name)}`
                                    )
                                }
                                className="group relative p-10 rounded-3xl hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl text-left overflow-hidden"
                                style={{ backgroundColor: category.color }}
                            >
                                <Icon className="w-10 h-10 text-white/90 mb-4 stroke-[2.5]" />

                                <h3 className="text-4xl font-black text-white tracking-tight mb-2">
                                    {category.name}
                                </h3>

                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CuisineSection;