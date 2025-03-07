"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/assets/svg/logo-new.svg";
import CustomButton from "../common/CustomButton";
import TopBar from "./TopBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TSetting } from "@/interfaces";

type TNavbarProps = {
  settings: TSetting;
};

const NavBar = ({ settings }: TNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null); // Track which submenu is open

  const pathName = usePathname();

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

  // // Toggle submenu visibility for mobile
  // const toggleSubmenu = (index: number) => {
  //   if (openSubmenuIndex === index) {
  //     setOpenSubmenuIndex(null); // Close the submenu if it's already open
  //   } else {
  //     setOpenSubmenuIndex(index); // Open the submenu
  //   }
  // };

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
        <TopBar settings={settings} />
      </div>

      {/* Sticky Navbar */}
      <nav
        className={`h-24 shadow-md z-50 flex justify-center items-center bg-white sticky top-0 transition-all duration-300`}
      >
        <div className="flex px-8 max-w-screen-2xl justify-between w-full items-center">
          {/* Logo */}
          <Link href={"/"}>
            <Image className="h-16 w-fit" src={logo} alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="  hidden md:flex flex-1 justify-end items-center">
            <div className="flex items-center gap-5">
              <ul className=" text-white rounded-lg bg-primary p-4 text-sm uppercase font-bold flex space-x-5">
                {settings.menu.map((item, index) => (
                  <li key={index} className="relative group">
                    <Link
                      href={`/${item.link}`}
                      className={`flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out group: ${
                        pathName === item.link
                          ? "underline underline-offset-4"
                          : ""
                      }`}
                    >
                      {item.label}
                      {item.submenu && (
                        <ChevronDown
                          className="group-hover:rotate-180 transition-transform duration-300"
                          size={16}
                        />
                      )}
                    </Link>
                    {item.submenu && (
                      <ul
                        className="absolute left-0 mt-2 w-48 bg-primary shadow-lg rounded-lg py-2 opacity-0 invisible 
                      text-white group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-2 group-hover:translate-y-0"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            {subItem.header_text && (
                              <p className="bg-[#27262C] px-1 text-white">
                                {subItem.header_text}
                              </p>
                            )}
                            <Link
                              href={`/${subItem.link}`}
                              className={`block px-4 py-2 text-sm text-white-700 hover:text-primary hover:bg-gray-100 ${
                                pathName === subItem.link
                                  ? "underline underline-offset-4"
                                  : ""
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              <CustomButton href="/donate" className="hidden lg:block">
                Donate
              </CustomButton>
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
        <aside
          className={`fixed inset-0 bg-white z-30 flex flex-col items-center justify-start pt-16 gap-6 transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } h-screen overflow-y-auto`}
        >
          <button
            className="absolute top-6 right-6 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </button>

          {/* Ensure scrolling works */}
          <ul className="text-lg uppercase font-bold flex flex-col gap-5 w-full px-6">
            <Link href={"/"}>
              <Image className="h-10  w-fit" src={logo} alt="logo" />
            </Link>
            <hr className="border-2 border-primary" />
            {settings.menu.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer transition-all duration-300 ease-in-out hover:text-primary"
              >
                <div className="flex items-center gap-2">
                  <Link href={`/${item.link}`}>{item.label}</Link>
                  {item.submenu && <ChevronDown size={16} />}
                </div>

                {item.submenu && (
                  <ul className="pl-4 mt-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        {subItem.header_text && (
                          <p className="bg-primary w-fit text-xs text-white flex items-center">
                            {subItem.header_text} <ChevronDown size={16} />
                          </p>
                        )}
                        <Link
                          href={`/${subItem.link}`}
                          className="block py-2 text-sm text-gray-700 hover:text-teal-600"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <Link
              className="text-primary underline-offset-4 hover:underline mb-20"
              href="#"
            >
              Donate
            </Link>
          </ul>
        </aside>
      </nav>
    </>
  );
};

export default NavBar;
