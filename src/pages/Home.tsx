import { PlusIcon } from "@heroicons/react/24/outline";
import { parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { useContext, useState } from "react";

import BookingModal from "@/components/BookingModal";
import BookingsList from "@/components/BookingsList";
import BookingsPlaceholder from "@/components/BookingsPlaceholder";
import Button from "@/components/Button";
import { AppContext, Booking, NewBooking } from "@/context";
import MainTemplate from "@/templates/MainTemplate";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const { bookings, addBooking, updateBooking, removeBooking } =
    useContext(AppContext);

  const bookingsCount = bookings.length;

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

  const disabledDates = bookings
    .filter(({ id }) => selectedBooking?.id !== id)
    .map(({ from, to }) => ({
      from: parse(from, "yyyy-MM-dd", new Date(), { locale: enUS }),
      to: parse(to, "yyyy-MM-dd", new Date(), { locale: enUS }),
    }));

  const sortedBookings = bookings.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
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
              recorded.
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
          <BookingsList bookings={sortedBookings} onEditClick={openModalWith} />
        ) : (
          <BookingsPlaceholder onCtaClick={() => openModalWith()} />
        )}
      </MainTemplate>

      <BookingModal
        isOpen={isModalOpen}
        onSave={onModalSave}
        onClose={closeModal}
        onDelete={onModalDelete}
        selectedBooking={selectedBooking}
        disabledDates={disabledDates}
      />
    </>
  );
}
