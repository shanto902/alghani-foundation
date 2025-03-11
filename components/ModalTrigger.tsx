"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

export default function ModalTrigger({
  modal_body,
}: {
  modal_body: {
    imageUrl: string;
    blurDataURL: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000); // Open modal after 5 seconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <Modal
      modal_body={modal_body}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  );
}
