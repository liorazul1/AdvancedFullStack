import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white px-5">
      <section className="text-center max-w-xl">
        <p className="text-[#FF5733] font-black text-lg mb-3">
          404
        </p>

        <h1 className="text-4xl md:text-6xl font-black text-[#2d2d2d] mb-5">
          Page not found
        </h1>

        <p className="text-[#2d2d2d]/60 text-lg font-medium mb-8">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#FF5733] text-white font-black hover:bg-[#FF5733]/90 hover:scale-[1.02] transition-all shadow-lg"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default NotFound;