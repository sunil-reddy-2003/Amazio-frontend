const AddressCard = (props) => {
    const { address,setShowAddressForm,setFormMode,setFormData,
        setAddressType,setDefaultState,setUpdateId,deleteAddress } = props;
    return (
            <div className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 flex-1">
                <div className="flex text-white gap-2 flex-wrap">
                    <h3 className="font-bold text-xs sm:text-sm md:text-base tracking-wider">
                        {address.name}
                    </h3>
                    <div className="border px-2 rounded-md text-xs flex items-center justify-center">
                        {address.addressType}
                    </div>
                </div>
                {address.defaultAddress && (
                    <p className="font-bold text-green-400 text-xs sm:text-sm">
                        Default
                    </p>
                )}
                <div className="text-xs sm:text-sm text-gray-100 font-sans py-1 sm:py-2 break-words">
                    {address.flat + ", " + address.area + ", " + address.landmark + ", " + address.city + ", " + address.state + ", "}
                    India - {address.pincode}<br />
                    Phone: {address.mobile}
                </div>
                <div className="py-1 sm:py-2 flex gap-2 text-xs sm:text-sm">
                    <button
                        className="hover:text-red-400 text-white"
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
                        className="hover:text-red-400 text-white"
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