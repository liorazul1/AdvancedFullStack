// מייבא את Link כדי לעבור בין דפים בלי לרענן את האתר
import { Link } from 'react-router-dom';

// קומפוננטת ניווט זמנית שמופיעה מעל כל הדפים
function Navbar() {
  return (
    <nav>
      <Link to="/">TastyMatch</Link>
      {' | '}
      <Link to="/explore">Explore</Link>
      {' | '}
      <Link to="/login">Login</Link>
      {' | '}
      <Link to="/register">Register</Link>
    </nav>
  );
}

// מייצא את הקומפוננטה לשימוש ב-App.tsx
export default Navbar;