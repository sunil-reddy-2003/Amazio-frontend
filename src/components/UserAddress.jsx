import AddressCard from "./AddressCard";
import { useEffect, useState } from "react";
const UserAddress = (props) => {
    const { addressList, setShowSelect, setAddress, setShowAddressForm, setFormMode, 
        setFormData, setDefaultState, setAddressType, setUpdateId, deleteAddress } = props;

    const [selected, setSelected] = useState("");
    return (
        <div className="fixed top-0 bg-white/70 w-[70%] h-full overflow-auto">
            <div className="m-12">
                <div className=" flex justify-between p-4">
                    <h1 className="font-bold text-3xl p-2">Select Address</h1>
                    <button
                        className="font-bold text-red-500 text-xl px-4 cursor-pointer"
                        onClick={() => setShowSelect(false)}
                    >close <i className="text-2xl  fa-regular fa-circle-xmark"></i></button>
                </div>
                <div className="p-4 ">
                    <ul>
                        {
                            addressList.map((add) => {
                                return (
                                    <li
                                        key={add.addressId}
                                    >
                                        <label
                                            htmlFor={add.addressId}
                                            className={`p-4 flex rounded-lg mb-2 cursor-pointer ${selected === add.addressId ? "bg-slate-900" : "bg-black/70"}`}
                                        >
                                            <input
                                                id={add.addressId}
                                                value={add.addressId}
                                                checked={selected === add.addressId}
                                                name="address"
                                                type="radio"
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
                                )
                            })}
                    </ul>
                </div>
                <div className="px-4 flex justify-between">
                    <button
                        className="border-2 px-4 py-2 rounded-full font-bold text-green-600 cursor-pointer"
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
                    >Add Address</button>
                    <button
                        className="border-4  px-4 py-2 rounded-full font-extrabold text-slate-900 cursor-pointer"
                        onClick={() => {
                            setShowSelect(false);
                        }}
                    >continue <i className="fa-solid fa-arrow-right-long"></i></button>
                </div>
            </div>
        </div>
    )
}

export default UserAddress;

