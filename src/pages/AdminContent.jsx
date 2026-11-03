import { useAuth } from "../context/AuthContext";

const AdminContent = () => {
    const { isAdmin } = useAuth();
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-linear-to-r from-gray-800 to-gray-400 px-4 py-10 text-white sm:px-6">
            {isAdmin && (<div className="w-full max-w-4xl rounded-2xl border p-6 transition-all duration-1000 hover:scale-[0.98] hover:bg-gray-800 sm:p-10 sm:hover:scale-95 sm:rounded-full">
                <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Hello Admin!!</h1>
                <p className="w-full text-sm tracking-widest text-white sm:text-base">
                    Your control center is ready. Manage products, monitor activity, and keep
                    the store performing at its best. Let’s make today productive and impactful.
                </p>
            </div>)}


            {!isAdmin && (<div className="w-full max-w-3xl rounded-2xl border p-6 transition-all duration-1000 hover:scale-[0.98] hover:bg-gray-800 sm:p-10 sm:hover:scale-95 sm:rounded-full">
                <h1 className="mb-4 text-2xl font-bold sm:text-3xl">Hello User!!</h1>
                <p className="w-full text-sm tracking-widest text-white sm:text-base">
                    This area is restricted to authorized administrators.
                    Please log in to access the dashboard and manage the platform.
                </p>
            </div>)}
        </div>
    )
}
export default AdminContent;