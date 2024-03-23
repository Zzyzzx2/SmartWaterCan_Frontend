import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import WaterCanCard from "./WaterCanCard";
import { ref, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { storage, db } from "../../firebase";
import Logout from "./Logout";

const Dashboard = () => {
  const [cans, setCans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCan, setEditingCan] = useState(null);

  const fetchWaterCans = async () => {
    try {
      const waterCansCollection = collection(db, "waterCans");
      const querySnapshot = await getDocs(
        query(waterCansCollection, orderBy("timestampField"))
      );
      const waterCansList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCans(waterCansList);
    } catch (error) {
      console.error("Error fetching water cans:", error);
    }
  };

  useEffect(() => {
    fetchWaterCans();
  }, []);

  const handleEdit = (can) => {
    // Set the editingCan state with the details of the water can being edited

    setEditingCan(can);
    //console.log("Editing Can:", editingCan);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedCan) => {
    const canRef = doc(db, "waterCans", updatedCan.id);
    await updateDoc(canRef, updatedCan);
    fetchWaterCans(); // Fetch updated water cans after saving
    setIsModalOpen(false);
  };

  const handleAddCan = async () => {
    // Add a new water can to Firestore
    const newCanRef = await addDoc(collection(db, "waterCans"), {
      title: `Water Can ${cans.length + 1}`,
      location: "Location 1",
      phoneNumber: "123-456-7890",
      image: "data/screenshot.png",
      fetchInterval: 30,
      timestampField: serverTimestamp(),
    });
    fetchWaterCans(); // Fetch updated water cans after adding
  };

  const handleDeleteCan = async (id) => {
    // Delete the water can from Firestore
    await deleteDoc(doc(db, "waterCans", id));
    fetchWaterCans(); // Fetch updated water cans after deletion
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCan(null);
  };

  // Watch for changes in editingCan and log its value
  useEffect(() => {
    console.log("Editing Can:", editingCan);
  }, [editingCan]);

  return (
    <div className="bg-gray-200 min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Smart Water Can Management Dashboard
      </h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddCan}
        >
          Add Water Can
        </button>
        <Logout />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cans.map((can) => (
          <WaterCanCard
            key={can.id}
            can={can}
            onDelete={handleDeleteCan}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          can={editingCan}
        />
      )}
    </div>
  );
};

export default Dashboard;
