import { isAfter, isBefore, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

export const isOverdue = (date: string) => {
  const today = startOfDay(new Date());
  const targetDate = new Date(`${date}T23:59:59`);
  return isBefore(targetDate, today);
};

export const rangeIncludeRanges = (range: DateRange, ranges: DateRange[]) =>
  range.from &&
  range.to &&
  ranges.some(
    ({ from, to }) => isBefore(range.from!, from!) && isAfter(range.to!, to!),
  );
