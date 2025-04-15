"use client";

import * as React from "react";
import { Button } from "./ui/button";

interface IconButtonProps {
  icon: string;
  className?: string;
  onClick?: () => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className = "",
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="link"
      className={`flex cursor-pointer justify-center items-center p-3 self-stretch my-auto rounded-lg aspect-[1/1] bg-zinc-100 h-[42px] min-h-[42px] w-[42px] ${className}`}
    >
      <img
        src={icon}
        className="object-contain self-stretch fill-slate-500 w-auto"
      />
    </Button>
  );
};
