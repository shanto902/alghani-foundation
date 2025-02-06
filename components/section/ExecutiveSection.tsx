"use client";

import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "Executive",
    designation: "CEO",
    description:
      "Donec varius ultrices purus. Ullam sit amet sapien tortor. Aenean it inteum felis, vel placerat nec.",
    thumbnail:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
  {
    name: "Bob Smith",
    role: "Executive",
    designation: "CTO",
    description:
      "Donec varius ultrices purus. Ullam sit amet sapien tortor. Aenean it inteum felis, vel placerat nec.",
    thumbnail:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
  },
  {
    name: "Carol White",
    role: "Executive",
    designation: "CFO",
    description:
      "Donec varius ultrices purus. Ullam sit amet sapien tortor. Aenean it inteum felis, vel placerat nec.",
    thumbnail:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
  },
  {
    name: "David Brown",
    role: "Executive",
    designation: "COO",
    description:
      "Donec varius ultrices purus. Ullam sit amet sapien tortor. Aenean it inteum felis, vel placerat nec.",
    thumbnail:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    name: "Eva Green",
    role: "Executive",
    designation: "CMO",
    description:
      "Donec varius ultrices purus. Ullam sit amet sapien tortor. Aenean it inteum felis, vel placerat nec.",
    thumbnail:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
  },
];

const ExecutiveTeam = () => {
  return (
    <PaddingContainer className="py-16 flex justify-center items-center">
      <div className="max-w-[1000px]  grid  gap-0 grid-cols-1 md:grid-cols-2">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={` flex-glow flex ${
              Math.floor(index / 2) % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } `}
          >
            <Image
              alt="Team Member"
              src={member.thumbnail}
              className="max-w-[250px] aspect-square object-cover self-end"
              width={250}
              height={250}
            />
            <div className=" max-w-[250px] h-[250px] flex justify-center items-center flex-col p-4 hover:bg-primary group hover:text-white transition-all duration-300">
              <h3 className="font-bold font-lg">{member.name}</h3>
              <p className="text-sm">{member.role}</p>
              <p className="text-sm mt-2 text-center">{member.description}</p>
              <hr className="bg-primary h-1 w-12 mt-8 group-hover:bg-white transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>
    </PaddingContainer>
  );
};

export default ExecutiveTeam;
