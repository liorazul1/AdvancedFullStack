// מייבא את ה-Hook המותאם אישית לשליפת נתונים מהשרת
import { useFetch } from '../hooks/useFetch';

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
  const {
    data: restaurants,
    loading,
    error,
    refetch,
  } = useFetch('/restaurants');


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