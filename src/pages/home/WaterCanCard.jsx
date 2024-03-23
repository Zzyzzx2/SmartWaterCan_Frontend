import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { db } from "../../firebase"; // Import db from your firebase configuration
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import Prediction from "./Prediction";
import * as tmImage from "@teachablemachine/image";

const WaterCanCard = ({ can, onDelete, onEdit }) => {
  const [imagePath, setImagePath] = useState(can.image);
  const [newImagePath, setNewImagePath] = useState(can.image);
  const [prevImagePath, setPrevImagePath] = useState(can.image);
  const [model, setModel] = useState(null);
  const [modalLoaded, setModalLoaded] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      const URL = "https://teachablemachine.withgoogle.com/models/CUU-5erFK/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      console.log("loading Model: ", modelURL, metadataURL);

      try {
        const model = await tmImage.load(modelURL, metadataURL);
        setModel(model);
        console.log("Model Loaded Successfully");
        setModalLoaded(true);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const photoRef = ref(storage, can.image);
        const url = await getDownloadURL(photoRef);
        setImagePath(url);
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [can.image]); // Include can.image in dependency array

  useEffect(() => {
    // Setup Firestore listener
    const unsubscribe = onSnapshot(doc(db, "waterCans", can.id), (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setNewImagePath(data.image);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [can.id]); // Include can.id in dependency array

  const handleImageChange = async () => {
    try {
      // Update the image path in the Firestore document

      const photoRef = ref(storage, newImagePath);
      try {
        const url = await getDownloadURL(photoRef);
        const docRef = doc(db, "waterCans", can.id);
        // Update the image path in the Firestore document
        await updateDoc(docRef, {
          image: newImagePath,
        });
        setImagePath(url);
        setPrevImagePath(newImagePath);
      } catch (error) {
        alert("Error fetching image. Check the Path.");
        setNewImagePath(prevImagePath);
        console.log("Error fetching image:", error);
      }
      console.log("Image path updated successfully in Firestore");
      console.log("New Image Path: ", imagePath);

      //predict();
    } catch (error) {
      console.error("Error updating image path in Firestore:", error);
    }
  };

  return (
    <div className="w-84 h-94 bg-gray-800 rounded-lg shadow-md p-6 relative text-gray-200 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
      <h2 className="text-lg font-semibold mb-2">{can.title}</h2>
      <p className="text-gray-400 mb-2">Location: {can.location}</p>
      <p className="text-gray-400 mb-4">Phone: {can.phoneNumber}</p>
      <p className="text-gray-400 mb-4">
        Fetch Interval: {can.fetchInterval} Minutes
      </p>
      <input
        type="text"
        value={newImagePath}
        onChange={(e) => setNewImagePath(e.target.value)}
        className="mb-2 bg-gray-700 text-gray-200 rounded-md px-3 py-1 focus:outline-none"
        placeholder="Enter Image URL"
      />
      <button
        onClick={handleImageChange}
        className="mb-2 bg-gray-700 text-gray-200 rounded-md px-4 py-2 hover:bg-gray-600 focus:outline-none"
      >
        Get Image
      </button>
      <img
        src={imagePath}
        alt="Water Can"
        className="w-full h-80 mb-2 rounded-md"
      />

      <p className="text-gray-400 mb-4">Last Updated: {can.timestampField}</p>
      {modalLoaded ? (
        <Prediction imagePath={imagePath} model={model} />
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        onClick={() => onEdit(can)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => onDelete(can.id)}
      >
        X
      </button>
    </div>
  );
};

export default WaterCanCard;
