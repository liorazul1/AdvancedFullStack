import { useState } from "react";
import { Filter, Search, Star } from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../store/restaurantsSlice";
import type { RootState, AppDispatch } from "../store/store";
import RestaurantCard from "../components/RestaurantCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import AddRestaurant from "../components/AddRestaurant";


const priceRanges = ["$", "$$", "$$$", "$$$$"];


const cuisineOptions = [
  { name: "Italian", color: "#FF5733" },
  { name: "Asian", color: "#7D1935" },
  { name: "Japanese", color: "#7D1935" },
  { name: "French", color: "#FF6B9D" },
  { name: "Mediterranean", color: "#3AAFA9" },
  { name: "American", color: "#C8E64A" },
  { name: "Fusion", color: "#E8B923" },
];


const vibeOptions = [
  { name: "Romantic", color: "#FF6B9D" },
  { name: "Family", color: "#3AAFA9" },
  { name: "Trendy", color: "#7D1935" },
  { name: "Outdoor", color: "#C8E64A" },
  { name: "Hidden Gems", color: "#E8B923" },
  { name: "Rooftop", color: "#2C7873" },
];



function ExplorePage() {

  const dispatch = useDispatch<AppDispatch>();

  const {
    restaurants,
    loading,
    error,
  } = useSelector((state: RootState) => state.restaurants);


  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);


  const [search, setSearch] = useState("");

  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);



  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage />;



  const toggleFilter = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {

    setter((prev) =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );

  };



  const filteredRestaurants = restaurants?.filter((restaurant: any) => {

    const searchMatch =
      restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(search.toLowerCase());


    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.includes(restaurant.priceRange);


    const cuisineMatch =
      selectedCuisines.length === 0 ||
      selectedCuisines.includes(restaurant.cuisine);


    const vibeMatch =
      selectedVibes.length === 0 ||
      restaurant.vibes?.some((vibe: string) =>
        selectedVibes.includes(vibe)
      );


    const ratingMatch =
      !selectedRating ||
      restaurant.rating >= selectedRating;


    return (
      searchMatch &&
      priceMatch &&
      cuisineMatch &&
      vibeMatch &&
      ratingMatch
    );

  });



  const clearFilters = () => {
    setSelectedPrices([]);
    setSelectedCuisines([]);
    setSelectedVibes([]);
    setSelectedRating(null);
    setSearch("");
  };



  return (

    <div className="min-h-screen bg-white">

      <div className="max-w-[1400px] mx-auto px-12 py-24">


        <div className="mb-12 flex justify-between items-center">

          <div>
            <h1 className="text-6xl font-black text-[#2d2d2d] tracking-tight mb-3">
              Explore Restaurants
            </h1>

            <p className="text-xl text-[#2d2d2d]/50 font-medium">
              {filteredRestaurants?.length || 0} restaurants found
            </p>
          </div>


          <button
            onClick={() => setShowAddRestaurant(true)}
            className="px-6 py-4 rounded-full bg-[#FF5733] text-white font-black hover:scale-[1.02] transition-all"
          >
            + Suggest Restaurant
          </button>

        </div>

        {showAddRestaurant && (
          <AddRestaurant
            onClose={() => setShowAddRestaurant(false)}
          />
        )}

        <div className="mb-12 relative">

          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#2d2d2d]/40" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants, cities or cuisines..."
            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-[#FAFAFA] border-2 border-[#2d2d2d]/5 focus:outline-none focus:border-[#FF5733] text-lg font-medium"
          />

        </div>



        <div className="grid grid-cols-[280px_1fr] gap-12">


          <aside>

            <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-8">


              <div className="flex justify-between items-center mb-8">

                <h2 className="text-2xl font-black flex items-center gap-2">
                  <Filter />
                  Filters
                </h2>


                <button
                  onClick={clearFilters}
                  className="text-[#FF5733] font-bold text-sm hover:underline"
                >
                  Clear
                </button>

              </div>



              <FilterSection title="Price">

                {priceRanges.map(price => (

                  <FilterButton
                    key={price}
                    active={selectedPrices.includes(price)}
                    onClick={() =>
                      toggleFilter(price, setSelectedPrices)
                    }
                  >
                    {price}
                  </FilterButton>

                ))}

              </FilterSection>



              <FilterSection title="Cuisine">

                {cuisineOptions.map(cuisine => (

                  <FilterButton
                    key={cuisine.name}
                    color={cuisine.color}
                    active={selectedCuisines.includes(cuisine.name)}
                    onClick={() =>
                      toggleFilter(cuisine.name, setSelectedCuisines)
                    }
                  >
                    {cuisine.name}
                  </FilterButton>

                ))}

              </FilterSection>



              <FilterSection title="Vibes">

                {vibeOptions.map(vibe => (

                  <FilterButton
                    key={vibe.name}
                    color={vibe.color}
                    active={selectedVibes.includes(vibe.name)}
                    onClick={() =>
                      toggleFilter(vibe.name, setSelectedVibes)
                    }
                  >
                    {vibe.name}
                  </FilterButton>

                ))}

              </FilterSection>



              <FilterSection title="Rating">

                {[4.5, 4, 3.5].map(rating => (

                  <FilterButton
                    key={rating}
                    active={selectedRating === rating}
                    onClick={() =>
                      setSelectedRating(
                        selectedRating === rating
                          ? null
                          : rating
                      )
                    }
                  >
                    {rating}
                    <Star className="inline w-4 h-4 fill-current ml-1" />
                  </FilterButton>

                ))}

              </FilterSection>


            </div>

          </aside>



          <section>

            {filteredRestaurants?.length ? (

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredRestaurants.map((restaurant: any) => (

                  <RestaurantCard
                    key={restaurant._id}
                    restaurant={restaurant}
                  />

                ))}

              </div>

            ) : (

              <div className="text-center py-24">

                <h2 className="text-4xl font-black text-[#2d2d2d]/20">
                  No restaurants found
                </h2>

              </div>

            )}

          </section>


        </div>

      </div>

    </div>

  );
}



function FilterSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {

  return (

    <div className="mb-8">

      <h3 className="text-sm font-black uppercase tracking-wider mb-4">
        {title}
      </h3>

      <div className="space-y-2">
        {children}
      </div>

    </div>

  );

}



function FilterButton({
  children,
  active,
  color,
  onClick
}: {
  children: React.ReactNode;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {

  return (

    <button

      onClick={onClick}

      className={`w-full px-4 py-3 rounded-xl font-bold text-left transition-all hover:scale-[1.02] hover:shadow-md ${active
        ? color
          ? "text-white shadow-xl"
          : "bg-[#2d2d2d] text-white shadow-xl"
        : "bg-[#FAFAFA] text-[#2d2d2d]"
        }`}

      style={
        active && color
          ? { backgroundColor: color }
          : {}
      }


      onMouseEnter={(e) => {

        if (!active && color) {

          e.currentTarget.style.backgroundColor = color;
          e.currentTarget.style.color = "white";

        }

      }}


      onMouseLeave={(e) => {

        if (!active && color) {

          e.currentTarget.style.backgroundColor = "#FAFAFA";
          e.currentTarget.style.color = "#2d2d2d";

        }

      }}

    >

      {children}

    </button>

  );

}


export default ExplorePage;