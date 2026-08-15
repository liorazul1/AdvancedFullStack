import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
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

  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();


  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      setUserPreferences(null);
      setProfileLoading(false);
      return;
    }

    api
      .get('/users/profile')
      .then((res) => setUserPreferences(res.data.data))
      .catch(() => setUserPreferences(null));
  }, [user]);

  if (loading || authLoading) return <LoadingSpinner />;

  if (error) return <ErrorMessage />;

  const isLoggedIn = Boolean(user);

  const recommendedRestaurants = restaurants?.filter((restaurant: any) => {
    if (!userPreferences) return false;

    return (
      userPreferences.favoriteCuisines?.includes(restaurant.cuisine) ||
      userPreferences.favoriteVibes?.includes(restaurant.vibe) ||
      userPreferences.favoriteCities?.includes(restaurant.city) ||
      userPreferences.priceRangePreference?.includes(restaurant.priceRange)
    );
  });

  const savedRestaurantIds =
    userPreferences?.savedRestaurants?.map((restaurant: any) =>
      restaurant._id || restaurant
    ) || [];

  return (
    <>
      <HeroSection />
      <CuisineSection />
      <LocationSection />
      <VibeSection />

      <section className="max-w-7xl mx-auto px-6 py-16">
        {!isLoggedIn && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get personalized restaurant recommendations
            </h2>
            <p className="text-gray-600 mb-6">
              Log in or create an account to see restaurants that match your taste.
            </p>

            <div className="flex justify-center gap-4">
              <Link to="/login" className="btn-primary">
                Login
              </Link>

              <Link to="/register" className="btn-secondary">
                Register
              </Link>
            </div>
          </div>
        )}

        {isLoggedIn && profileLoading && <LoadingSpinner />}

        {isLoggedIn && !profileLoading && recommendedRestaurants?.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-8">
              Recommended for You
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedRestaurants.map((restaurant: any) => (
                <RestaurantCard
                  key={restaurant._id}
                  restaurant={restaurant}
                  isSaved={savedRestaurantIds.includes(restaurant._id)}
                />
              ))}
            </div>
          </>
        )}

        {isLoggedIn && !profileLoading && recommendedRestaurants?.length === 0 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              No personalized recommendations yet
            </h2>
            <p className="text-gray-600 mb-6">
              Try exploring all restaurants or updating your preferences.
            </p>

            <Link to="/explore" className="btn-primary">
              Explore Restaurants
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default Home;