import { RezervacijaPopunjena } from "@/app/_lib/getRezervacije";
import { MiniCalendar } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";

export function Kalendar({
  listOrTable,
  setListOrTable,
  filterDatum,
  setFilterDatum,
  label,
  order,
  sortedRezervacija,
  setVisibleCount,
  setOrder,
}: {
  listOrTable: string;
  setListOrTable: Dispatch<SetStateAction<string>>;
  filterDatum: string | null;
  setFilterDatum: Dispatch<SetStateAction<string | null>>;
  label: string;
  order: string;
  sortedRezervacija: RezervacijaPopunjena[];
  setVisibleCount: Dispatch<SetStateAction<number>>;
  setOrder: Dispatch<SetStateAction<string>>;
}) {
  const now = new Date();
  const danas = now.toISOString().slice(0, 10);

  let day = now.getDay();
  if (day === 0) day = 7;

  const diff = day - 1;

  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);

  const defaultDate = monday.toISOString().slice(0, 10);
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div>
        <button
          className=" bg-gray-100 rounded-xl p-2"
          onClick={() =>
            setListOrTable((l) => (l === "list" ? "tables" : "list"))
          }
        >
          {listOrTable === "tables"
            ? "Lista rezervacija"
            : "Lista po stolovima"}
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
        <MiniCalendar
          value={filterDatum}
          onChange={setFilterDatum}
          numberOfDays={7}
          className="mx-auto"
          defaultDate={defaultDate}
          minDate={label === "Predstojece rezervacije" ? danas : undefined}
          maxDate={label !== "Predstojece rezervacije" ? danas : undefined}
          getDayProps={(date) => {
            const hasReservation = sortedRezervacija.some(
              (r) => new Date(r.dateTime).toISOString().slice(0, 10) === date,
            );

            return {
              style: {
                backgroundColor: hasReservation ? "#6366f1" : undefined,
                color: hasReservation ? "white" : undefined,
                borderRadius: "8px",
              },
            };
          }}
        />
      </div>

      <div className="flex gap-3 items-center">
        {/* Sve rezervacije */}
        <button
          onClick={() => {
            setFilterDatum(null);
            setVisibleCount(3);
          }}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          {listOrTable === "tables" ? "Danas" : "Sve Rezervacije"}
        </button>

        {/* Toggle */}
        {listOrTable === "list" && (
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => setOrder("desc")}
              className={`px-4 py-2 text-sm font-medium w-32.5 transition ${
                order === "desc"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Najnovije
            </button>

            <button
              onClick={() => setOrder("asc")}
              className={`px-4 py-2 text-sm font-medium w-32.5 transition ${
                order === "asc"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Najstarije
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
