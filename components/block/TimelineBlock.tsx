"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Import default styles
import { FaFlag } from "react-icons/fa"; // Example icon
import { TTimelineBlock } from "@/interfaces";
import PostBody from "../post-body/PostBody";

const historyData = [
  {
    year: "2010",
    title: "Foundation Laid",
    description: "The company was founded with a vision to innovate.",
    color: "#3B82F6", // Blue
  },
  {
    year: "2013",
    title: "First Milestone",
    description: "We launched our first product and gained traction.",
    color: "#10B981", // Green
  },
  {
    year: "2016",
    title: "Global Expansion",
    description: "Expanded operations internationally.",
    color: "#EF4444", // Red
  },
  {
    year: "2019",
    title: "New Innovations",
    description: "Introduced AI-powered solutions in our products.",
    color: "#FBBF24", // Yellow
  },
  {
    year: "2023",
    title: "Industry Leader",
    description: "Became a top player in the industry.",
    color: "#8B5CF6", // Purple
  },
];

const TimelineBlock = ({ block }: { block: TTimelineBlock }) => {
  return (
    <div className="py-10">
      {/* Vertical Line Added */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden md:block"></div>

      <VerticalTimeline lineColor="#D1D5DB">
        {" "}
        {/* Vertical line color */}
        {block.item.milestones.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            dateClassName={"text-black !text-xl !font-bold"}
            className="vertical-timeline-element--work milestone"
            contentStyle={{
              background: "white",
              color: "black",
              border: "2px solid grey",
            }}
            contentArrowStyle={{ borderRight: `7px solid #045857` }}
            date={event.year}
            iconStyle={{ background: "#045857", color: "#fff" }}
            icon={<FaFlag />} // Change icon if needed
          >
            <h3 className="font-bold text-lg">{event.step}</h3>
            <PostBody body={event.story} />
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default TimelineBlock;
