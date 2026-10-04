// import fs from "fs";
// import path from "path";
// import { twj } from "tw-to-css";
// import {_json} from "@/app/[restaurantSlug]/(user)/_json";
//
// type MojJSON = {
//     css?: string;
//     text?: string;
//     icon?: string;
// };
//
// export function createCompiledJsonFile(
//     json: Record<string, MojJSON>,
//     fileName = "compiled-styles.json"
// ) {
//     const compiledJSON = Object.fromEntries(
//         Object.entries(json).map(([key, value]) => [
//             key,
//             {
//                 text: value.text,
//                 icon: value.icon,
//                 css: twj(value.css || ""),
//             },
//         ])
//     );
//
//     const filePath = path.join(process.cwd(), fileName);
//
//     fs.writeFileSync(filePath, JSON.stringify(compiledJSON, null, 2), 'utf-8');
//
//     return filePath;
// }
// createCompiledJsonFile(_json())