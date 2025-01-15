import React from "react";

const UserServices = () => {
  return (
    <div>
      <h1>Services</h1>
      <p>What services do you offer?</p>
      <input type="text" placeholder="Service 1" />
      <input type="text" placeholder="Service 2" />
      <input type="text" placeholder="Service 3" />
      <input type="text" placeholder="Service 4" />
      <input type="text" placeholder="Service 5" />

      <h1>Service Details</h1>
      <p>Describe your services in detail.</p>
      <textarea placeholder="Service 1 Details" />
      <textarea placeholder="Service 2 Details" />
      <textarea placeholder="Service 3 Details" />
      <textarea placeholder="Service 4 Details" />
      <textarea
        placeholder="Service
    5 Details"
      />
    </div>
  );
};

export default UserServices;
