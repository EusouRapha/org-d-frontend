import { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type IconButtonProps = {
  icon: ReactNode;
  label?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function IconButton({
  icon,
  label,
  className,
  onClick,
  ...props
}: IconButtonProps) {
  const isDisabled = props.disabled || false;

  return (
    <button
      suppressHydrationWarning
      disabled={isDisabled}
      className={clsx(
        `${className} ${
          isDisabled
            ? "opacity-50 !cursor-default !disabled:pointer-events-none"
            : "hover:bg-green-950 cursor-pointer transition duration-300 ease-in-out"
        } flex items-center `,
        label
          ? "flex-row px-4 py-2 text-org-d-pessego rounded-2xl"
          : "justify-center w-auto p-2 rounded-lg"
      )}
      onClick={onClick}
      {...props}
    >
      <div className="text-org-d-pessego">{icon}</div>{" "}
      {label && <span className="pl-2 text-org-d-pessego">{label}</span>}
    </button>
  );
}
