import { CalendarIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { isBefore } from "date-fns";
import { twJoin } from "tailwind-merge";

import { Booking } from "@/context";

import Button from "./Button";

type Props = {
  bookings: Booking[];
  onEditClick: (booking: Booking) => void;
};

export default function BookingsList({ bookings, onEditClick }: Props) {
  const today = new Date();
  const isOverdue = (endDate: string) => isBefore(endDate, today);

  return (
    <ul className="flex grid-cols-2 flex-col gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6">
      {bookings.map((booking) => {
        const isOverdued = isOverdue(booking.to!);

        return (
          <li
            key={booking.id}
            className={twJoin(
              "group relative z-0 flex h-60 items-end overflow-hidden rounded-xl bg-slate-200 px-2 py-4 text-white !shadow-primary/20 outline-[3px] outline-primary transition-all focus-within:outline hover:z-10 hover:shadow-xl hover:outline",
              isOverdued &&
                "opacity-50 focus-within:opacity-100 hover:opacity-100",
            )}
          >
            <figure className="absolute inset-0 -z-10 flex items-center justify-center">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={booking.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              {isOverdued && (
                <figure className="z-0 flex items-center justify-center drop-shadow">
                  <CalendarIcon className="h-32 w-32 stroke-[0.05rem]" />
                  <figcaption className="absolute translate-y-4 text-center text-sm font-black uppercase tracking-widest">
                    Overdue
                  </figcaption>
                </figure>
              )}
            </figure>
            <h2 className="text-shadow mr-12 flex-1 text-lg font-semibold leading-none tracking-wide">
              {booking.name}
            </h2>
            <Button
              onClick={() => onEditClick(booking)}
              className="absolute bottom-2 right-2 w-10 p-0 group-focus-within:opacity-100 group-hover:opacity-100 lg:opacity-0"
            >
              <PencilIcon className="h-5 w-5" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
