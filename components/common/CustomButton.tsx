import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const CustomButton = ({
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
        `relative inline-block px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold text-md uppercase transition-all duration-300 hover:bg-primary hover:text-white`,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default CustomButton;
