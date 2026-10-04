import { Foooter, Headerr, MojJSON, Restoran } from '@/app/_lib/Interfaces';


/*
* SREDITI USER FAJLOVE DA NEMAJU PREKO 100 LINIJA KODA
*
* privacy policy samo malo, razloziti na par komponenti
* profile razdvojiti profile actions i window
* reserve table izvuci form funkciju i izvuci state u hook
* prezentacija sale izvuci na manje komponente i izvuci racunanje propertisa u hook
* reservation ocistiti page.tsx i napraviti folder u components
* reservation list razloziti na par manjih komponenti
* homepage razloziti na par manjih komponenti
*
*
* DISABLOVATI INPUTE SA DATUMIMA ALI DA BUDU MOGUCI ZA UREDJIVANJE
*
* TEKST KOJI JE VIDLJIV SAMO U SPECIFICNIM SLUCAJEVIMA OMOGUCITI VIDLJIVOST I UREDJIVANJE
*
* POCETI KORISTITI EDITING CONTEXT I OMOGUCITI MJENJANJE CSS-A U BAZI
* */




export function getDefaultGlobalStyles() {
  return {
    bg: 'white',
    primary: 'gray-900',
    secondary: 'gray-200',
    surface: 'gray-50',
    text: 'gray-600',
  };
}
export function convertCSS(globalStyles: Record<string, string>, css?: Record<string, string>) {
  if (!css) return;

  Object.values(css).forEach((style) => {
    style
      .replace(/\{([a-zA-Z0-9_-]+)\}/g, (_, key) => {
        return globalStyles[key] || '';
      })
      .replace(/\s+/g, ' ')
      .trim();
  });
  return css;
}
export function convertJSON(json: Record<string, MojJSON>, globalStyles: Record<string, string>) {
  const newJSON: Record<string, MojJSON> = {};
  Object.entries(json).map(([ime, { css, text, icon }]) => {
    newJSON[ime] = { css: convertCSS(globalStyles, css), text, icon };
  });
  return newJSON;
}
export function _json(
  restoran?: Restoran,
  header?: Headerr,
  footer?: Foooter,
): Record<string, MojJSON> {
  return {
    header: {
      css: {
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        padding: '0.75rem',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#e5e7eb',
        position: 'sticky',
        top: '0px',
        zIndex: '50',
        backgroundColor: '#ffffff',
      },
    },
    'header-logo': {
      css: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '0',
        maxWidth: '50%',
        flexShrink: '1',
        textDecoration: 'none',
      },
    },
    'header-logo-logo': {
      css: {
        position: 'relative',
        height: ' 3rem',
        width: ' 3rem',
        flexShrink: '0',
      },
    },
    'header-logo-naslov': {
      text: `${header?.text || ''}`,
      css: {
        minWidth: '0',

        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        fontWeight: '600',

        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    'header-navigation': {
      css: {
        minWidth: '0',
      },
    },
    'header-navigation-link': {
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        padding: '0.375rem 0.5rem',
        opacity: '0.7',
        transitionProperty: 'color, background-color, border-color, opacity',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        textDecoration: 'none',
      },
    },
    footer: {
      css: {
        marginTop: '4rem',
        borderTopWidth: '1px',
        width: '100%',
      },
    },
    'footer-body': {
      css: {
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: '2rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        display: 'flex',
        maxWidth: '80rem',
        flexDirection: 'column',
      },
    },
    'footer-body-logo': {
      css: {
        gap: '0.75rem',
        display: 'flex',
        maxWidth: '24rem',
        flexDirection: 'column',
      },
    },
    'footer-body-logo-image': {
      css: {
        alignItems: 'center',
        gap: '0.5rem',
        display: 'flex',
      },
    },
    'footer-body-links': {
      css: {
        gap: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    'footer-body-links-naslov': {
      text: 'Navigacija',
      css: {
        marginBottom: '0.5rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '600',
      },
    },
    'footer-body-links-link': {
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        opacity: '1',
        transitionProperty:
          'color, backgroundColor, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },
    'footer-body-contact': {
      css: {
        gap: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    'footer-body-contact-naslov': {
      text: 'Kontakt',
      css: {
        marginBottom: '0.5rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '600',
      },
    },
    'footer-body-contact-adresa': {
      text: 'Adresa',
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        opacity: '0.8',
      },
    },
    'footer-body-contact-telefon': {
      text: 'Telefon',
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        opacity: '0.8',
      },
    },
    'footer-reserved': {
      text: `© ${new Date().getFullYear()} ${footer?.text || ''}. Sva prava zadržana.`,
      css: {
        borderTopWidth: '1px',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        opacity: '0.6',
      },
    },
    'footer-body-logo-image-text': {
      text: `${footer?.text || ''}`,
      css: {
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        fontWeight: '600',
      },
    },
    'footer-body-logo-text': {
      text: `${footer?.text || ''}`,
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        opacity: '0.7',
      },
    },
    'homepage-header-text': {
      text: 'Uživajte u vrhunskom gastronomskom iskustvu i odličnoj usluzi.',
      css: {
        marginBottom: '1rem',
      },
    },
    'homepage-header-information': {
      css: {
        marginTop: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        display: 'flex',
        gap: '1.5rem',
      },
    },
    'homepage-brzeAkcije-naslov': {
      text: 'Nova rezervacija',
      css: {
        marginBottom: '1rem',
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        color: 'rgb(17,24,39)',
      },
    },
    'homepage-brzeAkcije-text': {
      text: 'rezervišite sto brzo i jednostavno.',
      css: {
        marginBottom: '1rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    },
    'homepage-rezervacije-naslov': {
      text: 'Vaše rezervacije',
      css: {
        marginBottom: '1.5rem',
        fontSize: '1.5rem',
        lineHeight: '2rem',
        color: 'rgb(17,24,39)',
      },
    },
    'homepage-rezervacije-nema': {
      text: 'Nema rezervacija',
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    },
    'homepage-rezervacije-datum': {
      css: {
        color: 'rgb(17,24,39)',
      },
    },
    'homepage-rezervacije-tacka': {
      text: '•',
      css: {
        color: 'rgb(156,163,175)',
      },
    },
    'homepage-rezervacije-start': {
      css: {
        color: 'rgb(17,24,39)',
      },
    },
    'homepage-rezervacije-gost': {
      css: {},
    },
    'homepage-rezervacije-sto': {
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    },
    'homepage-header-naslov': {
      text: restoran?.name || '',
      css: {
        marginBottom: '0.5rem',
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        color: 'rgb(17,24,39)',
      },
    },
    'homepage-header-information-address': {
      text: `Adresa: ${restoran?.address || ''}`,
      css: {},
    },
    'homepage-header-information-phone': {
      text: `Telefon: ${restoran?.phone || ''}`,
      css: {},
    },
    'homepage-header': {
      css: {
        marginBottom: '2rem',
        borderRadius: '0.5rem',
        borderWidth: '1px',
        padding: '2rem',
      },
    },
    'homepage-brzeAkcije': {
      css: {
        width: '100%',
        marginBottom: '2rem',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        boxSizing: 'border-box',
      },
    },
    'homepage-brzeAkcije-link': {
      text: 'rezerviši',
      css: {
        display: 'inline-block',
        borderRadius: '0.5rem',

        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',

        backgroundColor: '#111827',
        color: '#ffffff',

        fontWeight: '600',
        textDecoration: 'none',

        transitionProperty: 'background-color, color, transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },
    'homepage-rezervacije': {
      css: {
        width: '100%',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        padding: '1rem',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
      },
    },

    'homepage-rezervacije-rezervacija': {
      css: {
        marginTop: '0.5rem',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#d1d5db',
        padding: '0.875rem',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
        transitionProperty: 'color, background-color, border-color, box-shadow',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },

    'homepage-rezervacije-izmjeni': {
      text: 'Izmeni',
      css: {
        borderRadius: '0.5rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#d1d5db',
        paddingLeft: '0.875rem',
        paddingRight: '0.875rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        backgroundColor: '#ffffff',
        color: '#374151',
      },
    },

    'homepage-rezervacije-otkazi': {
      text: 'Otkazi',
      css: {
        borderRadius: '0.5rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#fca5a5',
        paddingLeft: '0.875rem',
        paddingRight: '0.875rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        color: '#dc2626',
        backgroundColor: '#fef2f2',
      },
    },

    "reservations-nema": {
    "text": "Nema rezervacija",
        "css": {
      "marginTop": "1.5rem",
          "borderRadius": "1rem",
          "borderWidth": "1.5px",
          "borderStyle": "dashed",
          "borderColor": "rgb(229, 231, 235)",
          "backgroundColor": "rgb(250, 250, 250)",
          "color": "rgb(156, 163, 175)",
          "padding": "2.5rem 1.5rem",
          "textAlign": "center",
          "fontSize": "0.875rem",
          "fontWeight": "500"
    }
  },
    "reservations-active": {
    "css": {
      "display": "flex",
          "flexDirection": "column",
          "gap": "0.875rem",
          "marginBottom": "2.5rem"
    }
  },
    "reservations-active-naslov": {
    "text": "Aktivni termini",
        "css": {
      "fontSize": "1rem",
          "fontWeight": "700",
          "color": "rgb(17, 24, 39)",
          "letterSpacing": "-0.01em"
    }
  },
    "reservations-active-ukupno": {
    "css": {
      "fontSize": "0.75rem",
          "color": "rgb(107, 114, 128)",
          "fontWeight": "600",
          "backgroundColor": "rgb(243, 244, 246)",
          "padding": "0.2rem 0.6rem",
          "borderRadius": "9999px",
          "marginLeft": "0.5rem"
    }
  },
    "reservations-inactive": {
    "css": {
      "display": "flex",
          "flexDirection": "column",
          "gap": "0.75rem",
          "marginTop": "2rem"
    }
  },
    "reservations-inactive-naslov": {
    "text": "Prošli termini",
        "css": {
      "fontSize": "0.875rem",
          "fontWeight": "600",
          "color": "rgb(107, 114, 128)",
          "textTransform": "uppercase",
          "letterSpacing": "0.05em"
    }
  },
    "reservations-inactive-ukupno": {
    "css": {
      "fontSize": "0.75rem",
          "color": "rgb(156, 163, 175)",
          "fontWeight": "500",
          "marginLeft": "0.375rem"
    }
  },
    "reservationList-nema": {
    "text": "Nema rezervacija",
        "css": {
      "marginTop": "1.5rem",
          "borderRadius": "1rem",
          "borderWidth": "1.5px",
          "borderStyle": "dashed",
          "borderColor": "rgb(229, 231, 235)",
          "backgroundColor": "rgb(250, 250, 250)",
          "color": "rgb(156, 163, 175)",
          "padding": "2.5rem 1.5rem",
          "textAlign": "center",
          "fontSize": "0.875rem",
          "fontWeight": "500"
    }
  },
    "reservationList-res-card": {
    "css": {
      "borderRadius": "0.875rem",
          "borderWidth": "1px",
          "borderStyle": "solid",
          "borderColor": "rgb(243, 244, 246)",
          "backgroundColor": "rgb(255, 255, 255)",
          "padding": "1rem 1.25rem",
          "boxShadow": "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
          "display": "flex",
          "flexDirection": "column",
          "gap": "0.5rem"
    }
  },
    "reservationList-res-information-poravnanje": {
    "css": {
      "display": "flex",
          "alignItems": "center",
          "justifyContent": "space-between",
          "width": "100%"
    }
  },
    "reservationList-res-datum-start": {
    "css": {
      "display": "flex",
          "alignItems": "center",
          "gap": "0.5rem",
          "fontSize": "0.875rem"
    }
  },
    "reservationList-res-datum": {
    "css": {
      "fontWeight": "600",
          "color": "rgb(31, 41, 55)"
    }
  },
    "reservationList-res-tacka": {
    "text": "•",
        "css": {
      "color": "rgb(209, 213, 219)"
    }
  },
    "reservationList-res-start": {
    "css": {
      "fontWeight": "500",
          "color": "rgb(107, 114, 128)"
    }
  },
    "reservationList-res-gost": {
    "css": {
      "fontSize": "0.875rem",
          "fontWeight": "600",
          "color": "rgb(17, 24, 39)"
    }
  },
    "reservationList-res-status-past": {
    "text": "Završeno",
        "css": {
      "borderRadius": "0.375rem",
          "backgroundColor": "rgb(243, 244, 246)",
          "color": "rgb(107, 114, 128)",
          "padding": "0.125rem 0.5rem",
          "fontSize": "0.75rem",
          "fontWeight": "500",
          "letterSpacing": "0.025em"
    }
  },
    "reservationList-res-status-new": {
    "text": "Aktivna",
        "css": {
      "borderRadius": "0.375rem",
          "backgroundColor": "rgb(236, 253, 245)",
          "color": "rgb(5, 150, 105)",
          "padding": "0.125rem 0.5rem",
          "fontSize": "0.75rem",
          "fontWeight": "600"
    }
  },
    "reservationList-res-sto": {
    "css": {
      "fontSize": "0.8125rem",
          "color": "rgb(156, 163, 175)",
          "fontWeight": "400"
    }
  },
    "reservationList-brzeAkcije": {
    "css": {
      "display": "flex",
          "alignItems": "center",
          "gap": "0.5rem",
          "marginTop": "0.25rem"
    }
  },
    "reservationList-res-izmjeni": {
    "text": "Izmeni",
        "css": {
      "borderRadius": "0.5rem",
          "borderWidth": "1px",
          "borderStyle": "solid",
          "borderColor": "rgb(229, 231, 235)",
          "backgroundColor": "rgb(255, 255, 255)",
          "color": "rgb(55, 65, 81)",
          "padding": "0.375rem 0.75rem",
          "fontSize": "0.8125rem",
          "fontWeight": "500",
          "cursor": "pointer"
    }
  },
    "reservationList-res-otkazi": {
    "text": "Otkaži",
        "css": {
      "borderRadius": "0.5rem",
          "borderWidth": "0px",
          "backgroundColor": "transparent",
          "color": "rgb(239, 68, 68)",
          "padding": "0.375rem 0.5rem",
          "fontSize": "0.8125rem",
          "fontWeight": "500",
          "cursor": "pointer"
    }
  },
    "reservationList-showMore-div": {
    "css": {
      "display": "flex",
          "justifyContent": "center",
          "paddingTop": "1.25rem",
          "marginTop": "0.5rem"
    }
  },
    "reservationList-showMore-button-manje": {
    "text": "Prikaži manje",
        "css": {
      "borderRadius": "0.5rem",
          "borderWidth": "1px",
          "borderStyle": "solid",
          "borderColor": "rgb(229, 231, 235)",
          "backgroundColor": "rgb(255, 255, 255)",
          "color": "rgb(75, 85, 99)",
          "padding": "0.5rem 1rem",
          "fontSize": "0.8125rem",
          "fontWeight": "500",
          "cursor": "pointer"
    }
  },
    "reservationList-showMore-button-jos": {
    "text": "Prikaži još prošlih rezervacija",
        "css": {
      "borderRadius": "0.5rem",
          "borderWidth": "1px",
          "borderStyle": "solid",
          "borderColor": "rgb(229, 231, 235)",
          "backgroundColor": "rgb(255, 255, 255)",
          "color": "rgb(75, 85, 99)",
          "padding": "0.5rem 1rem",
          "fontSize": "0.8125rem",
          "fontWeight": "500",
          "cursor": "pointer"
    }
  },

    'reserve-table': {
      css: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        minHeight: '100vh',
        maxWidth: '80rem',
      },
    },
    'reserve-table-grid': {
      css: {
        gap: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      },
    },
    'reserve-table-odaberi-sto': {
      css: {
        overflow: 'hidden',
        borderRadius: '1rem',
        padding: '1rem',
      },
    },
    'reserve-table-odaberi-sto-naslov': {
      text: 'Odaberi sto',
      css: {
        marginBottom: '1rem',
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        fontWeight: '600',
      },
    },
    'prezentacija-sale-sala': {
      css: {
        "caretColor": "transparent",
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderColor: 'rgb(229,231,235)',
      },
    },
    'prezentacija-sale-sto-reserved': {
      text: 'Sto {tableNumber} ({capacity} mjesta)',
      css: {
        transform: 'translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(1.05) scaleY(1.05)',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem',
        backgroundColor: 'rgb(34,197,94)',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: '500',
        color: 'rgb(255,255,255)',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },
    'prezentacija-sale-sto-not-reserved': {
      css: {
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem',
        borderWidth: '1px',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: '500',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        transform: 'translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(1.05) scaleY(1.05)',
        backgroundColor: 'rgb(243,244,246)',
      },
    },
    profile: {
      css: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '2.5rem',
        maxWidth: '28rem',
      },
    },
    'profile-inputs': {
      css: {
        marginTop: 'calc(1rem * calc(1 - 0))',
        marginBottom: 'calc(1rem * 0)',
      },
    },
    'profile-input-username': {
      text: 'Korisničko ime',
      icon: 'FaUser',
      css: {
        alignItems: 'center',
        gap: '0.5rem',
        display: 'flex',
      },
    },
    'profile-save-button': {
      text: 'Sacuvaj promjene',
      icon: 'FaSave',
      css: {
        marginTop: '1rem',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        borderRadius: '1rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontWeight: '700',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        transform: 'translate(0, 0) rotate(0) skewX(0) skewY(0) scaleX(0.97) scaleY(0.97)',
        display: 'flex',
        width: '100%',
      },
    },
    'user-avatar': {
      css: {
        marginBottom: '2.5rem',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    'user-avatar-prvo-slovo': {
      css: {
        marginBottom: '1rem',
        display: 'flex',
        height: '6rem',
        width: '6rem',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        backgroundColor: 'rgb(107,114,128)',
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        fontWeight: '900',
        color: 'rgb(255,255,255)',
      },
    },
    'user-avatar-naslov-username': {
      text: '',
      css: {
        fontSize: '1.5rem',
        lineHeight: '2rem',
        fontWeight: '700',
      },
    },
    'input-label': {
      css: {
        marginBottom: '0.5rem',
        marginLeft: '0.25rem',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: '600',
        display: 'block',
        textTransform: 'uppercase',
        letterSpacing: '0.025em',
      },
    },
    input: {
      css: {
        width: '100%',
        borderRadius: '1rem',
        borderWidth: '2px',
        borderColor: 'rgb(226,232,240)',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        paddingTop: '0.875rem',
        paddingBottom: '0.875rem',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: '500',
        outline: '2px solid transparent',
        outlineOffset: '2px',
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        color: 'rgb(148,163,184)',
        cursor: 'not-allowed',
        opacity: '0.6',
      },
    },

    'profile-actions': {
      css: {
        marginTop: '2rem',
        alignItems: 'center',
        gap: '1rem',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    'profile-actions-odjavi-button': {
      text: ' Odjavi se sa profila',
      css: {
        cursor: 'pointer',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: '700',
        color: 'rgb(239,68,68)',
        transitionProperty:
          'color, backgroundColor, border-color, text-decoration-color, fill, stroke',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },
    'profile-actions-obrisi-button': {
      text: ' Obrisi profil',
      css: {
        cursor: 'pointer',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: '700',
        color: 'rgb(239,68,68)',
        transitionProperty:
          'color, backgroundColor, border-color, text-decoration-color, fill, stroke',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },
    'profile-actions-privacy-policy-link': {
      text: 'Politika Privatnosti',
      icon: 'FaShieldHalved',
      css: {
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        transitionProperty:
          'color, backgroundColor, border-color, text-decoration-color, fill, stroke',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        color: 'rgb(99,102,241)',
        display: 'flex',
      },
    },
    window: {
      css: {
        gap: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
      },
    },
    'window-naslov-odjavi': {
      text: 'Da li ste sigurni da želite da se odjavite?',
      css: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        fontWeight: '700',
      },
    },
    'window-naslov-obrisi': {
      text: 'Da li ste sigurni da želite trajno obrisati svoj profil?',
      css: {},
    },
    'window-paragraf-odjavi': {
      text: 'Nakon odjave, moraćete ponovo da se ulogujete da biste pristupili svom nalogu.',
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
    },
    'window-paragraf-obrisi': {
      text: 'Ova akcija se ne može poništiti.',
      css: {},
    },
    "window-buttons": {
      "css": {
        "display": "flex",
        "gap": "0.75rem",
        "justifyContent": "flex-end"
      }
    },
    "close-button": {
      "text": "Odustani",
      "css": {
        "flex": "1 1 0%",
        "borderRadius": "0.75rem",
        "borderWidth": "2px",
        "borderColor": "rgb(229, 231, 235)",
        "paddingLeft": "1rem",
        "paddingRight": "1rem",
        "paddingTop": "0.75rem",
        "paddingBottom": "0.75rem",
        "fontSize": "0.875rem",
        "lineHeight": "1.25rem",
        "fontWeight": "700",
        "color": "rgb(55, 65, 81)",
        "backgroundColor": "rgb(243, 244, 246)"
      }
    },
    "window-button-odjavi": {
      "text": "Odjavi se",
      "css": {
        "flex": "1 1 0%",
        "borderRadius": "0.75rem",
        "borderWidth": "2px",
        "borderColor": "transparent",
        "paddingLeft": "1rem",
        "paddingRight": "1rem",
        "paddingTop": "0.75rem",
        "paddingBottom": "0.75rem",
        "fontSize": "0.875rem",
        "lineHeight": "1.25rem",
        "fontWeight": "700",
        "color": "rgb(255, 255, 255)",
        "backgroundColor": "rgb(185, 28, 28)"
      }
    },
    'window-button-obrisi': {
      text: 'Obriši',
      css: {},
    },
    privacy: {
      css: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        color: 'rgb(30,41,59)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        minHeigh: '100vh',

        maxWidth: '42rem',
      },
    },
    'privacy-header': {
      css: {
        marginBottom: '2.5rem',
        alignItems: 'center',
        textAlign: 'center',
        display: 'flex',

        flexDirection: 'column',
      },
    },
    'privacy-header-naslov': {
      text: 'Politika Privatnosti',
      css: {
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        fontWeight: '800',
        letterSpacing: '-0.025em',
        color: 'rgb(15,23,42)',
      },
    },
    'privacy-header-paragraf': {
      text: 'Za ugostiteljski objekat: ',
      css: {
        fontSize: '1.875rem',
        lineHeight: '2.25rem',
        fontWeight: '800',
        letterSpacing: '-0.025em',
        color: 'rgb(15,23,42)',
      },
    },
    'privacy-body': {
      css: {
        marginTop: 'calc(2.5rem * calc(1 - 0))',
        marginBottom: 'calc(2.5rem * 0)',
        borderRadius: '1rem',
        borderWidth: '1px',
        borderColor: 'rgb(226,232,240)',
        padding: '1.5rem',
      },
    },
    'privacy-body-section': {
      css: {
        marginTop: 'calc(0.75rem * calc(1 - 0))',
        marginBottom: 'calc(0.75rem * 0)',
      },
    },
    'privacy-body-section-header': {
      css: {
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: '600',
        color: 'rgb(15,23,42)',
        display: 'flex',
      },
    },
    'privacy-body-section-header-circle': {
      css: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        color: 'rgb(37,99,235)',
      },
    },
    'privacy-body-section-header-naslov': {
      text: '1. Prikupljanje Podataka',
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    'privacy-body-section-header-naslov2': {
      text: '2. Upotreba i Sigurnost',
      css: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    'privacy-body-section-body2': {
      text: `Prilikom korištenja naših usluga, rezervacije stola ili narudžbe, ${restoran?.name || ''}
              prikuplja minimalne neophodne podatke: ime, prezime, kontakt
              telefon i email adresu, isključivo u svrhu realizacije Vaše
              usluge.`,
      css: {
        paddingLeft: '1.25rem',
        fontSize: '0.875rem',
        lineHeight: '1.625',
        color: 'rgb(71,85,105)',
      },
    },
    'privacy-info': {
      css: {
        marginTop: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        borderTopWidth: '1px',
        borderColor: 'rgb(241,245,249)',
        paddingTop: '1.5rem',
        fontSize: '0.75rem',
        lineHeight: '1rem',
        color: 'rgb(100,116,139)',
      },
    },
    'privacy-info-koverta': {
      css: {
        marginTop: '0.125rem',
        flexShrink: '0',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        color: 'rgb(148,163,184)',
      },
    },
    'privacy-info-div': {
      css: {
        marginTop: 'calc(0.25rem * calc(1 - 0))',
        marginBottom: 'calc(0.25rem * 0)',
      },
    },
    'privacy-info-div-paragraf': {
      text: 'Zadnja izmjena dokumenta: ',
      css: {},
    },
    'privacy-info-div-paragraf2': {
      text: ' Za sva pitanja u vezi sa Vašim podacima, možete direktno kontaktirati objekat na: ',
      css: {},
    },
    'privacy-info-div-paragraf-span': {
      text: `${new Date().getFullYear()}.`,
      css: {
        fontWeight: '500',
        color: 'rgb(30,41,59)',
      },
    },
    'privacy-info-div-paragraf2-anchor': {
      text: `${restoran?.email || ''}`,
      css: {
        fontWeight: '600',
        color: 'rgb(29,78,216)',
        textDecorationLine: 'underline',
        textUnderlineOffset: '2px',
      },
    },
    'privacy-footer': {
      text: `  Ova politika privatnosti je pravno obavezujuća između Vas kao korisnika
        i ugostiteljskog objekta ${restoran?.name || ''}. Platforma restoranCMS pruža
        isključivo tehničku infrastrukturu.`,
      css: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2rem',
        maxWidth: '28rem',
        textAlign: 'center',
        fontSize: '11px',
        lineHeight: '1.625',
        color: 'rgb(148,163,184)',
      },
    },
    'privacy-header-paragraf-restoran': {
      text: `${restoran?.name || ''}`,
      css: {
        fontWeight: '600',
        color: 'rgb(15,23,42)',
      },
    },
    'privacy-body-section-body': {
      text: 'Prilikom korištenja naših usluga, rezervacije stola ili narudžbe, \n              prikuplja minimalne neophodne podatke: ime, prezime, kontakt\n              telefon i email adresu, isključivo u svrhu realizacije Vaše\n              usluge.',
      css: {
        paddingLeft: '1.25rem',
        fontSize: '0.875rem',
        lineHeight: '1.625',
        color: 'rgb(71,85,105)',
      },
    },
    'select-broj-gostiju': {
      css: {
        width: '100%',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        backgroundColor: 'rgb(255,255,255)',
        padding: '0.75rem',
        outline: '2px solid transparent',
        outlineOffset: '2px',
        boxShadow: '0 0 0 0px #fff,   0 0 0 calc(2px + 0px) rgb(59,130,246,0.5), 0 0 #0000',
      },
    },
    'res-detalji': {
      css: {
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        padding: '1rem',
        gap: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
      },
    },

    'naslov-detalji': {
      css: {
        fontSize: '1.125rem',
        fontWeight: '600',
      },
      text: 'Detalji rezervacije',
    },

    'izabrani-sto': {
      css: {
        padding: '0.75rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
      },
      text: 'Sto {tableNumber} (kapacitet {capacity})',
    },

    'bez-stola': {
      text: 'Niste izabrali sto',
    },

    'vrijeme-label': {
      css: {
        fontSize: '0.875rem',
        color: '#4b5563',
        marginBottom: '0.5rem',
      },
      text: 'Vrijeme',
    },

    'restoran-zatvoren': {
      css: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      },
    },

    'restoran-zatvoren-label1': {
      css: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#4b5563',
      },
      text: 'Nije dostupno za rezervacije',
    },

    'restoran-zatvoren-label2': {
      css: {
        marginTop: '0.25rem',
        fontSize: '0.75rem',
        color: '#9ca3af',
      },
      text: 'Restoran je zatvoren ovaj dan',
    },

    'broj-gostiju-label': {
      css: {
        fontSize: '0.875rem',
        color: '#4b5563',
        marginBottom: '0.5rem',
      },
      text: 'Broj gostiju',
    },

    'poruka-label': {
      css: {
        fontSize: '0.875rem',
        color: '#4b5563',
        marginBottom: '0.5rem',
      },
      text: 'Poruka restoranu',
    },

    'poruka-text': {
      css: {
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        width: '100%',
        resize: 'none',
      },
      text: 'Specijalni zahtjevi...',
    },

    potvrdi: {
      css: {
        marginTop: '0.5rem',
        backgroundColor: 'black',
        color: 'white',
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        borderRadius: '0.75rem',
        width: '100%',
      },
      text: 'Potvrdite rezervaciju',
    },

  };

}
