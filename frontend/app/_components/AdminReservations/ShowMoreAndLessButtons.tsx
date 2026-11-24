import { Dispatch, SetStateAction } from 'react';
import { MojJSON, Rezervacija } from '@/app/_lib/Interfaces';

export default function ShowMoreAndLessButtons({
  json,
  activeReservations,
  isExpanded,
  setNumShown,
}: {
  json: Record<string, MojJSON>;
  activeReservations: Rezervacija[];
  isExpanded: boolean;
  setNumShown: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div id="reservationList-showMore-div" style={json['reservationList-showMore-div']?.css || {}}>
      <button
        onClick={() =>
          setNumShown((n) => (isExpanded ? 3 : Math.min(activeReservations.length, n + 3)))
        }
        style={{
          ...(isExpanded
            ? json['reservationList-showMore-button-manje']?.css || {}
            : json['reservationList-showMore-button-jos']?.css || {}),
        }}
        id={
          isExpanded
            ? 'reservationList-showMore-button-manje'
            : 'reservationList-showMore-button-jos'
        }
      >
        {isExpanded
          ? json['reservationList-showMore-button-manje']?.text
          : json['reservationList-showMore-button-jos']?.text}
      </button>
    </div>
  );
}
