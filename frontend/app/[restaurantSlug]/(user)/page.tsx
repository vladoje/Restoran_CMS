//odraditi ovako isto css za sve ostale user fajlove a i za admin nesto skontati pa zapamtiti u bazi json varijablu za svaku stranicu pa je ucitati
// i na kraju napraviti modifikovanje klasa
import Link from "next/link";

import { getRestoranWithSlug } from "../../_lib/getRestoran";
import { getUser } from "../../_lib/getUser";
import { getUserReservations } from "../../_lib/getRezervacije";
import { getAllTablesFromSala, getSala } from "../../_lib/getTables";
import { Restoran, Rezervacija, User } from "../../_lib/Interfaces";
import { getServerSession } from "next-auth";
import NewUserDashboard from "@/app/_components/NewUserDashboard";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function Page({ params }: { params: { restaurantSlug: string } }) {
  const slug = (await params).restaurantSlug;
  const session = await getServerSession(options);
  if (!session?.user) return <NewUserDashboard restaurantSlug={slug} />;
  const [restoran, user]: [Restoran, User] = await Promise.all([
    getRestoranWithSlug(slug),
    getUser(session.user.id),
  ]);

  const activeReservations: Rezervacija[] = await getUserReservations(
    user.userId,
  );

  const sala = await getSala(restoran.restoranId);
  const allTables = await getAllTablesFromSala(sala.salaId);

  const globalStyles = {
    bg: "white",
    primary: "gray-900",
    secondary: "gray-200",
    surface: "gray-50",
    text: "gray-600",
  };

  const json = {
    header: {
      css: `bg-${globalStyles.surface} border border-${globalStyles.secondary} rounded-lg p-8 mb-8`,
    },
    "header-naslov": {
      text: restoran.name,
      css: "text-3xl mb-2 text-gray-900",
    },
    "header-text": {
      text: "Uživajte u vrhunskom gastronomskom iskustvu i odličnoj usluzi.",
      css: " mb-4",
    },
    "header-information": {
      css: "text-sm   font-medium mt-4",
    },
    "header-information-address": {
      text: `Adresa: ${restoran.address}`,
    },
    "header-information-phone": {
      text: `Telefon: ${restoran.phone}`,
    },
    brzeAkcije: {
      css: `bg-${globalStyles.surface} border border-${globalStyles.secondary} rounded-lg p-6  mb-8 `,
    },
    "brzeAkcije-naslov": {
      css: "text-xl mb-4 text-gray-900",
      text: "Nova rezervacija",
    },
    "brzeAkcije-text": {
      css: "text-sm  mb-4",
      text: "Rezervišite sto brzo i jednostavno.",
    },
    "brzeAkcije-link": {
      css: `bg-${globalStyles.primary} text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors`,
      text: "Rezerviši",
    },
    rezervacije: {
      css: `bg-${globalStyles.surface} border border-${globalStyles.secondary} rounded-lg p-6`,
    },
    "rezervacije-naslov": {
      css: "text-2xl mb-6 text-gray-900",
      text: "Vaše rezervacije",
    },
    "rezervacije-nema": {
      css: "text-sm text-gray-500",
      text: "Nema rezervacija",
    },
    "rezervacije-rezervacija": {
      css: `border mt-2 border-${globalStyles.secondary} rounded-lg p-4 hover:border-gray-300 transition-colors`,
    },
    "rezervacije-datum": {
      css: "text-gray-900",
    },
    "rezervacije-tacka": {
      css: "text-gray-400",
      text: "•",
    },
    "rezervacije-start": {
      css: "text-gray-900",
    },
    "rezervacije-gost": {
      css: "",
    },
    "rezervacije-sto": {
      css: "text-sm ",
    },
    "rezervacije-izmjeni": {
      css: `text-sm px-4 py-2 border border-${globalStyles.secondary} rounded hover:bg-gray-50`,
      text: "Izmeni",
    },
    "rezervacije-otkazi": {
      css: "text-sm px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50",
      text: "Otkazi",
    },
  };

  return (
    <div
      className={`bg-${globalStyles.bg} text-${globalStyles.text} max-w-6xl mx-auto px-4 py-8`}
    >
      {/* Restoran header */}
      <div className={json.header.css}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className={json["header-naslov"].css}>
              {json["header-naslov"].text}
            </h1>
            <p className={json["header-text"].text}>
              {json["header-text"].text}
            </p>
            <div className={`flex gap-6 ${json["header-information"].css}`}>
              <div>{json["header-information-address"].text}</div>
              <div>{json["header-information-phone"].text}</div>
            </div>
          </div>
          <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
          {/* Ovo leti kada skontam kako logo-i rade */}
        </div>
      </div>

      {/* Brze akcije */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className={json["brzeAkcije"].css}>
          <h2 className={json["brzeAkcije-naslov"].css}>
            {json["brzeAkcije-naslov"].text}
          </h2>
          <p className={json["brzeAkcije-text"].css}>
            {json["brzeAkcije-text"].text}
          </p>
          <Link
            href={`${slug}/reservation`}
            className={`inline-block ${json["brzeAkcije-link"].css}`}
          >
            {json["brzeAkcije-link"].text}
          </Link>
        </div>
      </div>

      {/* Lista rezervacija */}
      <div className={json["rezervacije"].css}>
        <h2 className={json["rezervacije-naslov"].css}>
          {json["rezervacije-naslov"].text}
        </h2>

        {/* Aktivne */}

        {!activeReservations.length ? (
          <div className={json["rezervacije-nema"].css}>
            {json["rezervacije-nema"].text}
          </div>
        ) : (
          activeReservations.map((res: Rezervacija, i) => {
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
              <div key={i} className={json["rezervacije-rezervacija"].css}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={json["rezervacije-datum"].css}>
                        {datum}
                      </span>
                      <span className={json["rezervacije-tacka"].css}>
                        {json["rezervacije-tacka"].text}
                      </span>
                      <span className={json["rezervacije-start"].css}>
                        {start}
                      </span>
                      <span className={json["rezervacije-tacka"].css}>
                        {json["rezervacije-tacka"].text}
                      </span>
                      <span className={json["rezervacije-gost"].css}>
                        {res.numberOfPeople}{" "}
                        {res.numberOfPeople > 1 ? "gosta" : "gost"}
                      </span>
                    </div>
                    <div className={json["rezervacije-sto"].css}>
                      Sto{" "}
                      {
                        allTables.find((t) => t.tableId === res.tableId)
                          ?.tableNumber
                      }
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={json["rezervacije-izmjeni"].css}>
                      {json["rezervacije-izmjeni"].text}
                    </button>
                    <button className={json["rezervacije-otkazi"].css}>
                      {json["rezervacije-otkazi"].text}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Page;
