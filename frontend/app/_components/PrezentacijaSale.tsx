import { Sto } from "../[restaurantSlug]/page";
import { Sala } from "../_lib/getTables";

function PrezentacijaSale({
  sala,
  stolovi,
  x,
  y,
  i,
  tId,
}: {
  stolovi: Sto[];
  x: number;
  y: number;
  sala: Sala;
  i: number;
  tId: number;
}) {
  const scale = x / sala.width;

  return (
    <div
      className="relative border rounded-xl bg-gray-100"
      style={{
        width: x,
        height: y,
      }}
    >
      {stolovi.map((table: Sto, k) => {
        const left = table.positionX * scale - scale * 10;
        const top = table.positionY * scale - scale * 10;
        const width = scale * 20;
        const height = scale * 20;
        const isReserved = table.tableId === tId;
        return (
          <div
            key={`${table.tableId}-${i}-${k}`}
            className={`absolute rounded-md flex items-center justify-center text-white text-xs
  ${isReserved ? "bg-green-500" : "bg-gray-300"}
`}
            style={{
              left,
              top,
              width,
              height,
            }}
          >
            {table.tableNumber}
          </div>
        );
      })}
    </div>
  );
}

export default PrezentacijaSale;
