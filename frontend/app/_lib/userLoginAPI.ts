"use server";

import { cookies } from "next/headers";

export async function clientLoginAPI(restoranId: number, slug: string) {
  (await cookies()).set("restoranId", restoranId.toString());
  (await cookies()).set("slug", slug);
}
