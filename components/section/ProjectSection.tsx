"use client";
import React, { useState } from "react";
import Card from "../common/Card";

type ProjectStatus = "ongoing" | "upcoming" | "done";

interface Project {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  status: ProjectStatus;
}

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const mockData: Project[] = [
    {
      id: 1,
      imageUrl:
        "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
      title: "Project 1",
      description: "This is a description for Project 1.",
      status: "ongoing",
    },
    {
      id: 2,
      imageUrl:
        "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
      title: "Project 2",
      description: "This is a description for Project 2.",
      status: "upcoming",
    },
    {
      id: 3,
      imageUrl:
        "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
      title: "Project 3",
      description: "This is a description for Project 3.",
      status: "done",
    },
    {
      id: 4,
      imageUrl:
        "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
      title: "Project 4",
      description: "This is a description for Project 4.",
      status: "ongoing",
    },
    {
      id: 5,
      imageUrl:
        "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
      title: "Project 5",
      description: "This is a description for Project 5.",
      status: "upcoming",
    },
  ];

  const filteredData =
    filter === "all"
      ? mockData
      : mockData.filter((project) => project.status === filter);

  return (
    <div className="p-5 font-sans">
      <div className="flex justify-center mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as ProjectStatus | "all")}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredData.map((item) => (
          <Card
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
