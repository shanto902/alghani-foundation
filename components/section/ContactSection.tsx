import React from "react";

const ContactSection = () => {
  return (
    <div className=" flex items-center justify-center p-6 ">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl flex overflow-hidden">
        {/* Left Side - Contact Info */}
        <div className="w-1/2 bg-primary text-white p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">CONTACT INFORMATION</h2>
          <p className="flex items-center mb-2">
            <span className="text-yellow-400 mr-2">🏠</span>
            Al-Ghani Foundation, House #57, Road #7B, Block #H, Banani, 1213,
            Bangladesh
          </p>
          <p className="flex items-center mb-2">
            <span className="text-yellow-400 mr-2">✉</span>
            info@alghanifoundation.com
          </p>
          <p className="flex items-center mb-4">
            <span className="text-yellow-400 mr-2">📞</span>
            +88017000000
          </p>
          <div className="flex space-x-3 text-lg">
            {/* <span className="cursor-pointer">🔵</span>
            <span className="cursor-pointer">🐦</span>
            <span className="cursor-pointer">🔗</span>
            <span className="cursor-pointer">▶️</span>
            <span className="cursor-pointer">📷</span>
            <span className="cursor-pointer">📌</span> */}
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-1/2 p-8 bg-gray-100">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded-lg"
              required
            />
            <textarea
              placeholder="Your message"
              className="w-full p-2 border rounded-lg"
              rows={4}
              required
            ></textarea>
            {/* <div className="bg-green-100 p-2 rounded flex items-center">
              <span className="text-green-500 mr-2">✔</span> Success!
            </div> */}
            <button
              type="submit"
              className="w-full bg-primary text-white hover:text-primary font-bold py-2 rounded-lg hover:bg-white transition-all duration-300 border border-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
