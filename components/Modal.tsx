"use client";

import { useEffect, useState } from "react";
import PostBody from "./post-body/PostBody";
import { FaCross } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";

export default function Modal({
  isOpen,
  onClose,
  modal_body,
}: {
  isOpen: boolean;
  onClose: () => void;
  modal_body: {
    imageUrl: string;
    blurDataURL: string;
  };
}) {
  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex z-50 w-screen h-screen items-center justify-center">
      <div className="bg-white  rounded-lg shadow-lg max-w-screen-2xl relative">
        <Image
          src={modal_body.imageUrl}
          alt={"Modal Image"}
          width={1920}
          height={1080}
          blurDataURL={modal_body.blurDataURL}
          placeholder="blur"
          className="w-full h-full max-w-screen-xl max-h-[90vh] object-cover object-center rounded-lg"
        />
        <button
          onClick={onClose}
          className=" absolute top-0 right-0  p-2 bg-primary text-white rounded hover:bg-red-600"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
}
