"use client";
import bgImage from "@/assets/bg/footerBG.png";
import { TSetting } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import parser from "html-react-parser";
import { FaPaperPlane } from "react-icons/fa";
import { DynamicIcon } from "../common/DynamicIcon";
import { DynamicFaIcon } from "../DynamicFaIcon";
const Footer = ({ settings }: { settings: TSetting }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value; // Access email input
  };
  return (
    <>
      <footer className=" bg-cover bg-center relative mix-blend-multiply bg-[#27262C] text-white p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5  gap-8">
            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                ABOUT AL GHANI FOUNDATION
              </h2>
              <p className="text-sm text-gray-400">{settings.description}</p>

              <div className="flex gap-5  mt-5 ">
                {settings.socials.map((social, i) => (
                  <Link
                    href={social.link}
                    target="_blank"
                    key={i}
                    className="bg-primary  p-2 rounded-full group hover:bg-white transition-all duration-300"
                  >
                    <DynamicFaIcon
                      iconName={social.icon}
                      size={20}
                      className="group-hover:text-primary text-white transition-all duration-300"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">QUICK LINKS</h2>

              <ul className="text-sm text-gray-400">
                {settings.quick_links.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={item.link}
                      className="hover:text-white uppercase"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">LEGAL</h2>
              <ul className="text-sm text-gray-400">
                {settings.legal_links.map((item, index) => (
                  <li key={index} className="mb-2">
                    <a href={item.link} className="hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">NEWSLETTER SIGNUP</h2>
              <p className="text-sm text-gray-400 mb-4">
                Join our newsletter for exclusive updates, insider insights, and
                special offers delivered straight to your inbox.
              </p>
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2  text-black flex-grow"
                />
                <button
                  type="submit"
                  className="bg-primary px-4  hover:bg-white hover:text-primary transition-all duration-300 border border-primary font-bold"
                >
                  <FaPaperPlane />
                </button>
              </form>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">CONTACT US</h2>
              <div className="footer-text break-all">
                {parser(settings.contact_details)}
              </div>
            </div>
          </div>
        </div>
        <Image
          className="opacity-30 -z-10"
          src={bgImage}
          alt="footer-bg"
          fill
          style={{ objectFit: "cover" }}
        />
      </footer>
      <div>
        <p className="text-center text-sm bg-textSecondary text-gray-400 py-4">
          © 2025 Al Ghani Foundation. All Rights Reserved. Developed by{" "}
          <a
            className="hover:text-white hover:underline"
            href="https://www.linkedin.com/in/shanto902/"
            target="_blank"
          >
            Ashik Ali Shanto
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default Footer;
