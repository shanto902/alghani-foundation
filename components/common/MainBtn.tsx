import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const MainBtn = ({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `relative inline-block px-6 py-2 border-2 border-teal-600 text-teal-600 font-bold text-md uppercase transition-all duration-300 hover:bg-teal-600 hover:text-white`,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default MainBtn;
