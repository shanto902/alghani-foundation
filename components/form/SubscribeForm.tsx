import React, { FormEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "sonner"; // Import Sonner

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter an email.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Subscribed successfully! 🎉");
        setEmail(""); // Clear input after success
      } else if (result.error === "Already subscribed.") {
        toast.info("You have already subscribed. 😊");
      } else {
        toast.error(result.error || "Subscription failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row items-center gap-1"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 md:w-fit text-black flex-grow border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="bg-primary px-4 py-3 hover:bg-white hover:text-primary transition-all duration-300 border border-primary font-bold rounded"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default SubscribeForm;
