import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-10">

                <h1 className="text-4xl font-black text-[#2d2d2d] tracking-tight mb-3">
                    Log In
                </h1>

                <p className="text-lg text-[#2d2d2d]/50 font-medium mb-8">
                    Welcome back! Log in to continue.
                </p>

                <LoginForm />

            </div>
        </div>
    );
};

export default Login;