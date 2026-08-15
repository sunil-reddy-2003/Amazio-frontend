import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UserForm = (props) => {
    const { setShowUserForm, userData, setUserData, userId } = props;
    const {setUser} =useAuth();

    const updateUser = async () => {
        try {
            const response = await axios({
                method: "put",
                url: `${import.meta.env.VITE_API_BASE_URL}/api/user/updateuser/${userId}`,
                data: userData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUser(response.data);
            // console.log("inside updateUset with: ", response.data);
        } catch (error) {
            console.error("error occurred while updating user details: ", error.response);
        }
    }
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-black/10 backdrop-blur-sm z-50 flex justify-end">
            <div className="h-full w-full sm:w-[80%] md:w-[50%] lg:w-[30%] bg-white overflow-auto">
                <form
                    className="h-full bg-slate-600"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateUser(userId,userData);
                        setShowUserForm(false);
                    }}
                >
                    <div className="flex items-center justify-between bg-black mb-3 sm:mb-4">
                        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-white p-2 sm:p-3 md:p-4">User info.</h1>
                        <span className="p-2 sm:p-3 md:p-4">
                            <i
                                className="text-lg sm:text-xl md:text-2xl fa-regular fa-circle-xmark cursor-pointer text-red-600 hover:text-white transition-colors"
                                onClick={() => setShowUserForm(false)}
                            >
                            </i>
                        </span>
                    </div>
                    <div className="relative flex flex-col m-2 sm:m-3 md:m-4">
                        <input
                            id="fname"
                            placeholder=" "
                            type="text"
                            value={userData.fname}
                            onChange={(e) => setUserData({ ...userData, fname: e.target.value })}
                            className="border border-white peer p-2 sm:p-3 md:p-4 rounded-md outline-none text-sm sm:text-base" />
                        <label
                            htmlFor="fname"
                            className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 duration-300 font-bold text-xs sm:text-sm
                            peer-not-placeholder-shown:top-0.5 sm:peer-not-placeholder-shown:top-1
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-0.5 sm:peer-focus:top-1
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter first name
                        </label>
                    </div>
                    <div className="relative flex flex-col m-2 sm:m-3 md:m-4">
                        <input
                            id="lname"
                            placeholder=" "
                            type="text"
                            value={userData.lname}
                            onChange={(e) => setUserData({ ...userData, lname: e.target.value })}
                            className="border border-white peer p-2 sm:p-3 md:p-4 rounded-md outline-none text-sm sm:text-base" />
                        <label
                            htmlFor="lname"
                            className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 duration-300 font-bold text-xs sm:text-sm
                            peer-not-placeholder-shown:top-0.5 sm:peer-not-placeholder-shown:top-1
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-0.5 sm:peer-focus:top-1
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter last name
                        </label>
                    </div>
                    <div className="relative flex flex-col m-2 sm:m-3 md:m-4">
                        <input
                            id="mobile"
                            placeholder=" "
                            type="text"
                            value={userData.mobile}
                            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                            className="border border-white peer p-2 sm:p-3 md:p-4 rounded-md outline-none text-sm sm:text-base" />
                        <label
                            htmlFor="mobile"
                            className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 duration-300 font-bold text-xs sm:text-sm
                            peer-not-placeholder-shown:top-0.5 sm:peer-not-placeholder-shown:top-1
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-0.5 sm:peer-focus:top-1
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter mobile number
                        </label>
                    </div>
                    <div className="relative flex flex-col m-2 sm:m-3 md:m-4">
                        <input
                            id="email"
                            placeholder=" "
                            type="text"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="border border-white peer p-2 sm:p-3 md:p-4 rounded-md outline-none text-sm sm:text-base" />
                        <label
                            htmlFor="email"
                            className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 duration-300 font-bold text-xs sm:text-sm
                            peer-not-placeholder-shown:top-0.5 sm:peer-not-placeholder-shown:top-1
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-0.5 sm:peer-focus:top-1
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter email address
                        </label>
                    </div>
                    <button
                        className="border-2 rounded-full px-6 sm:px-8 md:px-12 py-1.5 sm:py-2 m-2 sm:m-3 md:m-4 font-bold text-sm sm:text-base md:text-lg bg-slate-950 text-white hover:bg-green-800 transition-colors"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}
export default UserForm;