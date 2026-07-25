import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
    const auth = useAuth();

    if (!auth) {
        return null;
    }

    const { user } = auth;

    return (
        <footer className="bg-[#FAFAFA] border-t border-[#2d2d2d]/5">
            <div className="max-w-7xl mx-auto px-6 py-6">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    <Link
                        to="/"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <span className="text-[28px] font-black tracking-[-0.03em]">
                            <span className="text-[#2d2d2d]">Tasty</span>
                            <span className="text-[#FF5733]">Match</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-8">

                        <Link
                            to="/explore"
                            className="font-black text-[#2d2d2d]/70 hover:text-[#FF5733] transition-colors"
                        >
                            Explore
                        </Link>

                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="font-black text-[#2d2d2d]/70 hover:text-[#FF5733] transition-colors"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="font-black text-[#2d2d2d]/70 hover:text-[#FF5733] transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>

                    <p className="text-sm text-[#2d2d2d]/40 whitespace-nowrap">
                        © 2026 TastyMatch
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;