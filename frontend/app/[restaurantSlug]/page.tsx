/*
USER DASHBOARD

TO DO
ZAVRSITI INTEGRACIJU SA VREMENOM KADA POCINJE REZERVACIJA
NASTAVITI OVIM TEMPOM
LAYOUT DODATI HEADER I FOOTER 
*/

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

  // sada učitavamo rezervacije sa userId
  const [activeReservations, pastReservations]: [Rezervacija[], Rezervacija[]] =
    await Promise.all([
      getUserReservations(user.userId),
      getOldUserReservations(user.userId),
    ]);

  // sada u paraleli učitavamo stolove za sve rezervacije
  const [activeTables, pastTables]: [Sto[], Sto[]] = await Promise.all([
    Promise.all(activeReservations.map((res) => getTable(res.tableId))),
    Promise.all(pastReservations.map((res) => getTable(res.tableId))),
  ] as const);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Restaurant Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl mb-2 text-gray-900">{restoran.name}</h1>
            <p className="text-gray-600 mb-4">
              Fine dining experience with seasonal menu and exceptional service
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <div>
                <span className="font-medium">Address:</span> {restoran.address}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {restoran.phone}
              </div>
            </div>
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl mb-4 text-gray-900">Make a Reservation</h2>
          <p className="text-sm text-gray-600 mb-4">
            Book your table for an unforgettable dining experience
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl mb-4 text-gray-900">Restaurant Hours</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Thursday</span>
              <span className="text-gray-900">11:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Friday - Saturday</span>
              <span className="text-gray-900">11:00 AM - 11:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday</span>
              <span className="text-gray-900">10:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Reservations List */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl mb-6 text-gray-900">Your Reservations</h2>

        {/* Upcoming Reservations */}
        <div className="mb-6">
          <h3 className="text-lg mb-4 text-gray-700">Upcoming</h3>
          <div className="space-y-3">
            {activeReservations.map((res: Rezervacija, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-900">March 22, 2026</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-900">7:00 PM</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">4 Guests</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Table {activeTables.at(i)?.tableNumber}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      Modify
                    </button>
                    <button className="text-sm px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Reservations */}
        <div>
          <h3 className="text-lg mb-4 text-gray-700">Past</h3>
          <div className="space-y-3">
            {pastReservations.map((res: Rezervacija, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-600">March 10, 2026</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">7:30 PM</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">3 Guests</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Table {pastTables.at(i)?.tableNumber}
                    </div>
                  </div>
                  <button className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                    Book Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
