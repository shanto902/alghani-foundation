"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/assets/svg/logo-new.svg";
import MainBtn from "../common/MainBtn";
import TopBar from "./TopBar";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideTopBar(true);
      } else {
        setHideTopBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar (Hidden on Scroll) */}
      <div
        className={`w-full text-sm text-center transition-all duration-300 ${
          hideTopBar
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <TopBar />
      </div>

      {/* Sticky Navbar */}
      <nav
        className={`h-24 shadow-md z-50 flex justify-center items-center bg-white sticky top-0 transition-all duration-300`}
      >
        <div className="flex px-8 max-w-screen-2xl justify-between w-full items-center">
          {/* Logo */}
          <Image className="h-16 w-fit" src={logo} alt="logo" />

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-end items-center">
            <div className="flex items-center gap-5">
              <ul className="text-sm uppercase font-bold flex space-x-5">
                {[
                  "Home",
                  "About Us",
                  "Where We Work",
                  "What We Do",
                  "Contact Us",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="relative group cursor-pointer transition-all duration-300 ease-in-out"
                  >
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                ))}
              </ul>
              <MainBtn href="#" className="hidden lg:block">
                Donate
              </MainBtn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white z-30 flex flex-col items-center justify-center gap-6 transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-6 right-6 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>
          <ul className="text-lg uppercase font-bold flex flex-col gap-5">
            {[
              "Home",
              "About Us",
              "Where We Work",
              "What We Do",
              "Contact Us",
            ].map((item, index) => (
              <li
                key={index}
                className="cursor-pointer transition-all duration-300 ease-in-out hover:text-teal-600"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </li>
            ))}
          </ul>
          <MainBtn href="#">Donate</MainBtn>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
