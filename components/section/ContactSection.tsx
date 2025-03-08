import { TSetting } from "@/interfaces";
import React from "react";
import parse from "html-react-parser";
const ContactSection = ({ settings }: { settings: TSetting }) => {
  return (
    <div className=" flex  items-center justify-center p-6 ">
      <div className="bg-white shadow-lg flex-col rounded-lg w-full md:flex-row  max-w-4xl flex overflow-hidden">
        {/* Left Side - Contact Info */}
        <div className="md:w-1/2 bg-primary text-white p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">CONTACT INFORMATION</h2>
          <div className="">{parse(settings.contact_details)}</div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 p-8 bg-gray-100">
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
