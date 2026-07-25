import { useNavigate } from 'react-router-dom';

const vibes = [
    { name: 'Date Night', color: '#FF6B9D', description: 'Romantic' },
    { name: 'With Friends', color: '#FF8C42', description: 'Lively' },
    { name: 'Family Dinner', color: '#3AAFA9', description: 'Relaxed' },
    { name: 'Hidden Gems', color: '#E8B923', description: 'Discover' },
    { name: 'Rooftop Views', color: '#2C7873', description: 'Scenic' },
    { name: 'Trendy Bars', color: '#7D1935', description: 'Nightlife' },
    { name: 'Wine & Dine', color: '#6C5B7B', description: 'Elegant' },
    { name: 'Outdoor Seating', color: '#C8E64A', description: 'Fresh Air' },
];

const VibeSection = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 px-12 bg-[#FAFAFA]">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h2 className="text-6xl font-black text-[#2d2d2d] mb-3 tracking-tight">
                        Browse by Vibe
                    </h2>

                    <p className="text-xl text-[#2d2d2d]/50 font-medium">
                        Perfect places for every occasion
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-5">
                    {vibes.map((vibe) => (
                        <button
                            type="button"
                            key={vibe.name}
                            onClick={() =>
                                navigate(`/explore?vibe=${encodeURIComponent(vibe.name)}`)
                            }
                            className="group p-8 bg-white rounded-3xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl text-left border-l-8"
                            style={{ borderColor: vibe.color }}
                        >
                            <div className="mb-3">
                                <span
                                    className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white"
                                    style={{ backgroundColor: vibe.color }}
                                >
                                    {vibe.description}
                                </span>
                            </div>

                            <h3 className="text-3xl font-black text-[#2d2d2d] tracking-tight">
                                {vibe.name}
                            </h3>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VibeSection;