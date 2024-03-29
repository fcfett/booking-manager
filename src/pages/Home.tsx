import { PlusIcon } from "@heroicons/react/24/outline";
import { parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { useContext, useState } from "react";
import { DateRange } from "react-day-picker";

import BookingModal from "@/components/BookingModal";
import BookingsList from "@/components/BookingsList";
import BookingsPlaceholder from "@/components/BookingsPlaceholder";
import Button from "@/components/Button";
import { Booking, BookingsContext, NewBooking } from "@/context/bookings";
import MainTemplate from "@/templates/MainTemplate";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const { bookings, addBooking, updateBooking, removeBooking } =
    useContext(BookingsContext);

  const openModalWith = (booking?: Booking) => {
    setIsModalOpen(() => true);
    booking && setSelectedBooking(() => booking);
  };

  const closeModal = () => {
    setIsModalOpen(() => false);
    setSelectedBooking(() => undefined);
  };

  const onModalSave = (booking: Booking | NewBooking) => {
    "id" in booking
      ? updateBooking(booking)
      : addBooking(booking as NewBooking);
    closeModal();
  };

  const onModalDelete = (id: Booking["id"]) => {
    removeBooking(id);
    closeModal();
  };

  const bookingsCount = bookings.length;
  const sortedBookings = bookings.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );

  const disabledDates = bookings.reduce(
    (arr: DateRange[], { id, from, to }) =>
      id !== selectedBooking?.id
        ? [
            ...arr,
            {
              from: parse(from, "yyyy-MM-dd", new Date(), { locale: enUS }),
              to: parse(to, "yyyy-MM-dd", new Date(), { locale: enUS }),
            },
          ]
        : arr,
    [],
  );

  return (
    <>
      <MainTemplate>
        <section className="sticky -top-4 z-20 -m-4 mb-0 flex items-center justify-between bg-white p-4">
          {bookingsCount > 0 && (
            <span>
              You got{" "}
              <strong className="text-primary">
                {bookingsCount} trip{bookingsCount > 1 && "s"}
              </strong>{" "}
              registered.
            </span>
          )}
          <Button
            onClick={() => openModalWith()}
            className="ml-auto w-10 lg:w-auto"
          >
            <PlusIcon className="h-5 w-5 shrink-0 stroke-[3px] lg:-ml-1" />
            <span className="hidden lg:block">Booking</span>
          </Button>
        </section>
        {bookingsCount > 0 ? (
          <BookingsList bookings={sortedBookings} onEdit={openModalWith} />
        ) : (
          <BookingsPlaceholder onCtaClick={() => openModalWith()} />
        )}
      </MainTemplate>

      <BookingModal
        isOpen={isModalOpen}
        onSave={onModalSave}
        onClose={closeModal}
        onDelete={onModalDelete}
        disabledDates={disabledDates}
        selectedBooking={selectedBooking}
      />
    </>
  );
}
