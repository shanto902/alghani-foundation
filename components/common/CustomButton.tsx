import Link from "next/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const CustomButton = ({
  children,
  href,
  className,
  target,
  invert = false,
  style,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  invert?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <Link
      target={target}
      href={href}
      style={style}
      className={twMerge(
        `relative inline-flex items-center gap-2 px-6 py-3 text-center tex-sm
         ${
           !invert
             ? "hover:bg-primary text-primary hover:text-white bg-white"
             : "hover:bg-white text-white hover:text-primary bg-primary"
         } hover:animate- rounded-lg border-2 border-primary shadow-none hover:shadow-lg font-bold text-md uppercase transition-all duration-300  `,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default CustomButton;
