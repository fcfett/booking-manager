import { CalendarIcon } from "@heroicons/react/24/outline";
import { format, isBefore, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import style from "react-day-picker/dist/style.module.css";
import { twMerge } from "tailwind-merge";
import twColors from "tailwindcss/colors";

import { rangeIncludeRanges } from "@/utils";

type Props = {
  disabledRanges?: DateRange[];
  defaultSelected?: DateRange;
  disablePastDays?: boolean;
};

export default function DateRangeInput({
  defaultSelected,
  disabledRanges = [],
  disablePastDays = false,
}: Props) {
  const [toValue, setToValue] = useState<string>("");
  const [fromValue, setFromValue] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    defaultSelected,
  );

  const today = startOfDay(new Date());
  const disabledDates = [
    ...disabledRanges,
    disablePastDays && { before: today },
  ];

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDate: Date,
  ) => {
    setSelectedRange(() =>
      range &&
      ((disablePastDays ? isBefore(range.from!, today) : false) ||
        rangeIncludeRanges(range, disabledRanges))
        ? { from: selectedDate, to: undefined }
        : range,
    );
  };

  const fromString = selectedRange?.from
    ? format(selectedRange?.from, "PP")
    : "start date";
  const toString = selectedRange?.to
    ? format(selectedRange?.to, "PP")
    : "end date";

  useEffect(() => {
    const { from, to } = selectedRange ?? {};
    setToValue(() => (to ? format(to, "yyyy-MM-dd") : ""));
    setFromValue(() => (from ? format(from, "yyyy-MM-dd") : ""));
  }, [selectedRange]);

  return (
    <>
      <output className="relative flex min-h-[2.5rem] items-center rounded-md border-2 p-2 pr-8 leading-tight">
        <span>
          From <strong className="font-bold">{fromString}</strong> to{" "}
          <strong className="font-bold">{toString}</strong>
        </span>
        <CalendarIcon className="absolute right-2 h-5 w-5 stroke-[2px] text-gray-400" />
        <input readOnly type="hidden" name="to" value={toValue} />
        <input readOnly type="hidden" name="from" value={fromValue} />
      </output>

      <DayPicker
        mode="range"
        selected={selectedRange}
        disabled={disabledDates}
        onSelect={handleRangeSelect}
        defaultMonth={selectedRange?.from}
        className="!mx-auto !mb-0 !mt-2 w-min rounded-lg border-2 bg-white py-2 shadow-2xl"
        classNames={{
          button: twMerge(
            style.button,
            "[&:hover:not(.rdp-day_selected):hover]:bg-pink-100",
          ),
        }}
        modifiersStyles={{ selected: { backgroundColor: twColors.pink[500] } }}
      />
    </>
  );
}

export type { Props as DateRangeInputProps };
