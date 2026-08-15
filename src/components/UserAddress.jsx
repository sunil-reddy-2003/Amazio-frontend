import AddressCard from "./AddressCard";
import { useState } from "react";

const UserAddress = (props) => {
  const {
    addressList,
    setShowSelect,
    setAddress,
    setShowAddressForm,
    setFormMode,
    setFormData,
    setDefaultState,
    setAddressType,
    setUpdateId,
    deleteAddress,
  } = props;

  const [selected, setSelected] = useState("");

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-white/70 w-full h-screen z-50 flex justify-end overflow-auto">
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[70%] h-full flex flex-col bg-white shadow-lg">
        <div className="m-3 sm:m-6 md:m-8 lg:m-12">
          <div className="flex justify-between p-2 sm:p-3 md:p-4 gap-2">
            <h1 className="font-bold text-lg sm:text-2xl md:text-3xl p-1 sm:p-2">Select Address</h1>
            <button
              className="font-bold text-red-500 text-lg sm:text-xl px-2 sm:px-4 py-1 sm:py-2 cursor-pointer hover:bg-red-100 transition-colors rounded"
              onClick={() => setShowSelect(false)}
            >
              close <i className="text-lg sm:text-2xl fa-regular fa-circle-xmark"></i>
            </button>
          </div>

          <div className="p-2 sm:p-3 md:p-4">
            <ul className="space-y-2">
              {addressList.map((add) => (
                <li key={add.addressId}>
                  <label
                    htmlFor={add.addressId}
                    className={`p-3 sm:p-4 flex gap-3 rounded-lg cursor-pointer transition-colors ${selected === add.addressId ? "bg-slate-900" : "bg-black/70 hover:bg-black/80"}`}
                  >
                    <input
                      id={add.addressId}
                      value={add.addressId}
                      checked={selected === add.addressId}
                      name="address"
                      type="radio"
                      className="mt-1"
                      onChange={() => {
                        setAddress(add);
                        setSelected(add.addressId);
                      }}
                    />
                    <AddressCard
                      address={add}
                      setShowAddressForm={setShowAddressForm}
                      setFormMode={setFormMode}
                      setFormData={setFormData}
                      setAddressType={setAddressType}
                      setDefaultState={setDefaultState}
                      setUpdateId={setUpdateId}
                      deleteAddress={deleteAddress}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-2 sm:px-4 md:px-6 flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-between">
            <button
              className="border-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-green-600 cursor-pointer hover:bg-green-50 transition-colors text-sm sm:text-base"
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

            <button
              className="border-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-extrabold text-slate-900 cursor-pointer hover:bg-gray-100 transition-colors text-sm sm:text-base"
              onClick={() => {
                setShowSelect(false);
              }}
            >
              continue <i className="fa-solid fa-arrow-right-long ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;

