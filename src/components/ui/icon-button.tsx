import { ReactNode } from "react";
import clsx from "clsx";

type IconButtonProps = {
  icon: ReactNode;
  label?: ReactNode;
  onClick: () => void;
};

export default function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <div
      role="button"
      className={clsx(
        "flex items-center hover:bg-green-950 cursor-pointer transition duration-300 ease-in-out",
        label
          ? "flex-row px-4 py-2 text-org-d-pessego rounded-2xl"
          : "justify-center w-auto p-2 rounded-lg"
      )}
      onClick={onClick}
    >
      <div className="text-org-d-pessego">{icon}</div>{" "}
      {label && <span className="pl-2 text-org-d-pessego">{label}</span>}
    </div>
  );
}
