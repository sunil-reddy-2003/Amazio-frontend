import OrderDetails from "../components/OrderDetails";
import Address from "../components/Address";
import { useState, useEffect, use } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import { add } from "lodash";
import UserAddress from "../components/UserAddress";
const Shipping = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const { cartItems, address, setAddress, addressList, setAddressList } = useOutletContext();
  const [formMode, setFormMode] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [updateId, setUpdateId] = useState(null);

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
      setAddress(payload);
      setShowAddressDetails(true);
      setRefresh(prev => !prev);

    } catch (error) {
      console.error("error occurred while saving address: " ,error);
    }

  }

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
      console.error("error occurred while updating address: ",error);
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
    setRefresh(prev=>!prev);
    } catch (error) {
      console.error("error occurred while deleting the address: ",error);
    }
  }


  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center text-black h-90 text-4xl font-bold tracking-widest">
        <h1>Looks like your cart is empty...</h1>
        <Link to="/" className="text-lg underline text-red-700 tracking-wide">
          Start shopping now!
        </Link>
      </div>
    );
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  date.setDate(date.getDate() + 7);

  const btnName = "PROCEED TO PAYMENT";
  const orderHeading = "Order Details";
  const nextStep = "/payment";

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

          setAddress(selected);
          setShowAddressDetails(true);
        } else {
          setShowAddressDetails(false);
          setAddressList([]);
          setAddress(null);
        }
      } catch (error) {
        console.error("error occurred while fetching addresses: ", error.response);
      }
    }
    getAddresses();
  }, [refresh]);


  return (
    <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4 p-2 sm:p-3 md:p-4 lg:p-2 relative">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 w-full lg:w-[75%]">
        <div className="flex flex-col bg-white/30 rounded-t-lg">
          <div className="py-4 sm:py-5 md:py-6 px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <i className="fa-solid fa-location-dot text-2xl sm:text-3xl md:text-4xl flex-shrink-0"></i>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Delivery Address</h2>
                <p className="font-light text-xs sm:text-sm md:text-base">
                  We will deliver your order to this address
                </p>
              </div>
            </div>
            {!showAddressDetails && (
              <div className="px-4 sm:px-6 md:px-8 mt-3">
                <button
                  className="font-bold text-green-600 cursor-pointer hover:text-black text-sm sm:text-base transition-colors"
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
                  Add Address
                </button>
              </div>
            )}
          </div>
          {showAddressDetails && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 md:px-8 py-2 gap-3 sm:gap-0">
                <div className="px-2 sm:px-4 md:px-6 flex-1">
                  <div className="flex gap-2 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base">
                      {address.name}
                    </h3>
                    <div className="border px-2 rounded-lg text-xs">
                      {address.addressType}
                    </div>
                  </div>
                  {address.defaultAddress && (
                    <p className="font-bold text-slate-600 text-xs sm:text-sm">
                      Default
                    </p>
                  )}
                  <div className="text-xs sm:text-sm md:text-base font-sans mt-2 space-y-1">
                    <p>
                      {address.flat + ", "}
                      {address.area + ", "}
                    </p>
                    <p>{address.landmark + ", "}</p>
                    <p>
                      {address.city + ", "}
                      {address.state + ", "}
                    </p>
                    <p>India - {address.pincode}</p>
                    <p>
                      Phone:{" "}
                      <span className="font-bold">{address.mobile}</span>
                    </p>
                  </div>
                  <div className="mt-2">
                    <button
                      className="font-semibold text-red-600 cursor-pointer hover:text-black text-xs sm:text-sm transition-colors"
                      onClick={() => {
                        setShowSelect(true);
                      }}
                    >
                      Change Address
                    </button>
                  </div>
                </div>
                <div className="flex items-center px-2 sm:px-4 md:px-8 w-full sm:w-auto">
                  <div className="border border-dotted p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base">
                    <p className="text-green-700 font-bold">
                      Cash on delivery available
                    </p>
                    <p>
                      Est Delivery {date.getDate()} {months[date.getMonth()]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-10 rounded-b-lg border-t border-gray-200">
                <div className="flex items-start sm:items-center gap-2 sm:gap-4">
                  <i className="fa-regular fa-truck text-2xl sm:text-3xl flex-shrink-0"></i>
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl text-black font-bold">
                      Expected Delivery
                    </h2>
                    <p className="text-xs sm:text-sm">Estimated delivery dates for your order</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 sm:p-3 md:p-4 gap-2 sm:gap-3 md:gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-2 sm:gap-3">
                      <img
                        src={`${item.imageUrl}?auto=compress&cs=tinysrgb&w=500&h=500`}
                        className="rounded-md object-cover h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 flex-shrink-0"
                        alt={item.name}
                      />
                      <div className="p-1 sm:p-2 flex-1">
                        <p className="font-medium text-xs sm:text-sm md:text-base">
                          {date.getDate()} {months[date.getMonth()]}
                        </p>
                        <p className="text-xs sm:text-sm line-clamp-2">{item.name}</p>
                      </div>
                    </div>
                  ))}
                  {cartItems.length === 0 && <p className="text-xs sm:text-sm">Your cart is empty.</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="relative py-4 sm:py-6 md:py-8 lg:py-8 px-2 sm:px-3 md:px-4 lg:pr-4 w-full lg:w-[25%]">
        <OrderDetails
          btnName={btnName}
          address={address}
          nextStep={nextStep}
          orderHeading={orderHeading}
        />
        {showAddressForm && (
          <div className="fixed top-0 right-0 h-screen flex justify-end z-55 backdrop-blur-sm w-full">
            <div className="p-6 overflow-auto shadow-xl bg-white">
              <Address
                setShowAddressForm={setShowAddressForm}
                mode={formMode}
                setShowAddressDetails={setShowAddressDetails}
                formData={formData}
                setFormData={setFormData}
                address={address}
                isDefault={isDefault}
                setDefaultState={setDefaultState}
                addressType={addressType}
                setAddressType={setAddressType}
                saveAddress={saveAddress}
                updateId={updateId}
                updateAddress={updateAddress}
              />
            </div>
          </div>
        )}
      </div>
      {
        showSelect && (
          <div className="fixed top-0 left-0 z-50 bg-white/10 h-full w-full backdrop-blur-md">
            <UserAddress
              addressList={addressList}
              setShowSelect={setShowSelect}
              setAddress={setAddress}
              setShowAddressForm={setShowAddressForm}
              setFormMode={setFormMode}
              setFormData={setFormData}
              setAddressType={setAddressType}
              setDefaultState={setDefaultState}
              setUpdateId={setUpdateId}
              deleteAddress={deleteAddress}
            />
          </div>
        )
      }
    </div>
  );
}

export default Shipping;
