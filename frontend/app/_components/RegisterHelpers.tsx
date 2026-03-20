// export function CheckPolicy({
//   checked,
//   setChecked,
// }: {
//   checked: boolean;
//   setChecked: Function;
// }) {
//   return (
//     <div className="flex items-start px-1 py-2">
//       <input
//         type="checkbox"
//         className="mt-1 h-4 w-4 border-2  rounded"
//         checked={checked}
//         onChange={() => setChecked((a: boolean) => !a)}
//       />
//       <p className="ml-2 text-xs  leading-relaxed">
//         Prihvatam{" "}
//         <Link
//           to="/privacy-policy/bez"
//           className=" font-bold decoration-2 underline"
//         >
//           Politiku Privatnosti
//         </Link>{" "}
//         i uslove korišćenja.
//       </p>
//     </div>
//   );
// }
export interface User {
  email: string;
  role: string;
  name: string;
  userId: number;
  passwordHash: string;
}
