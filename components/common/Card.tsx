// components/Card.tsx
import Image from "next/image";
import React from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const Card = ({ imageUrl, title, description }: CardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg m-4 w-72">
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
