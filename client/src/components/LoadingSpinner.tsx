// מגדיר את הטיפוס של ה-Props שהקומפוננטה יכולה לקבל
type LoadingSpinnerProps = {
  // הודעת הטעינה שתוצג על המסך (אופציונלית)
  message?: string;
};

// קומפוננטת LoadingSpinner שמציגה הודעת טעינה
function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    // יוצר מיכל שממרכז את התוכן באמצע המסך
    <div className="flex min-h-screen items-center justify-center">

      {/* מציג את הודעת הטעינה */}
      <p className="text-lg font-semibold text-gray-600">
        {message}
      </p>

    </div>
  );
}

// מייצא את הקומפוננטה לשימוש בקבצים אחרים
export default LoadingSpinner;