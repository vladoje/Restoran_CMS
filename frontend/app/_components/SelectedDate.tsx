import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { daysOfWeek, MonthIndex, months } from "../_context/CalendarContext";
import { useCalendar } from "../_hooks/useCalendar";

export function SelectedDate() {
  const { month, year, handleNextMonth, handlePrevMonth } = useCalendar();
  const today = new Date();
  return (
    <div className="flex items-center justify-center gap-4">
      {(month !== today.getMonth() || year! > today.getFullYear()) && (
        <button className="cursor-pointer" onClick={handlePrevMonth}>
          <GoArrowLeft size={24} />
        </button>
      )}
      <H1Datum />
      <button className="cursor-pointer" onClick={handleNextMonth}>
        <GoArrowRight size={24} />
      </button>
    </div>
  );
}
export function H1Datum() {
  const { day, month, year, dayOfWeek, nastavak } = useCalendar();
  return (
    <h1 className="text-base font-bold">
      {dayOfWeek || dayOfWeek === 0
        ? `${daysOfWeek[dayOfWeek as keyof typeof daysOfWeek]},`
        : ""}{" "}
      {day ? `${day}-${nastavak} ` : ""}
      {months[month as MonthIndex].at(1)}, {year}
    </h1>
  );
}
