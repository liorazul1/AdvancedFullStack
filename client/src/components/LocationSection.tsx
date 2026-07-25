import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const locations = [
    { name: 'Tel Aviv', color: '#FF5733'},
    { name: 'Jerusalem', color: '#7D1935'},
    { name: 'Haifa', color: '#3AAFA9'},
    { name: 'Eilat', color: '#E8B923'},
    { name: 'Herzliya', color: '#FF6B9D'},
    { name: 'Netanya', color: '#2C7873'},
    { name: 'Beer Sheva', color: '#FF8C42'},
    { name: 'Ashdod', color: '#C8E64A'},
];

const LocationSection = () => {
    const navigate = useNavigate();

    const handleLocationClick = (locationName: string) => {
        navigate(`/explore?location=${encodeURIComponent(locationName)}`);
    };

    return (
        <section className="py-24 px-12 bg-[#FAFAFA]">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h2 className="text-6xl font-black text-[#2d2d2d] mb-3 tracking-tight">
                        Browse by Location
                    </h2>

                    <p className="text-xl text-[#2d2d2d]/50 font-medium">
                        Discover amazing restaurants across Israel
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-5">
                    {locations.map((location) => (
                        <button
                            key={location.name}
                            onClick={() => handleLocationClick(location.name)}
                            className="group relative p-10 rounded-3xl hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl text-left overflow-hidden"
                            style={{ backgroundColor: location.color }}
                        >
                            <div className="absolute top-6 right-6 opacity-20">
                                <MapPin className="w-16 h-16 text-white" />
                            </div>

                            <h3 className="text-4xl font-black text-white tracking-tight mb-2 relative z-10">
                                {location.name}
                            </h3>

                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocationSection;