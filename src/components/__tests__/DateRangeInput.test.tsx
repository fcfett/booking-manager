import { render, RenderResult } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import DateRangeInput from "@/components/DateRangeInput";

jest.mock("date-fns", () => {
  const dateFns = jest.requireActual("date-fns");
  return dateFns;
});

describe("DateRangeInput", () => {
  let wrapper: RenderResult;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with no optional props without crashing", () => {
    wrapper = render(<DateRangeInput />);
    expect(wrapper).toBeDefined();
  });

  it("should render disabled dates and select a valid day", async () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const twoDaysAfter = new Date(today);
    twoDaysAfter.setUTCHours(24 * 2);

    const threeDaysAfter = new Date(today);
    threeDaysAfter.setUTCHours(24 * 3);

    const sixDaysAfter = new Date(today);
    sixDaysAfter.setUTCHours(24 * 6);

    const eightDaysAfter = new Date(today);
    eightDaysAfter.setUTCHours(24 * 8);

    const twelveDaysAfter = new Date(today);
    twelveDaysAfter.setUTCHours(24 * 12);

    wrapper = render(
      <DateRangeInput
        disablePastDays
        defaultSelected={{ from: threeDaysAfter, to: sixDaysAfter }}
        disabledRanges={[{ from: eightDaysAfter, to: twelveDaysAfter }]}
      />,
    );

    const calendarButton = wrapper.queryAllByText(twoDaysAfter.getDate());
    expect(calendarButton).toHaveLength(1);

    await act(async () => calendarButton[0].click());

    const expectedText = twoDaysAfter.toLocaleString("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const dateTextElement = wrapper.queryAllByText(expectedText);
    expect(dateTextElement).toHaveLength(1);
  });

  it("should render disabled dates and select an invalid day", async () => {
    wrapper = render(
      <DateRangeInput
        defaultSelected={{
          from: new Date("2024-01-03T00:00"),
          to: new Date("2024-01-06T00:00"),
        }}
        disabledRanges={[
          {
            from: new Date("2024-01-08T00:00"),
            to: new Date("2024-01-10T00:00"),
          },
        ]}
      />,
    );

    const outOfRangeButton = wrapper.queryAllByText("15");
    expect(outOfRangeButton).toHaveLength(1);

    await act(async () => outOfRangeButton[0].click());

    const endDatePlaceholder = wrapper.queryAllByText("end date");
    expect(endDatePlaceholder).toHaveLength(1);
  });

  it("should render clear range selection", async () => {
    wrapper = render(
      <DateRangeInput
        defaultSelected={{
          from: new Date("2024-01-03T00:00"),
          to: new Date("2024-01-03T00:00"),
        }}
      />,
    );

    const selectedButton = wrapper.queryAllByText("3");
    expect(selectedButton).toHaveLength(1);

    await act(async () => selectedButton[0].click());

    const startDatePlaceholder = wrapper.queryAllByText("end date");
    expect(startDatePlaceholder).toHaveLength(1);

    const endDatePlaceholder = wrapper.queryAllByText("end date");
    expect(endDatePlaceholder).toHaveLength(1);
  });
});
