"use client";

import { ReactNode, useEffect, useState } from "react";
import Loading from "./loading";

export default function Template({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <div className="animate-in fade-in duration-500">{children}</div>;
}
