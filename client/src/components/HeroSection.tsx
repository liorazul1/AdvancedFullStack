import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            navigate('/explore');
            return;
        }

        navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`);
    };

    return (
        <section className="relative bg-white py-24 px-12 border-b border-[#2d2d2d]/5">
            <div className="max-w-[1400px] mx-auto text-center">
                <h1 className="text-[100px] font-black mb-6 leading-[0.9] tracking-[-0.05em] text-[#2d2d2d]">
                    Find your next
                    <br />
                    <span className="text-[#FF5733]">favorite spot</span>
                </h1>

                <p className="text-2xl text-[#2d2d2d]/50 mb-14 max-w-3xl mx-auto font-bold">
                    Community-rated restaurants. Save, rate, discover.
                </p>

                <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-[#2d2d2d]/30" />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name, cuisine, location..."
                            className="w-full pl-20 pr-36 py-7 bg-[#FAFAFA] rounded-3xl border-2 border-[#2d2d2d]/5 focus:border-[#2d2d2d]/20 focus:outline-none focus:bg-white transition-all text-[#2d2d2d] placeholder-[#2d2d2d]/30 text-xl font-medium shadow-sm"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 px-7 py-4 bg-[#FF5733] text-white font-black rounded-2xl hover:bg-[#FF5733]/90 hover:scale-[1.02] transition-all"
                        >
                            Search
                        </button>
                    </div>
                </form>


                <div className="flex items-center justify-center gap-5">
                    <button
                        onClick={() => navigate('/explore')}
                        className="px-10 py-5 bg-[#2d2d2d] text-white hover:bg-[#2d2d2d]/90 font-black text-lg rounded-3xl hover:scale-[1.02] transition-all shadow-xl"
                    >
                        Explore
                    </button>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;