import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Address from "../components/Address";
import api from "../api/api";
import UserForm from "../components/UserForm";

const Profile = () => {
  const { user } = useAuth();
  const [addressList, setAddressList] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formMode, setFormMode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    area: "",
    flat: "",
    landmark: "",
    city: "",
    state: "",
  });

  const [isDefault, setDefaultState] = useState(true);
  const [addressType, setAddressType] = useState("Home");
  const [updateId, setUpdateId] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    mobile: "",
  });


  const getAddresses = async () => {
    try {
      const response = await api({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/addresses/${user.userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const addresses = response.data.data;

      setAddressList(Array.isArray(addresses) ? addresses : []);
    } catch (error) {
      if (error.response?.status === 404) {
        setAddressList([]);
      } else {
        console.error("Error fetching addresses:", error);
      }
    }
  };


  const updateAddress = async (updateId, updateAddress) => {
    try {
      await api({
        method: "put",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/addresses/${user.userId}/${updateId}`,
        data: updateAddress,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await getAddresses();
      setShowAddressForm(false);
    } catch (error) {
      console.error("error occurred while updating address: ", error);
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await api({
        method: "delete",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/addresses/${user.userId}/${addressId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await getAddresses();
    } catch (error) {
      console.error("error occurred while deleting the address: ", error);
    }
  };

  const saveAddress = async (payload) => {
    try {
      await api({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/v1/addresses/${user.userId}`,
        data: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      await getAddresses();
      setShowAddress(true);
      setShowAddressForm(false);

    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center p-4 sm:p-8 md:p-12 lg:p-20 w-full sm:w-[95%] md:w-[85%] lg:w-[70%]">
        <div className="flex flex-col p-3 sm:p-4 md:p-6 m-1 sm:m-2 md:m-3 rounded-md shadow-xl w-full bg-white/70">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl m-1 sm:m-2 p-1 sm:p-2">My Profile</h1>
            <button
              className="font-bold text-sm sm:text-base md:text-lg m-1 sm:m-2 p-1 sm:p-2 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => {
                setUserData({
                  fName: user.fName || "",
                  lName: user.lName || "",
                  email: user.email || "",
                  mobile: user.mobile || "",
                });
                setShowUserForm(true);
              }}
            >
              edit<i className="fa-regular fa-pen-to-square pl-2"></i>
            </button>
          </div>

          <div className="flex flex-col m-1 sm:m-2 text-sm sm:text-base md:text-lg gap-2">
            <div className="flex gap-2 px-1 sm:px-2 flex-col sm:flex-row">
              <p className="w-20 text-left font-bold">User ID</p>
              <p className="text-slate-900 underline underline-offset-3 decoration-dotted decoration-green-700 break-all">{user.userId}</p>
            </div>
            <div className="flex gap-2 px-1 sm:px-2 flex-col sm:flex-row">
              <p className="w-20 text-left font-bold">Name</p>
              <p>{user.fName + " " + user.lName}</p>
            </div>
            <div className="flex gap-2 px-1 sm:px-2 flex-col sm:flex-row">
              <p className="w-20 text-left font-bold">Email</p>
              <p className="break-all">{user.email}</p>
            </div>
            <div className="flex gap-2 px-1 sm:px-2 flex-col sm:flex-row">
              <p className="w-20 text-left font-bold">Mobile</p>
              <p>+91 {user.mobile}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full p-3 sm:p-4 md:p-6 m-1 sm:m-2 md:m-3 rounded-md shadow-xl bg-white/70">
          <div className="flex flex-col sm:flex-row justify-between px-2 sm:px-4 gap-2 sm:gap-0">
            <h1
              className="font-extrabold text-base sm:text-lg md:text-xl cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => {
                getAddresses();
                setShowAddress((prev) => !prev)
              }}
            >
              Show Address <i className={`fa-solid cursor-pointer ${showAddress ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
            </h1>

            {showAddress && (
              <button
                className="font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full hover:bg-white hover:text-slate-950 border text-white border-black bg-black cursor-pointer transition-colors"
                onClick={() => {
                  setFormMode("Add Address");
                  setFormData({
                    name: "",
                    mobile: "",
                    pincode: "",
                    area: "",
                    flat: "",
                    landmark: "",
                    city: "",
                    state: "",
                  });

                  setDefaultState(true);
                  setAddressType("Home");
                  setShowAddressForm(true);
                }}
              >
                Add <i className="fa-solid fa-plus"></i>
              </button>
            )}
          </div>

          {showAddress && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
              {addressList.length > 0 ? (
                addressList.map((address) => (
                  <div
                    className={`p-3 sm:p-4 md:p-6 rounded-md hover:scale-105 duration-400 transition-transform text-xs sm:text-sm ${address.defaultAddress ? "bg-slate-950" : "bg-slate-800"}`}
                    key={address.addressId}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex text-white gap-2 flex-wrap">
                        <h3 className="font-bold tracking-wider">{address.name}</h3>
                        <div className="border px-2 py-1 rounded-md text-[10px] flex items-center justify-center">
                          {address.addressType}
                        </div>
                      </div>

                      <div>
                        {address.defaultAddress && (
                          <p className="font-semibold tracking-widest text-green-300 text-[10px] sm:text-[12px]">
                            Default
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="text-gray-200 font-sans flex-1 break-words">
                        {address.flat + ", " + address.area + ", " + address.landmark + ", " + address.city + ", " + address.state + ", "}
                        India - {address.pincode}
                        <br />
                        Phone: {address.mobile}
                      </div>

                      <div className="flex flex-col gap-1 text-white">
                        <button
                          className="p-1.5 sm:p-2 w-8 sm:w-10 rounded-full hover:bg-white duration-400 hover:text-black cursor-pointer transition-all text-xs sm:text-base"
                          onClick={() => {
                            setFormMode("Edit Address");
                            setFormData({
                              name: address.name || "",
                              mobile: address.mobile || "",
                              pincode: address.pincode || "",
                              area: address.area || "",
                              flat: address.flat || "",
                              landmark: address.landmark || "",
                              city: address.city || "",
                              state: address.state || "",
                            });

                            setDefaultState(address.isDefault ?? true);
                            setAddressType(address.addressType || "Home");
                            setUpdateId(address.addressId);
                            setShowAddressForm(true);
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className="p-1.5 sm:p-2 w-8 sm:w-10 rounded-full hover:bg-white duration-400 hover:text-black cursor-pointer transition-all text-xs sm:text-base"
                          onClick={() => deleteAddress(address.addressId)}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-6">
                  No addresses found. Add your first address!
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddressForm && (
        <div className="fixed top-0 right-0 h-screen flex justify-end z-55 backdrop-blur-sm w-full">
          <div className="p-6 overflow-auto shadow-xl bg-white">
            <Address
              setShowAddressForm={setShowAddressForm}
              mode={formMode}
              formData={formData}
              setFormData={setFormData}
              isDefault={isDefault}
              setDefaultState={setDefaultState}
              addressType={addressType}
              setAddressType={setAddressType}
              updateId={updateId}
              updateAddress={updateAddress}
              saveAddress={saveAddress}
            />
          </div>
        </div>
      )}

      {showUserForm && (
        <UserForm
          setShowUserForm={setShowUserForm}
          userData={userData}
          setUserData={setUserData}
          userId={user.userId}
        />
      )}
    </div>
  );
};

export default Profile;
