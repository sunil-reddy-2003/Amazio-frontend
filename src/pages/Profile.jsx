import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Address from "../components/Address";
import axios from "axios";
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
  const [refresh, setRefresh] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const [userData,setUserData]=useState({
    fname:"",
    lname:"",
    email:"",
    mobile:""
  });


  useEffect(() => {
    const getAddresses = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_BASE_URL}/api/user/getaddress`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        // console.log("inside get address: ", response.data);
        if (response.data.status) {

          const addresses = response.data.addresses;
          setAddressList(addresses);

          const selected = addresses.find((a) => {
            return a.defaultAddress == true
          }) || addresses[0] || null;

        } else {
          setAddressList([]);
        }
      } catch (error) {
        console.error("error occurred while fetching addresses: ", error.response);
      }
    }
    getAddresses();
  }, [refresh]);


  const updateAddress = async (updateId, updateAddress) => {
    try {
      const response = await axios({
        method: "put",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/user/updateaddress/${updateId}`,
        data: updateAddress,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      // console.log("inside updateAddress: "+response.data);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("error occurred while updating address: ", error);
    }
  }

  const deleteAddress = async (addressId) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/user/deleteaddress/${addressId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("error occurred while deleting the address: ", error);
    }
  }

  const saveAddress = async (payload) => {
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/api/user/saveaddress`,
        data: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      // console.log("inside post address: ",response.data);
      setRefresh(prev => !prev);

    } catch (error) {
      console.error("error occurred while saving address: ", error);
    }

  }

  if (!user) {
    return <p>Loading...</p>;
  }


  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center p-20 w-[70%]">
        <div className="flex flex-col p-4 m-2 rounded-md shadow-xl w-full bg-white/70">
          <div className="flex items-center justify-between  ">
            <h1 className=" font-extrabold text-3xl m-2 p-2  ">My Profile</h1>
            <button
              className="font-bold text-xl m-2 p-2 cursor-pointer "
              onClick={()=>{
                setUserData({
                  fname:user.fname || "",
                  lname:user.lname || "",
                  email:user.email || "",
                  mobile:user.mobile || ""
                })
                setShowUserForm(true);
              }}
            >edit<i className="fa-regular fa-pen-to-square pl-2"></i></button>
          </div>
          <div className="flex flex-col  m-2 text-lg  ">
            <div className="flex gap-2 px-2">
              <p className="w-20 text-left font-bold">User ID </p>
              <p className="text-slate-900 underline underline-offset-3 decoration-dotted decoration-green-700">{user.userId}</p>
            </div>
            <div className="flex gap-2 px-2">
              <p className="w-20 text-left font-bold">Name</p>
              <p>{user.fname + " " + user.lname}</p>
            </div>
            <div className="flex  gap-2 px-2">
              <p className="w-20 text-left font-bold">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="flex gap-2 px-2 ">
              <p className="w-20 text-left font-bold">Mobile</p>
              <p>+91 {user.mobile}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-full p-4   m-2 rounded-md shadow-xl bg-white/70">
          <div className="flex justify-between px-4">
            <h1
              className="font-extrabold text-xl"
              onClick={() => setShowAddress(prev => !prev)}
            >Show Address <i className={`fa-solid cursor-pointer ${showAddress ? "fa-chevron-up" : "fa-chevron-down"}`}></i></h1>
            {
              showAddress && (
                <button
                  className="font-semibold px-2 rounded-full hover:bg-white hover:text-slate-950 border text-white border-black bg-black cursor-pointer"
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
              )
            }
          </div>
          {
            showAddress && (
              <div className="grid grid-cols-2">
                {
                  addressList.map((address) => {
                    return (
                      <div
                        className={`p-8 rounded-md m-2 hover:scale-101 duration-400 ${address.defaultAddress ? "bg-slate-950" : "bg-slate-800"}`}
                        key={address.addressId}
                      >
                        <div className="flex justify-between ">
                          <div className="flex text-white">
                            <h3 className="font-bold pr-2 text-[14px] tracking-wider">
                              {address.name}
                            </h3>
                            <div className="border px-2 rounded-md text-[10px] flex items-center justify-center">
                              {address.addressType}
                            </div>
                          </div>
                          <div>
                            {address.defaultAddress && (
                              <p className="font-semibold tracking-widest text-green-300 text-[12px]">
                                Default
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ">
                          <div className="text-[13px] text-gray-200 font-sans py-2  ">
                            {address.flat + ", " + address.area + ", " + address.landmark + ", " + address.city + ", " + address.state + ", "}
                            India - {address.pincode}<br />
                            Phone :{" " + address.mobile}
                          </div>

                          <div className="flex items-center gap-1 text-white ">
                            <button
                              className="p-[4px] w-10 rounded-full hover:p-[8px] hover:bg-white duration-400 hover:text-black cursor-pointer"
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
                              className="p-[4px] w-10 rounded-full hover:p-[8px] hover:bg-white duration-400 hover:text-black cursor-pointer"
                              onClick={() => deleteAddress(address.addressId)}
                            >
                              <i className="fa-regular fa-trash-can"></i>
                            </button>
                          </div>
                        </div>

                      </div>
                    )
                  })
                }
              </div>
            )
          }
        </div>

      </div>
      {
        showAddressForm && (
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
        )
      }
      {
        showUserForm && (
          <UserForm 
          setShowUserForm={setShowUserForm}
          userData={userData}
          setUserData={setUserData}
          userId={user.userId}
          />
        )
      }
    </div>
  );
};

export default Profile;
