import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export type Booking = {
  id: string;
  to: string;
  from: string;
  name: string;
  imageUrl: string;
};

export type NewBooking = Omit<Booking, "id" | "imageUrl">;

type BookingsContextType = {
  bookings: Booking[];
  updateBooking: (booking: Booking) => void;
  removeBooking: (id: Booking["id"]) => void;
  addBooking: (newBooking: NewBooking) => void;
};

const PATIAL_BOOKINGS: NewBooking[] = [
  { name: "Brazilian's Carnival", from: "2024-02-09", to: "2024-02-17" },
  { name: "Diving in the Bahamas", from: "2024-03-14", to: "2024-03-21" },
];

export const BookingsContext = createContext<BookingsContextType>(
  {} as BookingsContextType,
);

export function BookingsProvider({ children }: PropsWithChildren) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (newBooking: NewBooking) => {
    const id = uuid();
    const imageUrl = `https://picsum.photos/680/480?${id}`;
    setBookings((prev) => [...prev, { ...newBooking, id, imageUrl }]);
  };

  const removeBooking = (id: string) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(() => updatedBookings);
  };

  const updateBooking = (updatedBooking: Booking) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking,
    );
    setBookings(() => updatedBookings);
  };

  useEffect(() => {
    const mockBookings = PATIAL_BOOKINGS.map((booking) => {
      const id = uuid();
      const imageUrl = `https://picsum.photos/680/480?${id}`;
      return { ...booking, id, imageUrl };
    });

    setBookings(() => mockBookings);
  }, []);

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, updateBooking, removeBooking }}
    >
      {children}
    </BookingsContext.Provider>
  );
}
