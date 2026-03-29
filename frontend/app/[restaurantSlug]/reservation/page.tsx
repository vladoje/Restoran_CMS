import { DatePickerInput, getTimeRange, TimeGrid } from "@mantine/dates";
export default async function Page() {
  //const [value, setValue] = useState<string | null>(null);
  return (
    <div>
      <div>
        <h1>Rezervisite sto</h1>
        <div>
          <p>Izaberite sto</p>
        </div>
        <div>
          <p>Datum</p>
          <DatePickerInput
            label="Pick date"
            placeholder="Pick date"
            //value={value}
            //onChange={setValue}
          />
          <p>Vrijeme</p>
          <TimeGrid
            data={getTimeRange({
              startTime: "10:00",
              endTime: "21:00",
              interval: "01:00",
            })}
            simpleGridProps={{
              type: "container",
              cols: { base: 1, "180px": 2, "320px": 3 },
              spacing: "xs",
            }}
            withSeconds={false}
            //value={value} onChange={setValue}
            //   minTime="11:00"
            // maxTime="18:00"
            //   disableTime={['10:45', '11:00', '11:30']}
            //      allowDeselect
          />
          <p>Broj gostiju</p>

          <input disabled value="Niste izabrali sto" />
          <p>Poruka restoranu</p>
          <input type="text" />
        </div>

        <button>Potvrdite rezervaciju</button>
      </div>
    </div>
  );
}

// function BrojGostiju() {
//   return (
//     <select>
//       <option>1 Gost</option>
//       <option>2 Gosta</option>
//       <option>3 Gosta</option>
//       <option>4 Gosta</option>
//       <option>5 Gosta</option>
//       <option>6 Gosta</option>
//       <option>7 Gosta</option>
//       <option>8 Gosta</option>
//       <option>9 Gosta</option>
//       <option>10 Gosta</option>
//       <option>11 Gosta</option>
//       <option>12 Gosta</option>
//       <option>13 Gosta</option>
//       <option>14 Gosta</option>
//       <option>15 Gosta</option>
//       <option>16 Gosta</option>
//       <option>17 Gosta</option>
//       <option>18 Gosta</option>
//       <option>19 Gosta</option>
//       <option>20 Gosta</option>
//     </select>
//   );
// }
// export default Page;
// function page() {
//   return <div></div>;
// }

// export default page;
