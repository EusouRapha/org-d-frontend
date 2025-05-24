import React from "react";

type CardButtonProps = {
  onClick?: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function CardButton({
  onClick,
  icon,
  children,
  className = "",
}: CardButtonProps) {
  return (
    <div
      role="button"
      
      onClick={onClick}
      className={`bg-org-d-green text-white rounded-xl px-8 py-6 text-center shadow-lg hover:bg-green-800 transition-all w-64 h-36 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 justify-center ">
        {icon}
        <div className="font-bold leading-tight text-4xl">{children}</div>
      </div>
    </div>
  );
}
