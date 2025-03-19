"use client";
import bgImage from "@/assets/bg/footerBG.png";
import { TSetting } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";
import { DynamicFaIcon } from "../DynamicFaIcon";
import SubscribeForm from "../form/SubscribeForm";
const Footer = ({ settings }: { settings: TSetting }) => {
  return (
    <>
      <footer className=" bg-cover bg-center relative mix-blend-multiply bg-[#27262C] text-white p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-8">
            {/* About Section */}
            <div className="md:row-span-2 ">
              {settings.logo_type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="h-14 w-fit mb-3"
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${settings.logo}`}
                  alt="logo"
                />
              ) : (
                <h2 className="text-xl font-bold mb-4">
                  ABOUT AL GHANI FOUNDATION
                </h2>
              )}
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
            <div className="lg:row-span-2">
              <h2 className="text-xl font-bold mb-4">QUICK LINKS</h2>

              <ul className="text-sm text-gray-400">
                {settings.quick_links.map((item, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={item.link}
                      className="hover:text-white uppercase hover:underline underline-offset-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links Section */}
            <div className="lg:row-span-2">
              <h2 className="text-xl font-bold mb-4">LEGAL</h2>
              <ul className="text-sm text-gray-400">
                {settings.legal_links.map((item, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={item.link}
                      className="hover:text-white uppercase hover:underline underline-offset-4"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup Section */}
            <div className="lg:order-last xl:order-none">
              <h2 className="text-xl font-bold mb-4">NEWSLETTER SIGNUP</h2>
              <p className="text-sm text-gray-400 mb-4">
                Join our newsletter for exclusive updates, inspiring stories,
                and important impact reports—delivered straight to your inbox.
                Stay connected and be part of the change!
              </p>
              <SubscribeForm />
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">CONTACT US</h2>
              <div className="footer-text break-words">
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
        <p className="text-center px-5 text-sm bg-textSecondary text-gray-400 py-4">
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
