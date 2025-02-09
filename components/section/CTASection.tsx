"use client";
import React, { useState } from "react";
import CustomButton from "../common/CustomButton";

const CTASection: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubscribeClick = (): void => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    setName("");
    setEmail("");
    setShowForm(false);
  };

  return (
    <div className="h-44 w-full bg-black flex items-center justify-center relative overflow-hidden">
      <div className="border-r-2 pr-5 text-white text-2xl font-bold uppercase leading-9 tracking-wider">
        Make Bangladesh healthy, safe and just
      </div>

      <div className="ml-8 relative flex items-center transition-all duration-500">
        {!showForm ? (
          <button
            onClick={handleSubscribeClick}
            className="px-6 py-2 border-2 border-primary rounded-lg uppercase font-bold bg-primary text-white hover:bg-black hover:text-primaryLight transition-all duration-300"
          >
            Subscribe Now
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4  p-4 rounded-lg shadow-lg transition-transform transform translate-x-0"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 bg-black py-2 border-b-2 border-gray-300 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 bg-black py-2 border-b-2 text-white border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryDark"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CTASection;
