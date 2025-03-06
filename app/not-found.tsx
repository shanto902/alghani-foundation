import CustomButton from "@/components/common/CustomButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-7xl mb-5 font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 my-2">Oops! Page not found.</p>
      <p className="text-gray-500">
        The page you are looking for doesn’t exist or was moved.
      </p>
      <CustomButton href="/" className="mt-5 text-sm">
        Go Home
      </CustomButton>
    </div>
  );
}
