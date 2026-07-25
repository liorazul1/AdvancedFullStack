import RegisterForm from "../components/RegisterForm";

const Register = () => {
    return (
        <main className="min-h-screen bg-white px-6 py-20">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-[#2d2d2d]/5 p-10">

                    <h1 className="text-4xl font-black text-[#2d2d2d] mb-3 tracking-tight">
                        Sign Up
                    </h1>

                    <p className="text-lg text-[#2d2d2d]/50 font-medium mb-8">
                        Create your account and personalize your dining experience.
                    </p>

                    <RegisterForm />

                </div>
            </div>
        </main>
    );
};

export default Register;