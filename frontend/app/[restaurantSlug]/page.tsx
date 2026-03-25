import Link from "next/link";
import { User } from "../_components/RegisterHelpers";
import { getRestoranWithSlug } from "../_lib/getRestoran";
import { getUser } from "../_lib/getUser";
import {
  getOldUserReservations,
  getUserReservations,
} from "../_lib/getRezervacije";
import { getTable } from "../_lib/getTables";

export interface Restoran {
  restoranId: number;
  ownerId: number;
  siteId: number;
  name: string;
  address: string;
  phone: string;
  buffer: number;
  trajanjeRezervacije: string;
  slug: string;
}

export interface Rezervacija {
  reservationId: number;
  restoranId: number;
  userId: number;
  tableId: number;
  dateTime: Date;
  durration: string;
  numberOfPeople: number;
  note: string;
  status: string;
}

export interface Sto {
  tableId: number;
  capacity: number;
  positionX: number;
  positionY: number;
  orientation: number;
  salaId: number;
  tableNumber: number;
}

async function Page({ params }: { params: { restoranSlug: string } }) {
  const slug = params.restoranSlug;

  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(1),
  ]);

  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);

  const [activeTables, pastTables]: [Sto[], Sto[]] = await Promise.all([
    Promise.all(activeReservations.map((res) => getTable(res.tableId))),
    Promise.all(pastReservations.map((res) => getTable(res.tableId))),
  ] as const);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Restoran header */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-gray-900">{restoran.name}</h1>
            <p className="text-gray-600 mb-4">
              Uživajte u vrhunskom gastronomskom iskustvu i odličnoj usluzi.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium">Adresa:</span> {restoran.address}
              </div>
              <div>
                <span className="font-medium">Telefon:</span> {restoran.phone}
              </div>
            </div>
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
        </div>
      </div>

      {/* Brze akcije */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl mb-4 text-gray-900">Nova rezervacija</h2>
          <p className="text-sm text-gray-600 mb-4">
            Rezervišite sto brzo i jednostavno.
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Rezerviši
          </Link>
        </div>
      </div>

      {/* Lista rezervacija */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl mb-6 text-gray-900">Vaše rezervacije</h2>

        {/* Aktivne */}
        <div className="mb-6">
          <h3 className="text-lg mb-4 text-gray-700">Predstojeće</h3>
          <div className="space-y-3">
            {activeReservations.map((res: Rezervacija, i) => {
              const datum = `${res.dateTime.getDate()}.${res.dateTime.getMonth() + 1}.${res.dateTime.getFullYear()}.`;
              const sati =
                res.dateTime.getHours() < 10
                  ? `0${res.dateTime.getHours()}`
                  : res.dateTime.getHours();
              const minuta =
                res.dateTime.getMinutes() < 10
                  ? `0${res.dateTime.getMinutes()}`
                  : res.dateTime.getMinutes();
              const start = `${sati}:${minuta}`;

              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-900">{datum}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-900">{start}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                          {res.numberOfPeople} gostiju
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Sto {activeTables.at(i)?.tableNumber}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                        Izmeni
                      </button>
                      <button className="text-sm px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50">
                        Otkaži
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prošle */}
        <div>
          <h3 className="text-lg mb-4 text-gray-700">Prošle rezervacije</h3>
          <div className="space-y-3">
            {pastReservations.map((res: Rezervacija, i) => {
              const datum = `${res.dateTime.getDate()}.${res.dateTime.getMonth() + 1}.${res.dateTime.getFullYear()}.`;
              const sati =
                res.dateTime.getHours() < 10
                  ? `0${res.dateTime.getHours()}`
                  : res.dateTime.getHours();
              const minuta =
                res.dateTime.getMinutes() < 10
                  ? `0${res.dateTime.getMinutes()}`
                  : res.dateTime.getMinutes();
              const start = `${sati}:${minuta}`;

              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gray-600">{datum}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{start}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                          {res.numberOfPeople} gostiju
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Sto {pastTables.at(i)?.tableNumber}
                      </div>
                    </div>
                    <button className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                      Ponovi rezervaciju
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
