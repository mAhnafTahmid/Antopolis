import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/Firebase/firebase";

const server_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const AnimalModal = ({ isOpen, onClose }) => {
  const [animal, setAnimal] = useState("");
  const [image, setImage] = useState(null);

  const createAnimal = async () => {
    if (!animal || !image) {
      toast.error("Please provide an animal name and image.");
      return;
    }

    try {
      // Upload the image to Firebase
      const storageRef = ref(storage, `animals/${animal}`);
      const snapshot = await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const category = sessionStorage.getItem("category");

      const response = await fetch(`${server_url}/api/create/animal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: animal,
          image: imageUrl,
          category: category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create animal");
      }

      const data = await response.json();
      location.reload();
      console.log("Animal created successfully!");
    } catch (error) {
      console.error("Error creating animal: ", error.message);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-sans">
      <div className="bg-white w-1/2 max-w-[350px] p-6 rounded-3xl">
        <div className="w-full mx-auto pt-2">
          <h2 className="text-lg text-black mb-4">Add Animal</h2>
        </div>

        <input
          type="text"
          placeholder="Animal Name"
          value={animal}
          onChange={(e) => {
            setAnimal(e.target.value);
          }}
          className="bg-gray-100 w-full mx-auto block py-[10px] px-4 rounded-md mb-4 text-black placeholder-black text-lg"
        />

        <div className="flex items-center bg-gray-100 w-full mx-auto py-[10px] px-4 rounded-md mb-8 mt-4">
          <label className="text-black text-lg mr-4">Image</label>
          <div className="relative w-full">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="flex justify-end">
              <span className="text-black text-sm bg-white px-3 py-1 rounded-md border border-gray-300">
                Upload
              </span>
            </div>
          </div>
        </div>

        <button
          className="bg-black text-white w-full mx-auto block p-2 py-[10px] rounded-md mb-4 text-lg"
          onClick={createAnimal}
        >
          Create Animal
        </button>
      </div>
    </div>
  );
};

export default AnimalModal;
