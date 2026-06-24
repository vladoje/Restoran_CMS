import { Foooter, Headerr, Restoran } from "@/app/_lib/Interfaces";

export const globalStyles = {
  bg: "white",
  primary: "gray-900",
  secondary: "gray-200",
  surface: "gray-50",
  text: "gray-600",
};

export function _json(restoran?: Restoran, header?: Headerr, footer?: Foooter) {
  return {
    header: {
      name: "header",
      css: `border-b bg-${globalStyles?.bg || ""} mx-auto  items-center justify-between px-6 py-4`,
    },
    "header-logo": {
      name: "header-logo",
      css: "items-center gap-2",
    },
    "header-logo-naslov": {
      name: "header-logo-naslov",
      css: "font-semibold text-lg",
      text: `${header?.text || ""}`,
    },
    "header-navigation": {
      name: "header-navigation",
      css: "items-center gap-6",
    },
    "header-navigation-link": {
      name: "header-navigation-link",
      css: "text-sm font-medium hover:opacity-70 transition",
    },
    footer: {
      name: "footer",
      css: "border-t mt-16",
    },
    "footer-body": {
      name: "footer-body",
      css: "mx-auto px-6 py-10   gap-8 md:flex-row md:justify-between",
    },
    "footer-body-logo": {
      name: "footer-body-logo",
      css: "gap-3",
    },
    "footer-body-logo-image": {
      name: "footer-body-image",
      css: "items-center gap-2",
    },

    "footer-body-links": {
      name: "footer-body-links",
      css: "gap-2",
    },
    "footer-body-links-naslov": {
      name: "footer-body-links-naslov",
      css: "font-semibold text-sm mb-2",
      text: "Navigacija",
    },
    "footer-body-links-link": {
      name: "footer-body-links-link",
      css: "text-sm opacity-80 hover:opacity-100 transition",
    },
    "footer-body-contact": {
      name: "footer-body-contact",
      css: "gap-2",
    },
    "footer-body-contact-naslov": {
      name: "footer-body-contact-naslov",
      css: "font-semibold text-sm mb-2",
      text: "Kontakt",
    },
    "footer-body-contact-adresa": {
      name: "footer-body-contact-adresa",
      css: "text-sm opacity-80",
      text: "Adresa",
    },
    "footer-body-contact-telefon": {
      name: "footer-body-contact-telefon",
      css: "text-sm opacity-80",
      text: "Telefon",
    },
    "footer-reserved": {
      name: "footer-reserved",
      css: "border-t py-4 text-center text-xs opacity-60",
      text: `© ${new Date().getFullYear()} ${footer?.text || ""}. Sva prava zadržana.`,
    },
    "footer-body-logo-image-text": {
      name: "footer-body-image-text",
      css: "font-semibold text-lg",
      text: `${footer?.text || ""}`,
    },
    "footer-body-logo-text": {
      name: "footer-body-logo-text",
      css: "text-sm opacity-70",
      text: `${footer?.text || ""}`,
    },
    "homepage-header-text": {
      name: "homepage-header-text",
      text: "Uživajte u vrhunskom gastronomskom iskustvu i odličnoj usluzi.",
      css: " mb-4",
    },
    "homepage-header-information": {
      name: "homepage-header-information",
      css: "text-sm   font-medium mt-4",
    },

    "homepage-brzeAkcije-naslov": {
      name: "homepage-brzeAkcije-naslov",
      css: `text-xl mb-4 text-gray-900`,
      text: "Nova rezervacija",
    },
    "homepage-brzeAkcije-text": {
      name: "homepage-brzeAkcije-text",
      css: "text-sm  mb-4",
      text: "rezervišite sto brzo i jednostavno.",
    },

    "homepage-rezervacije-naslov": {
      name: "homepage-rezervacije-naslov",
      css: "text-2xl mb-6 text-gray-900",
      text: "Vaše rezervacije",
    },
    "homepage-rezervacije-nema": {
      name: "homepage-rezervacije-nema",
      css: `text-sm text-${globalStyles?.text || ""}`,
      text: "Nema rezervacija",
    },

    "homepage-rezervacije-datum": {
      name: "homepage-rezervacije-datum",
      css: "text-gray-900",
    },
    "homepage-rezervacije-tacka": {
      name: "homepage-rezervacije-tacka",
      css: "text-gray-400",
      text: "•",
    },
    "homepage-rezervacije-start": {
      name: "homepage-rezervacije-start",
      css: "text-gray-900",
    },
    "homepage-rezervacije-gost": {
      name: "homepage-rezervacije-gost",
      css: "",
    },
    "homepage-rezervacije-sto": {
      name: "homepage-rezervacije-sto",
      css: "text-sm ",
    },
    "homepage-header-naslov": {
      name: "homepage-header-naslov",
      text: restoran?.name || "",
      css: "text-3xl mb-2 text-gray-900",
    },

    "homepage-header-information-address": {
      name: "homepage-header-information-address",
      text: `Adresa: ${restoran?.address || ""}`,
    },
    "homepage-header-information-phone": {
      name: "homepage-header-information-phone",
      text: `Telefon: ${restoran?.phone || ""}`,
    },
    "homepage-header": {
      name: "homepage-header",
      css: `bg-${globalStyles?.surface || ""} border border-${globalStyles?.secondary || ""} rounded-lg p-8 mb-8`,
    },
    "homepage-brzeAkcije": {
      name: "homepage-brzeAkcije",
      css: `bg-${globalStyles?.surface || ""} border border-${globalStyles?.secondary || ""} rounded-lg p-6  mb-8 `,
    },
    "homepage-brzeAkcije-link": {
      name: "homepage-brzeAkcije-link",
      css: `bg-${globalStyles?.primary || ""} text-${globalStyles?.bg || ""} px-6 py-3 rounded-lg hover:bg-${globalStyles?.primary || ""} transition-colors`,
      text: "rezerviši",
    },
    "homepage-rezervacije": {
      name: "homepage-rezervacije",
      css: `bg-${globalStyles?.surface || ""} border border-${globalStyles?.secondary || ""} rounded-lg p-6`,
    },
    "homepage-rezervacije-rezervacija": {
      name: "homepage-rezervacije-rezervacija",
      css: `border mt-2 border-${globalStyles?.secondary || ""} rounded-lg p-4 hover:border-gray-300 transition-colors`,
    },
    "homepage-rezervacije-izmjeni": {
      name: "homepage-rezervacije-izmjeni",
      css: `text-sm px-4 py-2 border border-${globalStyles?.secondary || ""} rounded hover:bg-${globalStyles?.surface || ""}`,
      text: "Izmeni",
    },
    "homepage-rezervacije-otkazi": {
      name: "homepage-rezervacije-otkazi",
      css: "text-sm px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50",
      text: "Otkazi",
    },
    "reservations-nema": {
      name: "reservations-nema",
      css: `mt-16 text-sm text-${globalStyles?.text || ""} border border-dashed rounded-xl p-6 text-center`,
      text: "Nema rezervacija",
    },
    "reservations-active": {
      name: "reservations-active",
      css: "",
    },
    "reservations-active-naslov": {
      name: "reservations-active-naslov",
      css: "",
      text: "Aktivni termini",
    },
    "reservations-active-ukupno": {
      name: "reservations-active-ukupno",
      css: "",
    },
    "reservations-inactive": {
      name: "reservations-inactive",
      css: "",
    },
    "reservations-inactive-naslov": {
      name: "reservations-inactive-naslov",
      css: "",
      text: "Prosli termini",
    },
    "reservations-inactive-ukupno": {
      name: "reservations-inactive-ukupno",
      css: "",
    },
    "reservationList-nema": {
      name: "reservationList-nema",
      css: `mt-16 text-sm text-${globalStyles?.text || ""} border border-dashed rounded-xl p-6 text-center`,
      text: "Nema rezervacija",
    },
    "reservationList-res-card": {
      name: "reservationList-res-card",
      css: `border border-gray-200 rounded-xl p-5 bg-${globalStyles?.bg || ""} hover:shadow-sm hover:border-gray-300 transition-all`,
    },
    "reservationList-res-information-poravnanje": {
      name: "reservationList-res-information-poravnanje",
      css: "justify-between items-start gap-4",
    },
    "reservationList-res-datum-start": {
      name: "reservationList-res-datum-start",
      css: "flex-wrap items-center gap-2 text-sm",
    },
    "reservationList-res-datum": {
      name: "reservationList-res-datum",
      css: "font-medium text-gray-900",
    },
    "reservationList-res-tacka": {
      name: "reservationList-res-tacka",
      css: "text-gray-400",
      text: "•",
    },
    "reservationList-res-start": {
      name: "reservationList-res-start",
      css: "text-gray-900",
    },
    "reservationList-res-gost": {
      name: "reservationList-res-gost",
      css: "",
    },
    "reservationList-res-status-past": {
      name: "reservationList-res-status-past",
      css: `bg-${globalStyles?.secondary || ""} text-${globalStyles?.text || ""} ml-1 px-2 py-0.5 rounded-full text-xs font-medium`,
      text: "Završena",
    },
    "reservationList-res-status-new": {
      name: "reservationList-res-status-new",
      css: "bg-green-100 text-green-700 ml-1 px-2 py-0.5 rounded-full text-xs font-medium",
      text: "Aktivna",
    },
    "reservationList-res-sto": {
      name: "reservationList-res-sto",
      css: "text-sm ",
    },
    "reservationList-brzeAkcije": {
      name: "reservationList-brzeAkcije",
      css: "gap-2 opacity-0 group-hover:opacity-100 transition",
    },
    "reservationList-res-izmjeni": {
      name: "reservationList-res-izmjeni",
      css: `text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-${globalStyles?.surface || ""} transition`,
      text: "Izmeni",
    },
    "reservationList-res-otkazi": {
      name: "reservationList-res-otkazi",
      css: "text-sm px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition",
      text: "Otkazi",
    },
    "reservationList-showMore-div": {
      name: "reservationList-showMore-div",
      css: "justify-center pt-2",
    },
    "reservationList-showMore-button-manje": {
      name: "reservationList-showMore-button-manje",
      css: `text-sm font-medium text-${globalStyles?.text || ""} px-4 py-2 rounded-lg border border-gray-200 hover:bg-${globalStyles?.surface || ""} transition`,
      text: "Prikazi manje",
    },
    "reservationList-showMore-button-jos": {
      name: "reservationList-showMore-button-jos",
      text: "Prikazi jos",
    },
    "reserve-table": {
      name: "reserve-table",
      css: `mx-auto px-4 py-6 lg:py-10 bg-${globalStyles?.surface || ""}`,
    },
    "reserve-table-grid": {
      name: "reserve-table-grid",
      css: "gap-6",
    },
    "reserve-table-odaberi-sto": {
      name: "reserve-table-odaberi-sto",
      css: `bg-${globalStyles?.bg || ""} rounded-2xl shadow p-4 lg:p-6 overflow-hidden`,
    },
    "reserve-table-odaberi-sto-naslov": {
      name: "reserve-table-odaberi-sto-naslov",
      css: "text-lg lg:text-xl font-semibold mb-4",
      text: "Odaberi sto",
    },
    "prezentacija-sale-sala": {
      name: "prezentacija-sale-sala",
      css: `mx-auto relative border border-gray-200 rounded-xl bg-${globalStyles?.secondary || ""}`,
    },
    "prezentacija-sale-sto-reserved": {
      name: "prezentacija-sale-sto-reserved",
      css: "rounded-lg  items-center justify-center text-xs font-medium cursor-pointer transition-all  bg-green-500 text-white shadow-md scale-105",
      text: "Sto {tableNumber} ({capacity} mjesta)",
    },
    "prezentacija-sale-sto-not-reserved": {
      name: "prezentacija-sale-sto-not-reserved",
      css: `rounded-lg  items-center justify-center text-xs font-medium cursor-pointer transition-all  bg-${globalStyles?.bg || ""} text-${globalStyles?.text || ""} border hover:bg-gray-100 hover:scale-105`,
    },
    profile: {
      name: "profile",
      css: "mx-auto px-6 pt-10",
    },
    "profile-inputs": {
      name: "profile-inputs",
      css: "space-y-4",
    },
    "profile-input-username": {
      name: "profile-input-username",
      css: "items-center gap-2",
      text: "Korisničko ime",
      icon: "FaUser",
    },
    "profile-save-button": {
      name: "profile-save-button",
      css: "mt-4 font-bold py-4 rounded-2xl transition-all active:scale-[0.97]  items-center justify-center gap-3 shadow-lg cursor-pointer",
      text: "Sacuvaj promjene",
      icon: "FaSave",
    },
    "user-avatar": {
      name: "user-avatar",
      css: "items-center mb-10",
    },
    "user-avatar-prvo-slovo": {
      name: "user-avatar-prvo-slovo",
      css: "w-24 h-24 bg-gray-500   rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-200 dark:shadow-none mb-4",
    },
    "user-avatar-naslov-username": {
      name: "user-avatar-naslov-username",
      css: "text-2xl font-bold ",
      text: "",
    },
    "input-label": {
      name: "input-label",
      css: "text-xs font-semibold uppercase tracking-wide ml-1 mb-2",
    },
    input: {
      name: "input",
      css: `w-full text-base font-medium border-2 border-slate-200 rounded-2xl py-3.5 px-5 outline-none transition-all placeholder:text-gray-300 
disabled:opacity-60 disabled:bg-${globalStyles?.secondary || ""} disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200`,
    },
    "close-button": {
      name: "close-button",
      css: `flex-1 px-4 py-3 text-sm font-bold  rounded-xl hover:bg-${globalStyles?.secondary || ""} transition-colors border-2 text-${globalStyles?.text || ""}`,
      text: "Odustani",
    },

    "profile-actions": {
      name: "profile-actions",
      css: " mt-8  items-center gap-4",
    },
    "profile-actions-odjavi-button": {
      name: "profile-actions-odjavi-button",
      css: "text-red-400 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer",
      text: " Odjavi se sa profila",
    },
    "profile-actions-obrisi-button": {
      name: "profile-actions-obrisi-button",
      css: "text-red-400 text-xs font-bold hover:text-red-500 transition-colors cursor-pointer",
      text: " Obrisi profil",
    },
    "profile-actions-privacy-policy-link": {
      name: "profile-actions-privacy-policy-link",
      css: " items-center gap-2  hover:text-indigo-500 text-[10px] font-bold uppercase tracking-widest transition-colors",
      text: "Politika Privatnosti",
      icon: "FaShieldHalved",
    },

    window: {
      name: "window",
      css: "gap-6",
    },
    "window-naslov-odjavi": {
      name: "window-naslov-odjavi",
      css: "text-xl font-bold",
      text: "Da li ste sigurni da želite da se odjavite?",
    },
    "window-naslov-obrisi": {
      text: "Da li ste sigurni da želite trajno obrisati svoj profil?",
    },
    "window-paragraf-odjavi": {
      name: "window-paragraf-odjavi",
      css: "text-sm",
      text: "Nakon odjave, moraćete ponovo da se ulogujete da biste pristupili svom nalogu.",
    },
    "window-paragraf-obrisi": {
      name: "window-paragraf-obrisi",
      text: "Ova akcija se ne može poništiti.",
    },
    "window-buttons": {
      name: "window-buttons",
      css: "justify-end gap-3",
    },
    "window-button-odjavi": {
      name: "window-button-odjavi",
      css: "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
      text: "Odjavi se",
    },
    "window-button-obrisi": { text: "Obriši" },
    privacy: {
      name: "privacy",
      css: `bg-${globalStyles?.surface || ""} text-slate-800 antialiased mx-auto px-4 py-12 md:py-20`,
    },
    "privacy-header": {
      name: "privacy-header",
      css: " items-center text-center mb-10",
    },
    "privacy-header-naslov": {
      name: "privacy-header-naslov",
      css: "text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl",
      text: "Politika Privatnosti",
    },
    "privacy-header-paragraf": {
      name: "privacy-header-paragraf",
      css: "text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl",
      text: "Za ugostiteljski objekat: ",
    },

    "privacy-body": {
      name: "privacy-body",
      css: `space-y-10 bg-${globalStyles?.bg || ""} border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm`,
    },
    "privacy-body-section": {
      name: "privacy-body-section",
      css: "space-y-3",
    },
    "privacy-body-section-header": {
      name: "privacy-body-section-header",
      css: "items-center gap-2 text-slate-900 font-semibold",
    },
    "privacy-body-section-header-circle": {
      name: "privacy-body-section-header-circle",
      css: "text-blue-600 text-xs",
    },
    "privacy-body-section-header-naslov": {
      name: "privacy-body-section-header-naslov",
      css: "text-sm uppercase tracking-wider font-bold",
      text: "1. Prikupljanje Podataka",
    },
    "privacy-body-section-header-naslov2": {
      name: "privacy-body-section-header-naslov2",
      css: "text-sm uppercase tracking-wider font-bold",
      text: "2. Upotreba i Sigurnost",
    },

    "privacy-body-section-body2": {
      name: "privacy-body-section-body2",
      css: "text-sm leading-relaxed text-slate-600 pl-5",
      text: ` Vaši podaci se obrađuju unutar našeg sistema i nikada se ne prodaju
            ili dijele sa trećim licima. Pristup podacima imaju isključivo
            ovlaštena lica objekta{" "}
            <span className="font-medium text-slate-900">{restoran.name}</span>{" "}
            u svrhu menadžmenta rezervacija.`,
    },
    "privacy-info": {
      name: "privacy-info",
      css: "mt-8 pt-6 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-500",
    },
    "privacy-info-koverta": {
      name: "privacy-info-koverta",
      css: "text-base text-slate-400 mt-0.5 shrink-0",
    },
    "privacy-info-div": {
      name: "privacy-info-div",
      css: "space-y-1",
    },
    "privacy-info-div-paragraf": {
      name: "privacy-info-div-paragraf",
      text: "Zadnja izmjena dokumenta: ",
    },
    "privacy-info-div-paragraf2": {
      text: " Za sva pitanja u vezi sa Vašim podacima, možete direktno kontaktirati objekat na: ",
    },
    "privacy-info-div-paragraf-span": {
      name: "privacy-info-div-paragraf-span",
      css: "font-medium text-slate-800",
      text: `${new Date().getFullYear()}.`,
    },
    "privacy-info-div-paragraf2-anchor": {
      name: "privacy-info-div-paragraf2-anchor",
      css: "font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2",
      text: `${restoran?.email || ""}`,
    },
    "privacy-footer": {
      name: "privacy-footer",
      css: "mt-8 text-center text-[11px] text-slate-400 max-w-md mx-auto leading-relaxed",
      text: `  Ova politika privatnosti je pravno obavezujuća između Vas kao korisnika
        i ugostiteljskog objekta ${restoran?.name || ""}. Platforma restoranCMS pruža
        isključivo tehničku infrastrukturu.`,
    },
    "privacy-header-paragraf-restoran": {
      name: "privacy-header-paragraf-restoran",
      css: "font-semibold text-slate-900",
      text: `${restoran?.name || ""}`,
    },
    "privacy-body-section-body": {
      name: "privacy-body-section-body",
      css: "text-sm leading-relaxed text-slate-600 pl-5",
      text: `Prilikom korištenja naših usluga, rezervacije stola ili narudžbe, ${restoran?.name || ""}
              prikuplja minimalne neophodne podatke: ime, prezime, kontakt
              telefon i email adresu, isključivo u svrhu realizacije Vaše
              usluge.`,
    },
  };
}
