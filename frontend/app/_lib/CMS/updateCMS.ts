"use server";
import { MojJSON } from "@/app/_components/AdminReservations/ReservationList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

//dodati provjeru da li su dodati stilovi koji ne bi trebali biti u css-u ali tek kada napravim listu dozvoljenih stilova
//popraviti tj napraviti provjeru json-a koji dolazi sa fe



// const allowedClasses = new Set<string>();
// function sanitizeCSS(css?: string) {
//   if (!css) return "";
//
//   return (
//     css
//       .split(/\s+/)
//       /* .split(" ") ne radi za dupli space */
//       .filter((cls) => allowedClasses.has(cls))
//       .join(" ")
//   );
// }

export async function updateCMS(
  json: Record<string, MojJSON>,
  restoranId: number,
  siteId: number,
  userId: number,
) {
  try {
    const supabase = await createClient(await cookies());

    if (!Number.isInteger(restoranId)) {
      throw new Error("Neispravan restoranId");
    }
    if (!Number.isInteger(userId)) {
      throw new Error("Neispravan userId");
    }

    const { error: fetchError2 } = await supabase
      .from("Restorani")
      .select("*")
      .eq("restoranId", restoranId)
      .eq("ownerId", userId)
      .eq("siteId", siteId)
      .single();

    if (fetchError2) {
      throw new Error("Restoran nije pronađena ili su podaci neispravni.");
    }

    const updateJSON: Record<string, MojJSON> = {};
    Object.entries(json).forEach(([name, obj]) => {
      // const newObj = { ...obj, css: {...obj.css,}};
      updateJSON[name] = obj;
    });
    //   const newObj = { ...obj, css: twMerge(sanitizeCSS(obj.css)) };
    //   updateJSON[name] = newObj;
    // });

    const { error: updateError } = await supabase
      .from("Sajtovi")
      .update({
        jsonCSS: updateJSON,
      })
      .eq("siteId", siteId);

    if (updateError) {
      console.error("Supabase Error:", updateError);
      throw new Error("Greška pri spremanju promjena u bazu.");
    }

    return { success: true, timestamp: Date.now() };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : "Greška",
      timestamp: Date.now(),
    };
  }
}
