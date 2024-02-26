import { CalendarIcon } from "@heroicons/react/24/outline";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLElement>;

export default function OverdueBadge({ className, ...props }: Props) {
  return (
    <figure
      {...props}
      className={twMerge(
        "z-0 flex items-center justify-center drop-shadow-[1px_2px_2px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <CalendarIcon className="h-32 w-32 stroke-[0.04rem]" />
      <figcaption className="absolute translate-y-4 text-center text-sm font-black uppercase tracking-widest">
        Overdue
      </figcaption>
    </figure>
  );
}
