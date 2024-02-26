import { render, RenderResult } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { toast } from "react-toastify";

import App from "@/App";

jest.useFakeTimers();

jest.spyOn(global, "setTimeout");
jest.spyOn(Storage.prototype, "setItem");

jest.mock("react-toastify");
jest.mock("uuid", () => {
  const uuid = jest.requireActual("uuid");
  return uuid;
});

describe("App", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    wrapper = render(<App />);
  });

  it("should render without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  it("should store items on `localStorage` before leave the window", () => {
    window.dispatchEvent(new Event("beforeunload"));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("should create a booking and update", async () => {
    const today = new Date();
    today.setUTCHours(3, 0, 0, 0);

    const addBooking = wrapper.queryAllByRole("button")[0];
    expect(addBooking.textContent).toEqual("Booking");

    await act(async () => addBooking.click());

    let nameInput = wrapper.queryAllByText("Name")[0]
      .nextSibling as HTMLInputElement;
    expect(nameInput).toHaveProperty("type", "text");

    const newBookingName = "Testing booking creation";
    await act(async () => (nameInput.value = newBookingName));

    let saveButton = wrapper.queryAllByText("Save");
    expect(saveButton).toHaveLength(1);

    await act(async () => saveButton[0].click());

    expect(toast.error).toHaveBeenCalledTimes(1);

    const todayButton = wrapper.queryAllByText(today.getDate());
    expect(todayButton).toHaveLength(1);

    await act(async () => todayButton[0].click());

    const expectedText = today.toLocaleString("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const dateTextElement = wrapper.queryAllByText(expectedText);
    expect(dateTextElement).toHaveLength(1);

    await act(async () => todayButton[0].click());

    const dateTextElements = wrapper.queryAllByText(expectedText);
    expect(dateTextElements).toHaveLength(2);

    expect(saveButton).toHaveLength(1);

    await act(async () => saveButton[0].click());

    const newBookingTitle = wrapper.queryAllByText(newBookingName);
    expect(newBookingTitle).toHaveLength(1);

    const editButton = newBookingTitle[0].nextSibling as HTMLButtonElement;
    expect(editButton).toHaveProperty("type", "button");

    await act(async () => editButton.click());

    const modalHeaderEdit = wrapper.queryAllByText("Edit Booking");
    expect(modalHeaderEdit).toHaveLength(1);

    nameInput = wrapper.queryAllByText("Name")[0]
      .nextSibling as HTMLInputElement;
    expect(nameInput).toHaveProperty("type", "text");

    const updatedBookingName = "Testing booking update";
    await act(async () => (nameInput.value = updatedBookingName));

    saveButton = wrapper.queryAllByText("Save");
    expect(saveButton).toHaveLength(1);
    await act(async () => saveButton[0].click());

    const updatedBookingTitle = wrapper.queryAllByText(updatedBookingName);
    expect(updatedBookingTitle).toHaveLength(1);
  });

  it("should delete all bookings", async () => {
    const firstBookingName = "Brazilian's Carnival";
    const bookingTitle = wrapper.queryAllByText(firstBookingName);
    expect(bookingTitle).toHaveLength(1);

    let editButton = bookingTitle[0].nextSibling as HTMLButtonElement;
    expect(editButton).toHaveProperty("type", "button");

    await act(async () => editButton.click());
    await act(async () => jest.runAllTimers());
    expect(setTimeout).toHaveBeenCalledTimes(1);

    const cancelButton = wrapper.queryAllByText("Cancel");
    expect(cancelButton).toHaveLength(1);

    let deleteButton = cancelButton[0].previousSibling as HTMLButtonElement;
    expect(deleteButton).toHaveProperty("type", "button");

    await act(async () => deleteButton.click());

    const confirmButton = wrapper.queryAllByText("Yes");
    expect(confirmButton).toHaveLength(1);

    await act(async () => confirmButton[0].click());

    const deletedBookingTitle = wrapper.queryAllByText(firstBookingName);
    expect(deletedBookingTitle).toHaveLength(0);

    const lastBookingName = "Diving in the Bahamas";
    const lastBookingTitle = wrapper.queryAllByText(lastBookingName);
    expect(lastBookingTitle).toHaveLength(1);

    editButton = lastBookingTitle[0].nextSibling as HTMLButtonElement;
    expect(editButton).toHaveProperty("type", "button");

    await act(async () => editButton.click());

    deleteButton = wrapper.queryAllByText("Cancel")[0]
      .previousSibling as HTMLButtonElement;
    expect(deleteButton).toHaveProperty("type", "button");

    await act(async () => deleteButton.click());
    await act(async () => wrapper.queryAllByText("Yes")[0].click());

    const bookingsPlaceholderButton = wrapper.queryAllByText("Let's plan")[0];
    expect(bookingsPlaceholderButton).toHaveProperty("type", "button");

    await act(async () => bookingsPlaceholderButton.click());

    expect(wrapper.queryAllByText("New Booking")).toHaveLength(1);
  });
});
