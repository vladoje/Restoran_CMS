"use client";

import { useState } from "react";

import { RezervacijaPopunjena } from "../_lib/getRezervacije";

import { OpeningHour, Sto } from "../_lib/Interfaces";
import { Kalendar } from "./Rezervacije/Kalendar";
import { ListaRezervacija } from "./Rezervacije/ListaRezervacija";
import { TabelaRezervacija } from "./Rezervacije/TabelaRezervacija";

function AdminSveRezervacije({
  sortedRezervacija,
  label = "Predstojece rezervacije",
  stolovi,
  radnoVrijeme,
}: {
  sortedRezervacija: RezervacijaPopunjena[];
  stolovi: Sto[];
  radnoVrijeme: OpeningHour[];
  label?: string;
}) {
  const [listOrTable, setListOrTable] = useState("list");
  const [order, setOrder] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(3);
  const [filterDatum, setFilterDatum] = useState<null | string>(null);
  let rezervacije: RezervacijaPopunjena[] = [];
  if (order === "desc")
    rezervacije = [...sortedRezervacija].sort((a, b) => {
      return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
    });
  if (order === "asc")
    rezervacije = [...sortedRezervacija].sort((a, b) => {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    });
  const filteredRezervacije = filterDatum
    ? rezervacije.filter(
        (d) => d.dateTime.toISOString().slice(0, 10) === filterDatum,
      )
    : rezervacije;

  const visibleRezervacije = filteredRezervacije.slice(0, visibleCount);

  if (!rezervacije || (rezervacije.length === 0 && !filterDatum)) {
    return (
      <p className="text-gray-500 text-lg mt-10 ml-8">
        {label === "Predstojece rezervacije"
          ? " Nema rezervacija u narednih 30 dana."
          : "Nema zastarjelih rezervacija"}
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-4">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        {filterDatum ? `Rezervacije za ${filterDatum}` : label}
      </h2>

      <Kalendar
        order={order}
        setOrder={setOrder}
        label={label}
        listOrTable={listOrTable}
        setFilterDatum={setFilterDatum}
        setListOrTable={setListOrTable}
        setVisibleCount={setVisibleCount}
        filterDatum={filterDatum}
        sortedRezervacija={rezervacije}
      />
      {listOrTable === "list" && (
        <ListaRezervacija
          visibleRezervacije={visibleRezervacije}
          filterDatum={filterDatum}
          sortedRezervacija={filteredRezervacije}
          setVisibleCount={setVisibleCount}
          visibleCount={visibleCount}
        />
      )}

      {listOrTable === "tables" && (
        <TabelaRezervacija
          filterDatum={filterDatum}
          stolovi={stolovi}
          radnoVrijeme={radnoVrijeme}
          filteredRezervacije={filteredRezervacije}
        />
      )}
    </div>
  );
}

export default AdminSveRezervacije;
