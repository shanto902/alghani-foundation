import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const PaddingContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={twMerge(
        "mx-auto px-5 sm:px-8 container overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
};

export default PaddingContainer;
