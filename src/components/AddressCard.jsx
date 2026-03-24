const AddressCard = (props) => {
    const { address,setShowAddressForm,setFormMode,setFormData,
        setAddressType,setDefaultState,setUpdateId,deleteAddress } = props;
    return (
            <div className="px-4 py-2">
                <div className="flex text-white">
                    <h3 className="font-bold pr-2 text-[15px] tracking-wider">
                        {address.name}
                    </h3>
                    <div className="border px-2 rounded-md text-xs flex items-center justify-center ">
                        {address.addressType}
                    </div>
                </div>
                {address.defaultAddress && (
                    <p className="font-bold text-green-400 text-sm">
                        Default
                    </p>
                )}
                <div className="text-[14px] text-gray-100 font-sans py-2">
                    {address.flat + ", " + address.area + ", " + address.landmark + ", " + address.city + ", " + address.state + ", "}
                    India - {address.pincode}<br />
                    Phone :{" " + address.mobile}
                </div>
                <div className="py-2">
                    <button
                        className="mx-2 hover:text-red-400  text-black text-white"
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
                        edit <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                        className="mx-2 hover:text-red-400  text-black text-white"
                        onClick={()=>{
                            deleteAddress(address.addressId);
                        }}
                    >
                        delete 
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>
    )
}

export default AddressCard;