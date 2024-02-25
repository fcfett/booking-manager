import { TrashIcon } from "@heroicons/react/24/solid";
import { parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { createRef, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Booking, NewBooking } from "@/context";

import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";
import DateRangeInput, { DateRangeInputProps } from "./DateRangeInput";
import Modal from "./Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedBooking?: Booking;
  onSave: (booking: Booking | NewBooking) => void;
  onDelete: (id: Booking["id"]) => void;
  disabledDates?: DateRangeInputProps["disabledRanges"];
};

export default function BookingModal({
  isOpen,
  onSave,
  onClose,
  onDelete,
  disabledDates,
  selectedBooking,
}: Props) {
  const nameInputRef = createRef<HTMLInputElement>();
  const [confirmAction, setConfirmAction] =
    useState<[Props["onDelete"], Booking["id"]]>();
  const isConfirmOpen = Boolean(confirmAction);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* 
    const formElements = e.currentTarget.elements;
    const { name } = Object.fromEntries(
      Array.from(formElements).map((el) => [
        (el as HTMLInputElement).name,
        (el as HTMLInputElement).value,
      ]),
    );
     */

    const formElements = e.currentTarget.elements;
    const { value: name } = nameInputRef.current!;

    const { value: from } = formElements.namedItem(
      "from-date",
    ) as HTMLInputElement;
    const { value: to } = formElements.namedItem("to-date") as HTMLInputElement;

    const newBooking = { ...selectedBooking, name, from, to };

    if (from && to) {
      onSave(newBooking as Booking);
      toast.success("Your booking has been saved!");
    } else {
      toast.error(
        <>
          You must select{" "}
          <strong className="font-bold text-rose-600">when</strong> this booking
          will happen.
        </>,
      );
    }
  };

  const onDeleteClick = () => {
    selectedBooking && showConfirm(); //onDelete(selectedBooking.id);
  };

  const showConfirm = () => {
    selectedBooking && setConfirmAction(() => [onDelete, selectedBooking.id]);
  };

  const closeConfirm = () => {
    setConfirmAction(() => undefined);
  };

  const onConfirm = () => {
    const [action, id] = confirmAction!;
    action(id);
    closeConfirm();
    toast("Your booking has been deleted.", { type: "success" });
  };

  useEffect(() => {
    isOpen &&
      !isConfirmOpen &&
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 150);
  }, [isOpen, isConfirmOpen, nameInputRef]);

  const selectedDate = selectedBooking
    ? {
        from: parse(selectedBooking.from, "yyyy-MM-dd", new Date(), {
          locale: enUS,
        }),
        to: parse(selectedBooking.to, "yyyy-MM-dd", new Date(), {
          locale: enUS,
        }),
      }
    : undefined;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${selectedBooking ? "Edit" : "New"} Booking`}
      >
        <form className="flex flex-col" onSubmit={onFormSubmit}>
          <article className="flex flex-col gap-1 p-4">
            <label
              htmlFor="name"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              Name
            </label>
            <input
              ref={nameInputRef}
              required
              type="text"
              name="name"
              className="h-10 rounded-md border-2 p-2 outline-none transition-colors focus:border-primary"
              defaultValue={selectedBooking?.name}
            />
          </article>

          <article className="flex flex-col gap-1 p-4">
            <label
              htmlFor="date-range"
              className="text-xs font-bold uppercase tracking-widest text-primary"
            >
              When?
            </label>
            <DateRangeInput
              disablePastDays
              defaultSelected={selectedDate}
              disabledRanges={disabledDates}
            />
          </article>

          <footer className="flex justify-end gap-2 border-t p-4">
            {selectedBooking && (
              <Button
                type="button"
                className="mr-auto w-10 bg-rose-600 p-0 shadow-rose-600/20 outline-none hover:bg-rose-700 hover:underline focus:bg-rose-700 focus:underline"
                onClick={onDeleteClick}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            )}
            <Button isOutline onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </footer>
        </form>
      </Modal>

      <ConfirmDialog
        title="Are you sure?"
        onConfirm={onConfirm}
        onDecline={closeConfirm}
        isOpen={isConfirmOpen}
        message={
          <>
            Do you really want to{" "}
            <strong className="font-bold text-rose-600">delete</strong> this
            booking?
          </>
        }
      />
    </>
  );
}
