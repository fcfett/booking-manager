import { PencilIcon } from "@heroicons/react/24/solid";

import { Booking } from "@/context/bookings";
import { isOverdue } from "@/utils";

import Button from "./Button";
import OverdueBadge from "./OverdueBadge";

type Props = {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
};

export default function BookingsList({ bookings, onEdit }: Props) {
  const onEditClick = (booking: Booking) => () => onEdit(booking);

  return (
    <ul className="flex grid-cols-2 flex-col gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 4xl:grid-cols-6">
      {bookings.map((booking) => {
        const isOverdueBooking = isOverdue(booking.to!);

        return (
          <li
            key={booking.id}
            className="group relative z-0 flex h-60 items-end overflow-hidden rounded-xl bg-slate-200 px-2 py-4 text-white !shadow-primary/20 outline-[3px] outline-primary transition-all focus-within:outline hover:z-10 hover:shadow-xl hover:outline"
          >
            <figure className="absolute inset-0 -z-10">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src={booking.imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </figure>
            {isOverdueBooking && (
              <figure className="absolute inset-0 z-0 flex items-center justify-center bg-white/50 transition-colors group-focus-within:bg-white/0 group-hover:bg-white/0">
                <OverdueBadge />
              </figure>
            )}
            <h2 className="text-shadow z-0 mr-12 flex-1 text-lg font-semibold leading-none tracking-wide">
              {booking.name}
            </h2>
            <Button
              onClick={onEditClick(booking)}
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
