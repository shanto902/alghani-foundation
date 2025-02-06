"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Import default styles
import { FaFlag } from "react-icons/fa"; // Example icon

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

const HistorySection = () => {
  return (
    <div className="py-10">
      {/* Vertical Line Added */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden md:block"></div>

      <VerticalTimeline lineColor="#D1D5DB">
        {" "}
        {/* Vertical line color */}
        {historyData.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#045857", color: "#fff" }}
            contentArrowStyle={{ borderRight: `7px solid #045857` }}
            date={event.year}
            iconStyle={{ background: "#045857", color: "#fff" }}
            icon={<FaFlag />} // Change icon if needed
          >
            <h3 className="font-bold text-lg">{event.title}</h3>
            <p className="text-sm">{event.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default HistorySection;
