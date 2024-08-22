"use client";

import React from "react";

const AnimalCard = ({ imageUrl, imageName }) => {
  const handleImageError = (e) => {
    e.target.src = "/loading_icon.png";
  };

  return (
    <div className="flex flex-col items-center w-[160px] h-[220px]">
      <div className="w-full h-[180px] bg-[#0a0909] flex justify-center items-center border border-[#333131] rounded-md">
        <img
          src={imageUrl}
          alt={imageName}
          className="object-cover w-4/5 h-4/5 bg-transparent"
          onError={handleImageError}
        />
      </div>
      <div className="mt-2 text-white text-center">{imageName}</div>
    </div>
  );
};

export default AnimalCard;
