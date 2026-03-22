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
    <div className="flex gap-4  p-2 relative">
      <div className=" p-8 w-[75%] ">
        <div className=" flex flex-col bg-white/30 rounded-t-lg">
          <div className=" py-6 px-2 ">
            <div className="flex px-8">
              <i className="fa-solid fa-location-dot text-4xl "></i>
              <div>
                <h2 className="text-2xl font-bold">Delivery Address</h2>
                <p className="font-light">
                  We will deliver your order to this address
                </p>
              </div>
            </div>
            {!showAddressDetails && (
              <div className=" px-8">
                <button
                  className="font-bold text-green-600 cursor-pointer hover:text-black"
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
              <div className="flex items-center justify-between px-8 py-2">
                <div className="px-6">
                  <div className="flex">
                    <h3 className="font-bold pr-2 text-[15px]">
                      {address.name}
                    </h3>
                    <div className="border px-2 rounded-lg text-xs">
                      {address.addressType}
                    </div>
                  </div>
                  {address.defaultAddress && (
                    <p className="font-bold text-slate-600 text-[14px]">
                      Default
                    </p>
                  )}
                  <div className="text-[14px] font-sans">
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
                      Phone :{" "}
                      <span className="font-bold">{address.mobile}</span>
                    </p>
                  </div>
                  <div className="">
                    <button
                      className="font-semibold text-red-600 cursor-pointer hover:text-black"
                      onClick={() => {
                        setShowSelect(true);
                      }}
                    >
                      Change Address
                    </button>
                  </div>
                </div>
                <div className="flex items-center pr-16">
                  <div className="border border-dotted p-4">
                    <p className="text-green-700 font-bold ">
                      Cash on delivery available
                    </p>
                    <p>
                      Est Delivery {date.getDate()} {months[date.getMonth()]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-2 px-10  rounded-b-lg border-t border-gray-200 ">
                <div className="flex items-center gap-4 ">
                  <i className="fa-regular fa-truck text-3xl "></i>
                  <div>
                    <h2 className="text-xl text-black font-bold">
                      Expected Delivery
                    </h2>
                    <p className="">Estimated delivery dates for your order</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 p-4 gap-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex m-2 w-80">
                      <img
                        src={`${item.imageUrl}?auto=compress&cs=tinysrgb&w=500&h=500`}
                        className="rounded-md object-cover h-[100px] w-[100px]"
                      />
                      <div className="p-2">
                        <p className="font-medium">
                          {date.getDate()} {months[date.getMonth()]}
                        </p>
                        <p className="text-sm">{item.name}</p>
                      </div>
                    </div>
                  ))}
                  {cartItems.length === 0 && <p>Your cart is empty.</p>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="relative  py-8 pr-4 w-[25%]">
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
