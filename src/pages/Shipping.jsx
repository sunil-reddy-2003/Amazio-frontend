import OrderDetails from "../components/OrderDetails";
import Address from "../components/Address";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const Shipping = (props) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({});
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const { cartItems } = useOutletContext();

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

  const addressDetails = (payload) => {
    window.localStorage.setItem("addressStorage", JSON.stringify(payload));
    setAddress(payload );
    setShowAddressDetails(true);
  };

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem("addressStorage"));
    if (savedAddress) {
      setAddress(savedAddress);
      setShowAddressDetails(true);
    }else {
    setShowAddressDetails(false); 
  }
  }, []);

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

  const Fees = 0;
  const totalPrice = cartItems.reduce((sum, item) => {
    return (sum += item.price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => {
    return (sum += item.quantity);
  }, 0);
  const btnName = "PROCEED TO PAYMENT";
  const orderHeading="Order Details";
  const nextStep = "/payment";
  return (
    <div className="flex gap-4  p-2 relative">
      <div className="ml-28 p-8 w-[75%] bg-white">
        <div className=" flex flex-col border-b border-gray-300 pb-4">
          <div className=" py-6 px-2 ">
            <div className="flex">
              <i className="fa-solid fa-location-dot text-4xl p-2"></i>
              <div>
                <h2 className="text-2xl font-bold">Delivery Address</h2>
                <p className="font-light">
                  We will deliver your order to this address
                </p>
              </div>
            </div>
            {!showAddressDetails && (
              <div className=" px-4">
                <button
                  className="font-bold text-green-600 cursor-pointer hover:text-black"
                  onClick={() => {
                    setFormMode("Add Address");
                    setShowAddressForm(!showAddressForm);
                  }}
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
          {showAddressDetails && (
            <div className="flex gap-130">
              <div className="px-4">
                <div className="flex gap-1">
                  <h3 className="font-bold pr-2 text-[15px]">{address.name}</h3>
                  <div className="border px-2 rounded-lg text-xs">
                    {address.addressType}
                  </div>
                </div>
                {address.isDefault && (
                  <p className="font-bold text-slate-600 text-[14px]">
                    Default
                  </p>
                )}
                <div className="text-[14px] font-sans">
                  <p>
                    {address.flat+", "}{address.area+", "}
                  </p>
                  <p>{address.landmark+", "}</p>
                  <p>
                    {address.city+", "}{address.state+", "}
                  </p>
                  <p>india - {address.pincode}</p>
                  <p>
                    Phone : <span className="font-bold">{address.mobile}</span>
                  </p>
                </div>
                <div className="">
                  <button
                    className="font-semibold text-red-600 cursor-pointer hover:text-black"
                    onClick={() => {
                      setFormMode("Change Address");
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

                      setShowAddressForm(!showAddressForm);
                    }}
                  >
                    Change Address
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <div className="border border-dotted p-4">
                  <p className="text-green-700 font-bold ">
                    {" "}
                    Cash on delivery available
                  </p>
                  <p>
                    Est Delivery {date.getDate()} {months[date.getMonth()]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showAddressDetails && (
          <div className="flex flex-col py-4 px-4 ">
            <div className="flex items-center gap-4">
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
                    src={item.photo}
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
        )}
      </div>
      <div className="relative  py-8 pr-4 w-[25%]">
        <OrderDetails
          Fees={Fees}
          totalPrice={totalPrice}
          totalItems={totalItems}
          btnName={btnName}
          address={address}
          nextStep={nextStep}
          orderHeading={orderHeading}
        />
        {showAddressForm && (
          <div className="fixed top-0 right-0 h-screen flex justify-end z-50 backdrop-blur-sm w-full">
            <div className="bg-white p-6 overflow-auto shadow-xl">
              <Address
                setShowAddressForm={setShowAddressForm}
                mode={formMode}
                addressDetails={addressDetails}
                setShowAddressDetails={setShowAddressDetails}
                formData={formData}
                setFormData={setFormData}
                address={address}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Shipping;