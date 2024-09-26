"use client";
import { useEffect, useState } from "react";

interface LoadingProps {
  context: string;
}

export default function Loading({ context }: LoadingProps) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center py-4">
      <p className="text-sm text-muted-foreground tracking-tight">Loading {context}{dots}</p>
    </div>
  );
}
