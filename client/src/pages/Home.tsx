// מייבא את ה-Hook המותאם אישית לשליפת נתונים מהשרת
import { useFetch } from '../hooks/useFetch';

// מייבא את קומפוננטת כרטיס המסעדה
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

  // יוצג בהמשך המצגת
  if (loading) return;

  // יוצג בהמשך המצגת
  if (error) return;

  return (
    <>
      {restaurants?.map((restaurant: { _id: string }) => (
        <RestaurantCard key={restaurant._id} />
      ))}
    </>
  );
}

export default Home;