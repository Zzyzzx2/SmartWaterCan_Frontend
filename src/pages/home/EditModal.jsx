import React, { useState } from "react";

const EditModal = ({ isOpen, onClose, onSave, can }) => {
  // Initialize state variables with values from 'can' prop if it exists
  const [title, setTitle] = useState(can ? can.title : "");
  const [location, setLocation] = useState(can ? can.location : "");
  const [phoneNumber, setPhoneNumber] = useState(can ? can.phoneNumber : "");

  // Function to handle saving changes
  const handleSave = () => {
    // Check if all fields are filled
    if (!title || !location || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if phone number is valid (accepts XXX-XXX-XXXX or XXXXXXXXXX format)
    if (!/^\d{3}-?\d{3}-?\d{4}$/.test(phoneNumber)) {
      alert("Please enter a valid phone number (XXX-XXX-XXXX or XXXXXXXXXX).");
      return;
    }

    // Create an updated object with the modified values
    const updatedCan = {
      ...can,
      title,
      location,
      phoneNumber,
    };
    // Call the onSave function with the updated object
    onSave(updatedCan);
  };

  // Function to handle canceling changes
  const handleCancel = () => {
    // Reset state values to their original values from 'can' prop
    setTitle(can.title);
    setLocation(can.location);
    setPhoneNumber(can.phoneNumber);
    onClose(); // Close the modal
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-content bg-gray-700 text-gray-200 w-96 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Water Can</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update state when input changes
                className="w-full border rounded-md px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)} // Update state when input changes
                className="w-full border rounded-md px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} // Update state when input changes
                className="w-full border rounded-md px-3 py-2 bg-gray-800 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel} // Handle cancel action
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
