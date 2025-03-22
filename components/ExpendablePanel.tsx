"use client";
import { useState, ReactNode } from "react";
import CustomButton from "./common/CustomButton";
import PaddingContainer from "./layout/PaddingContainer";

const ExpandablePanel = ({ children }: { children: ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative max-w-screen-xl mx-auto transition-all duration-500">
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? "max-h-none" : "h-[calc(100vh-150px)]"
        }`}
      >
        {children}
      </div>

      {!expanded && (
        <>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

          <PaddingContainer className="flex !px-5 justify-start mt-5 relative z-20">
            <button
              onClick={() => setExpanded(true)}
              className="mb-5 text-lg text-left font-bold hover:underline underline-offset-2 transition-all no-underline duration-300"
            >
              Read More
            </button>
          </PaddingContainer>
        </>
      )}
    </div>
  );
};

export default ExpandablePanel;
