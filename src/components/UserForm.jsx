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
        <div className="absolute top-0 h-full w-full bg-black/10 backdrop-blur-sm z-60">
            <div className="h-full fixed w-[30%] top-0 right-0 bg-white overflow-auto">
                <form
                    className="h-full bg-slate-600"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateUser(userId,userData);
                        setShowUserForm(false);
                    }}
                >
                    <div className="flex items-center justify-between bg-black mb-4">
                        <h1 className="font-bold text-3xl text-white p-4">User info.</h1>
                        <span className="p-4">
                            <i
                                className="text-2xl fa-regular fa-circle-xmark cursor-pointer text-red-600 hover:text-white"
                                onClick={() => setShowUserForm(false)}
                            >
                            </i>
                        </span>
                    </div>
                    <div className="relative flex flex-col m-2">
                        <input
                            id="fname"
                            placeholder=" "
                            type="text"
                            value={userData.fname}
                            onChange={(e) => setUserData({ ...userData, fname: e.target.value })}
                            className="border border-white peer p-4  rounded-md outline-none" />
                        <label
                            htmlFor="fname"
                            className="absolute top-4 left-4 duration-300  font-bold 
                            peer-not-placeholder-shown:top-1 
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-1 
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter first name
                        </label>
                    </div>
                    <div className="relative flex flex-col m-2">
                        <input
                            id="lname"
                            placeholder=" "
                            type="text"
                            value={userData.lname}
                            onChange={(e) => setUserData({ ...userData, lname: e.target.value })}
                            className="border border-white peer p-4  rounded-md outline-none" />
                        <label
                            htmlFor="lname"
                            className="absolute top-4 left-4 duration-300  font-bold
                            peer-not-placeholder-shown:top-1 
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-1 
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter last name
                        </label>
                    </div>
                    <div className="relative flex flex-col m-2">
                        <input
                            id="mobile"
                            placeholder=" "
                            type="text"
                            value={userData.mobile}
                            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                            className="border border-white peer p-4  rounded-md outline-none" />
                        <label
                            htmlFor="mobile"
                            className="absolute top-4 left-4 duration-300  font-bold
                            peer-not-placeholder-shown:top-1 
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-1 
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter mobile number
                        </label>
                    </div>
                    <div className="relative flex flex-col m-2">
                        <input
                            id="email"
                            placeholder=" "
                            type="text"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
                            className="border border-white peer p-4  rounded-md outline-none" />
                        <label
                            htmlFor="email"
                            className="absolute top-4 left-4 duration-300  font-bold
                            peer-not-placeholder-shown:top-1 
                            peer-not-placeholder-shown:text-xs 
                            peer-not-placeholder-shown:font-normal
                            peer-focus:top-1 
                            peer-focus:text-xs
                            peer-focus:font-normal
                            ">
                            Enter email address
                        </label>
                    </div>
                    <button
                        className="border-2 rounded-full px-12 py-2 m-2 font-bold text-xl bg-slate-950 text-white hover:bg-green-800"
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