import bgImage from "@/assets/bg/footerBG.png";
import Image from "next/image";
const Footer = () => {
  return (
    <>
      <footer className=" bg-cover bg-center relative  bg-footer-bg bg-[#27262C] text-white p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                ABOUT AL GHANI FOUNDATION
              </h2>
              <p className="text-sm text-gray-400">
                Phasellus vitae diam pulvinar, tempus dia aliquam tellus.
                Quisque mattis odio eu placerat luctus. Vivamus magna elit,
                ultrices non lacinia vel, tempor vitae tell Fusce sit amet sem
                sit amet.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">QUICK LINKS</h2>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    CAUSES
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    PROJECTS
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    GALLERY
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    EVENTS
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">LEGAL</h2>
              <ul className="text-sm text-gray-400">
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    TERMS OF USE
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    LEGAL DISCLAIMER
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-white">
                    PRIVACY POLICY
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">NEWSLETTER SIGNUP</h2>
              <p className="text-sm text-gray-400 mb-4">
                Phasellus vitae diam pulvinar, tempus dia aliquam tellus.
                Quisque mattis odio eu placerat luctus. Vivamus magna elit,
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-l text-black flex-grow"
                />
                <button
                  type="submit"
                  className="bg-primary px-4 rounded-r hover:bg-primaryLight"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">CONTACT US</h2>
              <p className="text-sm text-gray-400">
                Phasellus vitae diam pulvinar, tempus dia aliquam tellus.
                Quisque mattis odio eu placerat luctus. Vivamus magna elit,
              </p>
              <p className="text-sm text-gray-400 mt-2">Phone: +215 369 1234</p>
              <p className="text-sm text-gray-400">
                Email Address: info@alghanifoundation.com
              </p>
            </div>
          </div>
        </div>
        <Image
          className="opacity-30"
          src={bgImage}
          alt="footer-bg"
          layout="fill"
          objectFit="cover"
        />
      </footer>
      <div>
        <p className="text-center text-sm bg-textSecondary text-gray-400 py-4">
          © 2021 Al Ghani Foundation. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
