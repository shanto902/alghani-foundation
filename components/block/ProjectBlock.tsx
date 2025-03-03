import { TProjectPageBlock } from "@/interfaces";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import { getAllProjects } from "@/helpers/fetchFromDirectus";
import Card from "../common/Card";

export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    "on-going-project": "Ongoing",
    "completed-project": "Completed",
    "upcoming-project": "Up Coming",
  };

  return statusMap[status] || "Unknown"; // Fallback for unexpected values
};
const ProjectBlock = async ({ block }: { block: TProjectPageBlock }) => {
  const projects = await getAllProjects(
    block.item.project_status,
    block.item.foundation.name
  );

  console.log(block.item.project_status);

  return (
    <PaddingContainer className="my-10">
      <div>
        <h3 className="text-xl font-bold">{block.item.foundation.name}</h3>
      </div>
      <div className="grid gap-5 grid-cols-2 w-full">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              project={project}
              projectStatus={block.item.project_status}
            />
          ))
        ) : (
          <p>Nothing to Show</p>
        )}
      </div>
    </PaddingContainer>
  );
};

export default ProjectBlock;
