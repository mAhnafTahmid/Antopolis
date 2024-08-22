import React, { useState } from "react";

const server_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const CategoryModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState("");

  const createCategory = async () => {
    try {
      const response = await fetch(`${server_url}/api/create/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }), // Sending category in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      location.reload();
      console.log("Category created successfully!");
    } catch (error) {
      console.error("Error creating category: ", error.message);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-sans">
      <div className="bg-white w-1/2 max-w-[350px] p-6 rounded-3xl">
        <div className="w-full mx-auto pt-2">
          <h2 className="text-lg text-black  mb-4">Add Category</h2>
        </div>

        <input
          type="text"
          placeholder="Name"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="bg-gray-100 w-full mx-auto block py-[10px] px-4 rounded-md mb-8 text-black placeholder-black text-lg"
        />
        <button
          className="bg-black text-white w-full mx-auto block p-2 py-[10px] rounded-md mb-4 text-lg"
          onClick={createCategory}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CategoryModal;
