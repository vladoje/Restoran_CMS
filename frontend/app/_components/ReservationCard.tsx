"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { RezervacijaPopunjena } from "../_lib/getRezervacije";
import { daysOfWeek2 } from "../_context/CalendarContext";

import { changeReservationStatus } from "../_lib/createRezervacija";
const statusConfig = {
  Pending: {
    className: "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200",
    label: "⏳ Pending",
  },
  Confirmed: {
    className: "bg-green-100 text-green-700 ring-1 ring-green-200",
    label: "✅ Confirmed",
  },
  Cancelled: {
    className: "bg-red-100 text-red-700 ring-1 ring-red-200",
    label: "❌ Cancelled",
  },
};
export function ReservationCard({ d }: { d: RezervacijaPopunjena }) {
  const dayOfWeek = new Date(d.dateTime).getDay();
  const [isLoading, setIsLoading] = useState<null | string>(null);
  const [localStatus, setLocalStatus] = useState<string>(d.status);

  return (
    <li
      key={d.reservationId}
      className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition flex justify-between items-center gap-4"
    >
      {/* LEFT */}
      <div>
        <p className="font-semibold text-gray-800">
          {`${d.dateTime.toISOString().slice(0, 10)} ${d.dateTime.toLocaleTimeString().slice(0, 5)}`}{" "}
          ({daysOfWeek2[dayOfWeek as keyof typeof daysOfWeek2]})
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {d.note || "Nema bilješke"}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500 mt-1">
          Gost: {`${d.user?.name}` || ""}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Email: {`${d.user?.email}` || ""}
        </p>
      </div>
      <div>
        <p className="font-semibold text-gray-800">
          Sto {d.table?.tableNumber}
        </p>
      </div>
      <div>
        <p className="font-semibold text-gray-800">
          {" "}
          {d.numberOfPeople} gost{d.numberOfPeople === 1 ? "" : "a"}
        </p>
      </div>
      {/* RIGHT */}
      <div
        className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
          statusConfig[localStatus as keyof typeof statusConfig]?.className ||
          "bg-gray-100 text-gray-600"
        }`}
      >
        {statusConfig[localStatus as keyof typeof statusConfig]?.label ||
          localStatus}
      </div>
      {localStatus === "Pending" && (
        <div>
          <StatusButton
            localStatus={localStatus}
            setLocalStatus={setLocalStatus}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            status="Confirmed"
            reservationId={d.reservationId}
            label="Dosao"
            className="mx-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-green-400 text-yellow-200"
          />
          <StatusButton
            localStatus={localStatus}
            setLocalStatus={setLocalStatus}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            status="Cancelled"
            reservationId={d.reservationId}
            label=" Nije dosao"
            className="mx-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-red-400 text-red-950"
          />
        </div>
      )}
      {localStatus === "Cancelled" && (
        <div>
          <StatusButton
            localStatus={localStatus}
            setLocalStatus={setLocalStatus}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            status="Confirmed"
            reservationId={d.reservationId}
            label="Ipak dosao"
            className="mx-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-green-400 text-yellow-200"
          />
        </div>
      )}
      {localStatus === "Confirmed" && (
        <div>
          <StatusButton
            localStatus={localStatus}
            setLocalStatus={setLocalStatus}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            status="Cancelled"
            reservationId={d.reservationId}
            label="Ipak nije dosao"
            className="mx-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm bg-red-400 text-red-950"
          />
        </div>
      )}
    </li>
  );
}
function StatusButton({
  className,
  label,
  localStatus,
  reservationId,
  status,
  isLoading,
  setIsLoading,
  setLocalStatus,
}: {
  className: string;
  label: string;
  localStatus: string;
  reservationId: number;
  isLoading: null | string;
  status: string;
  setIsLoading: Dispatch<SetStateAction<null | string>>;
  setLocalStatus: Dispatch<SetStateAction<string>>;
}) {
  const ls = localStatus;

  return (
    <button
      className={className}
      disabled={!!isLoading}
      onClick={async () => {
        if (isLoading) return; // 🔥 dodatna zaštita
        setLocalStatus(status);
        setIsLoading(label);
        try {
          await changeReservationStatus(reservationId, status);
        } catch {
          setLocalStatus(ls);
        } finally {
          setIsLoading(null);
        }
      }}
    >
      {isLoading === label ? "Loading..." : label}
    </button>
  );
}
