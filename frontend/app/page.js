"use client";
import React, { useEffect, useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import CategoryModal from "@/components/CategoryModal";
import AnimalModal from "@/components/AnimalModal";

const server_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [animals, setAnimals] = useState([]);

  // Controlling modals
  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${server_url}/api/categories`);
        const data = await response.json();
        setCategories(data);
        console.log("Categories fetched successfully!");
      } catch (error) {
        console.error("Failed loading categories: ", error.message);
        alert("Failed loading categories: " + error.message);
      }
    };

    const getAnimals = async () => {
      try {
        const response = await fetch(`${server_url}/api/animals`);
        const data = await response.json();
        setAnimals(data);
        console.log("Animals fetched successfully!");
      } catch (error) {
        console.error("Failed loading animals: ", error.message);
        alert("Failed loading animals: " + error.message);
      }
    };

    getCategories();
    getAnimals();
  }, []);

  const setCategory = async (value) => {
    sessionStorage.setItem("category", value);
    const response = await fetch(`${server_url}/api/animals/${value}`);
    const data = await response.json();
    setAnimals(data);
  };

  const openAnimalModal = () => setIsAnimalModalOpen(true);
  const closeAnimalModal = () => setIsAnimalModalOpen(false);

  return (
    <main className="font-sans w-full flex flex-col">
      <div className="flex flex-row w-[90%] max-h-[200px] mx-auto">
        <div className="flex flex-row flex-wrap w-3/4 h-[200px] items-center justify-start">
          {categories.length
            ? categories.map((category) => (
                <div className="m-2" key={category._id}>
                  <button
                    className="border-red-500 text-red-500 focus:border-green-700 focus:text-green-700
                    active:border-green-700 active:text-green-700
                    hover:border-green-700 hover:text-green-700 py-2 px-7 text-lg rounded-3xl bg-inherit border"
                    onClick={() => setCategory(category.category)}
                  >
                    {category.category}
                  </button>
                </div>
              ))
            : ""}
        </div>
        <div className="flex flex-row-reverse flex-wrap w-1/4 h-[200px] items-center justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-5 text-lg mx-2 rounded-3xl bg-inherit border border-white"
            onClick={openCategoryModal}
          >
            Add Category
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-5 text-lg mx-2 rounded-3xl bg-inherit border border-white"
            onClick={openAnimalModal}
          >
            Add Animal
          </button>
        </div>
      </div>
      <div className="flex flex-row w-[90%] mx-auto">
        {animals.length
          ? animals.map((animal) => (
              <div className="m-6" key={animal._id}>
                <AnimalCard imageUrl={animal.image} imageName={animal.name} />
              </div>
            ))
          : ""}
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
      />
      <AnimalModal isOpen={isAnimalModalOpen} onClose={closeAnimalModal} />
    </main>
  );
}
