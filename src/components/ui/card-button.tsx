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
      suppressHydrationWarning
      className={`bg-org-d-green text-white rounded-xl px-8 py-6 text-center shadow-lg hover:bg-green-800 transition-all w-64 cursor-pointer ${className}`}
    >
      <div className="flex flex-col items-center gap-2 justify-center">
        <div className="text-4xl max-[1650px]:text-3xl max-[1200px]:text-2xl max-[768px]:text-xl max-[768px]">
          {icon}
        </div>
        <div className="font-bold leading-tight text-lg max-[1650px]:text-base max-[1200px]:text-sm max-[768px]:text-xs">
          {children}
        </div>
      </div>
    </div>
  );
}
