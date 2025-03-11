"use client";
import { useState, useEffect } from "react";
import { FaAngleUp, FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed hover:bg-white hover:border-primary hover:text-primary bottom-5 z-20 right-5 p-2 bg-primary border-2 b text-white rounded-full shadow-lg transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <FaAngleUp size={20} />
    </button>
  );
}
