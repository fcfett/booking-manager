import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLButtonElement> & {
  isOutline?: boolean;
  type?: HTMLButtonElement["type"];
};

export default function Button({
  type = "button",
  children,
  className,
  isOutline = false,
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      className={twMerge(
        "relative flex items-center justify-center font-semibold gap-1 rounded-full !shadow-primary/20 px-4 py-2 text-white overflow-hidden z-0 transition-all outline-none h-10",
        isOutline
          ? "border-2 text-primary hover:border-primary focus:text-pink-600 focus:border-pink-600"
          : "bg-primary hover:bg-pink-600 hover:shadow-lg focus:bg-pink-600 focus:shadow-lg",
        className,
      )}
    >
      {children}
    </button>
  );
}
