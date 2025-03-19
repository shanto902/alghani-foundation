"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaFlag } from "react-icons/fa"; // Example icon
import { TTimelineBlock } from "@/interfaces";
import PostBody from "../post-body/PostBody";
import PaddingContainer from "../layout/PaddingContainer";

const TimelineBlock = ({ block }: { block: TTimelineBlock }) => {
  return (
    <PaddingContainer className="py-10 overflow-hidden max-w-screen-xl">
      {/* desktop  */}
      <div className="hidden md:block relative w-full">
        {/* Timeline Line (Center Line) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

        {block.item.stories.map((event, index) => {
          const isEven = index % 2 === 0; // Alternating logic

          return (
            <div
              key={index}
              className="relative gap-20 flex items-center mb-10"
            >
              {/* Left Side (Text or Image based on index) */}
              <motion.div
                className={`w-1/2 p-10 ${
                  isEven
                    ? "text-right  border-2 border-primary rounded-lg"
                    : "text-left  "
                }`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {isEven ? (
                  <>
                    <h3 className="font-bold text-xl mb-5">
                      {event.stories_id.title}
                    </h3>
                    <PostBody body={event.stories_id.story} />
                  </>
                ) : (
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${event.stories_id?.image}`}
                    alt={event.stories_id.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>

              {/* Middle Line + Icon */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2  bg-primary text-white rounded-full shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center items-center text-xl font-bold  bg-primary text-white rounded-full shadow-lg absolute z-20 size-14  left-1/2 transform -translate-x-1/2">
                  {" "}
                  {event.stories_id.year}
                </div>
              </motion.div>

              {/* Right Side (Image or Text based on index) */}
              <motion.div
                className={`w-1/2 p-10 ${
                  !isEven && "border-2 border-primary rounded-lg"
                }`}
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {!isEven ? (
                  <>
                    <h3 className="font-bold text-xl mb-5">
                      {event.stories_id.title}
                    </h3>
                    <PostBody body={event.stories_id.story} />
                  </>
                ) : (
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${event.stories_id?.image}`}
                    alt={event.stories_id.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* mobile */}

      <div className="relative block md:hidden w-full">
        {/* Timeline Line (Center Line) */}
        <div className="absolute left-5 w-1 bg-gray-300 h-full"></div>

        {block.item.stories.map((event, index) => {
          const isEven = index % 2 === 0; // Alternating logic

          return (
            <div key={index} className="relative mb-10">
              {/* Left Side (Text or Image based on index) */}
              <motion.div
                className={`w-fit ml-14 border-2 border-primary rounded-lg text-left`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="p-5">
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${event.stories_id?.image}`}
                    alt={event.stories_id.title}
                    className="w-full mr-14 h-auto rounded-lg shadow-lg mb-5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                  <h3 className="font-bold text-xl mb-5">
                    {event.stories_id.title}
                  </h3>

                  <PostBody body={event.stories_id.story} />
                </div>
              </motion.div>

              {/* Middle Line + Icon */}
              <motion.div
                className="absolute left-5 top-0  bg-primary text-white rounded-full shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center items-center text-xl font-bold  bg-primary text-white rounded-full shadow-lg absolute z-20 size-14  left-1/2 transform -translate-x-1/2">
                  {" "}
                  {event.stories_id.year}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </PaddingContainer>
  );
};

export default TimelineBlock;
