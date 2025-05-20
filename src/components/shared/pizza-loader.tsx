import React from "react";
import { cn } from "@/src/lib/utils";

type Props = {
  className?: string;
};

export const PizzaLoader: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex justify-center", className)}>
      <img
        src="./peperoni.avif"
        alt="Loading..."
        className="w-20 h-20 animate-spin-slow"
      />
      
    </div>
  );
};
