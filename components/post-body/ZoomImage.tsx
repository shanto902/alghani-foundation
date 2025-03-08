"use client";
// Import necessary modules and types
// Import necessary modules and types
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "./overlayStyle.css";
import { shimmer, toBase64 } from "@/lib/blur-image";

// Define the props type for the ErrorBoundary component
type ErrorBoundaryProps = {
  children: React.ReactNode;
};

// Error boundary class component
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Called when an error occurs in a child component
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  // Called after an error has been thrown
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught by error boundary:", error, errorInfo);
    // Reload the website upon encountering an error
    window.location.reload();
  }

  render() {
    // Render the child components
    return this.props.children;
  }
}

// ZoomImage component
const ZoomImage = ({
  src,
  alt,
  id,
  blurDataURL,
  width,
  height,
}: {
  src: string;
  alt: string;
  id?: string;
  blurDataURL: string;
  width: string;
  height: string;
}) => {
  return (
    // Wrap the component with the ErrorBoundary
    <ErrorBoundary>
      <Zoom key={id ? id : Math.random()} wrapElement="span">
        <Image
          className="w-full pb-5 md:pb-0 object-cover rounded-lg object-center h-auto"
          src={src}
          alt={alt}
          width={Number(width) || 1200}
          height={Number(height) || 700}
          // placeholder={`data:image/svg+xml;base64,${toBase64(
          //   shimmer(500, 500)
          // )}`}
          placeholder={
            blurDataURL
              ? "blur"
              : `data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`
          }
          blurDataURL={blurDataURL}
        />
      </Zoom>
    </ErrorBoundary>
  );
};

export default ZoomImage;
