import { useEffect } from "react";
const Profile = () => {
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));
  const userAddress = JSON.parse(localStorage.getItem("addressStorage"));

  return (
    <div className="flex flex-col items-center justify-center   p-20 ">
      <div className="flex flex-col items-center w-100   text-center m-2 border border-dotted">
        <h1 className=" font-extrabold text-3xl m-2 w-[90%] ">
          My Profile
        </h1>
        <div className="flex flex-col  m-2 w-[90%] ">
          <div className="flex gap-2 px-2">
            <p className="w-20 text-left font-bold">Name</p>
            <p>{userDetails.fname + " " + userDetails.lname}</p>
          </div>
          <div className="flex  gap-2 px-2">
            <p className="w-20 text-left font-bold">Email</p>
            <p>{userDetails.email}</p>
          </div>
          <div className="flex gap-2 px-2 ">
            <p className="w-20 text-left font-bold">Mobile</p>
            <p>{userDetails.mobile}</p>
          </div>
          <div className="flex gap-2 px-2">
            <p className="w-20 text-left font-bold">Password</p>
            <p>{userDetails.password}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start w-100   m-2 border border-dotted">
        <h1 className="  font-extrabold text-xl w-[90%] px-4">Address</h1>
        <span className="mx-6 font-semibold">{userAddress.addressType}</span>
        <div className="text-[14px] font-sans flex flex-col px-6">
          
          <p>
            {userAddress.flat + ", "} {userAddress.area + ", "}{" "}
            {userAddress.landmark}
          </p>
          <p>
            {userAddress.city + ", "}
            {userAddress.state + ", "}india - {userAddress.pincode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
