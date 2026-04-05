import { useCalendar } from "../_hooks/useCalendar";

const stil =
  "bg-indigo-600 text-white font-bold shadow-sm scale-105 rounded-sm ";

export default function Td({
  isSelectDate,
  open,
  opens,
  children,
  dan,
  k,
  prva = false,
}: {
  isSelectDate?: boolean;
  open?: (opens: string) => void;
  opens?: string;
  children: React.ReactNode;
  dan: number;
  k: number | string;
  prva?: boolean;
}) {
  const { active, handleSelectDay, max, prviUMjesecu } = useCalendar();

  const cistiK = typeof k === "string" ? 0 : k;

  // Provjera da li je dan iz sljedećeg mjeseca
  const isNextMonth = dan >= max;

  let isSelected = false;
  if (active && dan) isSelected = active === dan;
  let onClickk = (a: 5 | undefined) => {
    return a;
  };

  if (isSelectDate) {
    onClickk = (a) => {
      if (!a) open?.(opens || "");
    };
  }

  /* (prva && dan > prviUMjesecu + 10)  desetka je bezveze desavala se greska da je prvi 1 a nedjelja 7 pa ako je prvi 11 nema toga a svejedno najmanji od proslog mjeseca je 23 */
  return (
    <td
      className={`${isSelected && !(prva && dan > prviUMjesecu) ? stil : ""}${(!isSelected && isNextMonth) || (prva && dan > prviUMjesecu + 10) ? "text-gray-300 bg-gray-50/30" : "text-gray-700 hover:bg-indigo-50"} py-1.5 text-sm border-b border-r last:border-r-0 border-gray-100 text-center cursor-pointer transition-all`}
      onClick={() => {
        const a = handleSelectDay(
          dan,
          cistiK,
          !isSelected && isNextMonth,
          prva && dan > 10, // odredjujemo da li je dan u proslom mjesecu broj nije bitan 10 je nasumicno jer u prvom redu je 7 datuma posevsi od 1 ili 30/1
        );
        onClickk(a);
      }}
    >
      <span className={isNextMonth ? "opacity-50" : ""}>{children}</span>
    </td>
  );
}
