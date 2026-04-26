import { RezervacijaPopunjena } from "@/app/_lib/getRezervacije";
import { OpeningHour, Sto } from "@/app/_lib/Interfaces";
import Modal from "../Modal";
import { CloseButton } from "../DateTable";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ModalContext } from "@/app/_context/ModalContext";

function getMinutes(time: string) {
  const [hours, minutes] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}
function getRangeForDateTime(dateTime: Date, durration: number) {
  const start = `${dateTime.getHours() < 10 ? "0" : ""}${dateTime.getHours()}:${dateTime.getMinutes() < 10 ? "0" : ""}${dateTime.getMinutes()}:00`;
  const endDate = new Date(dateTime);
  endDate.setMinutes(dateTime.getMinutes() + durration);
  const end = `${endDate.getHours()}:${endDate.getMinutes()}`;
  const moguceRezervacije: string[] = [];
  let trenutni = start;
  let trenutniMinutes = getMinutes(trenutni);
  while (getMinutes(end) > trenutniMinutes) {
    moguceRezervacije.push(trenutni);
    trenutniMinutes += 30;
    trenutni = `${Math.floor(trenutniMinutes / 60) < 10 ? "0" : ""}${Math.floor(trenutniMinutes / 60)}:${trenutniMinutes - Math.floor(trenutniMinutes / 60) * 60 < 10 ? "0" : ""}${trenutniMinutes - Math.floor(trenutniMinutes / 60) * 60}:00`;
  }
  return moguceRezervacije;
}
export function TabelaRezervacija({
  radnoVrijeme,
  stolovi,
  filterDatum,
  filteredRezervacije,
}: {
  stolovi: Sto[];
  filteredRezervacije: RezervacijaPopunjena[];
  radnoVrijeme: OpeningHour[];
  filterDatum: string | null;
}) {
  const [openReservation, setOpenReservation] = useState<null | number>(null);

  const filter = filterDatum
    ? filterDatum.replaceAll("-", "/")
    : new Date().toISOString();
  let day = new Date(filter).getDay();
  if (day === 0) day = 7;

  const radnoVrijemeZaDanas =
    radnoVrijeme.find((rv) => rv.dayOfWeek === day - 1) ||
    radnoVrijeme[day - 1];

  const moguceRezervacije: string[] = [];
  let trenutni = radnoVrijemeZaDanas?.startTime;
  let trenutniMinutes = getMinutes(trenutni);
  while (getMinutes(radnoVrijemeZaDanas?.endTime) > trenutniMinutes) {
    moguceRezervacije.push(trenutni);
    trenutniMinutes += 30;
    trenutni = `${Math.floor(trenutniMinutes / 60) < 10 ? "0" : ""}${Math.floor(trenutniMinutes / 60)}:${trenutniMinutes - Math.floor(trenutniMinutes / 60) * 60 < 10 ? "0" : ""}${trenutniMinutes - Math.floor(trenutniMinutes / 60) * 60}:00`;
  }

  const [dayy, month, year] = [
    new Date(filter).getDate(),
    new Date(filter).getMonth(),
    new Date(filter).getFullYear(),
  ];

  const izabraniDatum2 = `${year}-${month! + 1 < 10 ? `0${month! + 1}` : month! + 1}-${dayy! < 10 ? `0${dayy}` : dayy}`;

  const rezervacijePoStolovima = stolovi.map((sto) => {
    const rezervacijeZaStoZaIzabraniDatum = filteredRezervacije.filter(
      (res) => {
        return (
          res.table?.tableId === sto.tableId &&
          `${res.dateTime.getFullYear()}-${res.dateTime.getMonth()! + 1 < 10 ? `0${res.dateTime.getMonth()! + 1}` : res.dateTime.getMonth()! + 1}-${res.dateTime.getDate()! < 10 ? `0${res.dateTime.getDate()}` : res.dateTime.getDate()}` ===
            izabraniDatum2
        );
      },
    );
    // return getRangeForDateTime()
    return rezervacijeZaStoZaIzabraniDatum.map((rez) => {
      return {
        tableId: rez.tableId,
        reservationId: rez.reservationId,
        rangeArr: getRangeForDateTime(rez.dateTime, Number(rez.durration)),
      };
    });
  });

  if (!moguceRezervacije.length)
    return (
      <p className="text-gray-500 text-lg mt-10 ml-8">Restoran zatvoren</p>
    );
  return (
    <Modal>
      <div className="w-full overflow-x-auto">
        <table className="min-w-max border-separate border-spacing-1 table-fixed text-center">
          <thead>
            <tr>
              <th className="w-16"></th>
              {moguceRezervacije.map((moguca, i) => (
                <th
                  className="w-10 whitespace-nowrap h-8 text-[10px] bg-gray-100 rounded-md text-center"
                  key={i}
                >
                  {moguca.slice(0, 5)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stolovi.map((sto: Sto, i: number) => (
              <tr key={i}>
                <td className="w-16 whitespace-nowrap text-center align-middle">
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-sm font-semibold text-gray-800">
                      #{sto.tableNumber}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {sto.capacity} {sto.capacity !== 1 ? "mjesta" : "mjesto"}
                    </span>
                  </div>
                </td>

                {(() => {
                  const cells = [];
                  let k = 0;

                  while (k < moguceRezervacije.length) {
                    const moguca = moguceRezervacije[k];
                    const rezervacijeZaSto = rezervacijePoStolovima[i];

                    const rez = rezervacijeZaSto.find((r) =>
                      r.rangeArr.includes(moguca),
                    );

                    if (rez) {
                      const length = rez.rangeArr.length;

                      cells.push(
                        <Td
                          key={k}
                          rez={rez}
                          setOpenReservation={setOpenReservation}
                        />,
                      );

                      k += length; // preskoči slotove koje smo pokrili
                    } else {
                      cells.push(<td key={k}></td>);
                      k++;
                    }
                  }

                  return cells;
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal.Window name="window">
        <div>
          {((): ReactNode => {
            const rezervacija = filteredRezervacije.find(
              (rez) => rez.reservationId === openReservation,
            );
            const trenutniMinutes = getMinutes(
              `${rezervacija?.dateTime.getHours()}:${rezervacija?.dateTime.getMinutes()}`,
            );
            const trenutniEndMinutes =
              getMinutes(
                `${rezervacija?.dateTime.getHours()}:${rezervacija?.dateTime.getMinutes()}`,
              ) + 120;
            const start = `${Math.floor(trenutniMinutes / 60) < 10 ? "0" : ""}${Math.floor(trenutniMinutes / 60)}:${trenutniMinutes - Math.floor(trenutniMinutes / 60) * 60 < 10 ? "0" : ""}${trenutniMinutes - Math.floor(trenutniMinutes / 60) * 60}:00`;
            const end = `${Math.floor(trenutniEndMinutes / 60) < 10 ? "0" : ""}${Math.floor(trenutniEndMinutes / 60)}:${trenutniEndMinutes - Math.floor(trenutniEndMinutes / 60) * 60 < 10 ? "0" : ""}${trenutniEndMinutes - Math.floor(trenutniEndMinutes / 60) * 60}:00`;
            return (
              <div className="bg-white rounded-2xl  w-100 max-w-full p-6 relative">
                {/* Close button */}
                <div className="absolute top-3 right-3">
                  <CloseButton />
                </div>

                {/* Header */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Detalji rezervacije
                  </h2>
                  <p className="text-sm text-gray-500">Pregled informacija</p>
                </div>

                {/* Time */}
                <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 mb-4">
                  {start} – {end}
                </div>

                {/* Content */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gost</span>
                    <span className="font-medium text-gray-800">
                      {rezervacija?.user?.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-800">
                      {rezervacija?.user?.email}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Broj gostiju</span>
                    <span className="font-medium text-gray-800">
                      {rezervacija?.numberOfPeople}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Sto</span>
                    <span className="font-medium text-gray-800">
                      #{rezervacija?.table?.tableNumber}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Status</span>
                    <span className="px-2 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-700">
                      {rezervacija?.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-1">Bilješka</span>
                    <div className="bg-gray-50 border rounded-md p-2 text-gray-700 text-sm">
                      {rezervacija?.note || "Nema bilješke"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
          <CloseButton />
        </div>
      </Modal.Window>
    </Modal>
  );
}

function Td({
  setOpenReservation,
  rez,
}: {
  setOpenReservation: Dispatch<SetStateAction<null | number>>;
  rez: {
    tableId: number;
    reservationId: number;
    rangeArr: string[];
  };
}) {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a Modal");

  const { open } = context;
  return (
    <td
      onClick={() => {
        open("window");
        setOpenReservation(rez.reservationId);
      }}
      colSpan={rez.rangeArr.length}
      className="bg-red-400 text-white text-xs rounded-md"
    >
      Rezervisano
    </td>
  );
}
