import AddressForm from "./AddressForm";
const Address = (props) => {
  
  const {
    setShowAddressForm,
    mode,
    addressDetails,
    formData,
    setFormData,
    isDefault,
    setDefaultState,
    addressType,
    setAddressType
  } = props;

  return (
    <div className="">
      <div className="flex justify-between px-6 ">
        <h1 className="text-2xl font-bold">{mode}</h1>
        <i
          className="text-2xl fa-regular fa-circle-xmark cursor-pointer hover:text-red-600"
          onClick={() => setShowAddressForm(false)}
        ></i>
      </div>
      <form
        className="flex flex-col bg-white p-4 w-[400px]"
        onSubmit={(e) => {
          e.preventDefault();

          const payload = { ...formData, addressType, defaultAddress:isDefault };
          addressDetails(payload);
          setShowAddressForm(false);
        }}
      >
        <AddressForm
          id="name"
          label="Name *"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <AddressForm
          id="mobile"
          label="Mobile *"
          type="text"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <AddressForm
          id="pincode"
          label="Pincode *"
          type="text"
          value={formData.pincode}
          onChange={(e) =>
            setFormData({ ...formData, pincode: e.target.value })
          }
        />
        <AddressForm
          id="area"
          label="Locality / Area / Street *"
          type="text"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
        />
        <AddressForm
          id="flat"
          label="Flat number / Building name *"
          type="text"
          value={formData.flat}
          onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
        />
        <AddressForm
          id="landmark"
          label="Landmark *"
          type="text"
          value={formData.landmark}
          onChange={(e) =>
            setFormData({ ...formData, landmark: e.target.value })
          }
        />
        <AddressForm
          id="city"
          label="District / City *"
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <AddressForm
          id="state"
          label="State *"
          type="text"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />

        <div className="m-2">
          <p className="text-md font-bold">Address</p>
          <div className="flex justify-between m-2">
            <div className="flex flex-col">
              <label htmlFor="home">Home</label>
              <input
                id="home"
                type="radio"
                name="address"
                value="Home"
                checked={addressType === "Home"}
                onChange={(e) => {
                  setAddressType(e.target.value);
                }}
              ></input>
            </div>

            <div className="flex flex-col">
              <label htmlFor="work">Work</label>
              <input
                id="work"
                type="radio"
                name="address"
                value="Work"
                checked={addressType === "Work"}
                onChange={(e) => {
                  setAddressType(e.target.value);
                }}
              ></input>
            </div>

            <div className="flex flex-col">
              <label htmlFor="others">Others</label>
              <input
                id="others"
                type="radio"
                name="address"
                value="Others"
                checked={addressType === "Others"}
                onChange={(e) => {
                  setAddressType(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 ">
            <label htmlFor="default">Make as default address</label>
            <input
              id="default"
              type="checkbox"
              checked={isDefault}
              onChange={(e) => {
                setDefaultState(e.target.checked);
              }}
            ></input>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold border rounded-full px-8 py-2 mt-2 w-full active:bg-black active:text-white"
            >
              Save address
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;
