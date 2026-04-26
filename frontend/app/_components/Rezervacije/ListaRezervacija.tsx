import { RezervacijaPopunjena } from "@/app/_lib/getRezervacije";
import { Dispatch, SetStateAction } from "react";
import { ReservationCard } from "../ReservationCard";

export function ListaRezervacija({
  visibleRezervacije,
  filterDatum,
  sortedRezervacija,
  setVisibleCount,
  visibleCount,
}: {
  visibleRezervacije: RezervacijaPopunjena[];
  filterDatum: string | null;
  sortedRezervacija: RezervacijaPopunjena[];
  setVisibleCount: Dispatch<SetStateAction<number>>;
  visibleCount: number;
}) {
  return (
    <>
      <ul className="space-y-3">
        {visibleRezervacije.length ? (
          visibleRezervacije.map((d, i) => <ReservationCard key={i} d={d} />)
        ) : (
          <p className="text-gray-500 text-lg mt-10 ml-8">
            nema rezervacija za {filterDatum}
          </p>
        )}
      </ul>

      {/* BUTTONS */}
      {sortedRezervacija.length > 3 && visibleRezervacije.length !== 0 && (
        <div className="flex gap-3 mt-6">
          <button
            disabled={visibleCount === sortedRezervacija.length}
            onClick={() =>
              setVisibleCount((vc) =>
                Math.min(sortedRezervacija.length, vc + 3),
              )
            }
            className={`px-4 py-2 text-sm font-medium rounded-lg transition shadow-sm
          ${
            visibleCount === sortedRezervacija.length
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
          >
            Prikazi vise
          </button>

          <button
            disabled={visibleCount === 3}
            onClick={() => setVisibleCount((vc) => Math.max(3, vc - 3))}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition
              ${
                visibleCount === 3
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            Prikazi manje
          </button>
        </div>
      )}
    </>
  );
}
