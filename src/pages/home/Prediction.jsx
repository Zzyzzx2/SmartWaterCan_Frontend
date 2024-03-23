import React, { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import frame_502 from "../../test/frame_502.jpg";
import * as tmImage from "@teachablemachine/image";

const Prediction = ({ imagePath, model }) => {
  //const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const predict = async () => {
      console.log("Predicting...", imagePath, "Model: ", model);
      if (!model || !imagePath) return;

      const imageElement = new Image();
      imageElement.src = imagePath;
      imageElement.crossOrigin = "anonymous";

      console.log("ELEMENT " + imageElement.src);
      console.log("Model Status:", model); // Log model status

      const loadImagePromise = new Promise((resolve, reject) => {
        imageElement.onload = () => {
          console.log("Image loaded successfully");
          resolve();
        };
        imageElement.onerror = (error) => {
          console.error("Error loading image:", error);
          reject(error);
        };
      });

      try {
        await loadImagePromise;
        const prediction = await model.predict(imageElement);
        setPredictions(prediction);
        console.log("Predictions: ", predictions);
      } catch (error) {
        console.error("Error during prediction:", error);
      } finally {
        // You can remove the image element if needed
        imageElement.remove();
      }
    };

    console.log("INSIDE PRED:", imagePath, model);
    if (model && imagePath) {
      predict();
    }
  }, [imagePath]);

  return (
    <div className="mt-4">
      <p className="font-semibold">Prediction:</p>
      <div className="flex flex-col gap-2 mt-2">
        {predictions.length === 0 ? (
          <p>Loading...</p>
        ) : (
          predictions.map((prediction, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{prediction.className}:</p>
              <p>{prediction.probability.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Prediction;
