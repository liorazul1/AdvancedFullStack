import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../store/restaurantsSlice';
import type { RootState, AppDispatch } from '../store/store';

// ייבוא קומפוננטות
import HeroSection from '../components/HeroSection';
import CuisineSection from '../components/CuisineSection';
import LocationSection from '../components/LocationSection';
import VibeSection from '../components/VibeSection';
import RestaurantCard from '../components/RestaurantCard';


// מייבא את קומפוננטת הטעינה
import LoadingSpinner from '../components/LoadingSpinner';
// מייבא את קומפוננטת הצגת השגיאות
import ErrorMessage from '../components/ErrorMessage';

function Home() {

  // שליפת רשימת המסעדות מהשרת
  const dispatch = useDispatch<AppDispatch>();

  const {
    restaurants,
    loading,
    error,
  } = useSelector((state: RootState) => state.restaurants);


  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);


  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage />;;

  return (
    <>
      <HeroSection />
      <CuisineSection />
      <LocationSection />
      <VibeSection />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants?.map((restaurant: any) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;