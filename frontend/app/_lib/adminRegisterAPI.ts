//VIDJETI KOLIKO JE KOMPLIKOVANA SQL FUNKCIJA JER JE SIGURNIJA I IMA ROLLBACK I OVO OVAKO BI TREBALO VALJATI
//NEMA RATE LIMITING I DDOS PROTEKCIJU

"use server";
import slugify from "slugify";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { Restoran, Sajt, User } from "./Interfaces";
import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

interface Ids {
  userId: null | number;
  restoranId: null | number;
  sajtId: null | number;
  headerId: null | number;
  footerId: null | number;
  salaId: null | number;
  restoranUserId: null | number;
  openingSucces: boolean;
  linksSuccess: boolean;
}

export async function adminRegisterAPI({
  email,
  name,
  password,
  slug,
  restoranName,
}: {
  email: string;
  name: string;
  password: string;
  slug: string;
  restoranName: string;
}) {
  const ids: Ids = {
    userId: null,
    restoranId: null,
    sajtId: null,
    headerId: null,
    footerId: null,
    salaId: null,
    restoranUserId: null,
    openingSucces: false,
    linksSuccess: false,
  };
  const supabase = await createClient(await cookies());
  try {
    if (!slug || !restoranName || !name || !password || !email)
      throw new Error("403 neispravan unos");

    if (password.length < 8) throw new Error("Password too short");

    if (
      password.length > 64 ||
      email.length > 64 ||
      name.length > 64 ||
      restoranName.length > 64 ||
      slug.length > 64
    )
      throw new Error("Kraci unos molim");

    if (!isEmail(email)) throw new Error("Invalid email");

    const ocisceniSlug = slugify(slug, {
      lower: true,
      strict: true,
      trim: true,
    });
    if (!ocisceniSlug) throw new Error("Invalid slug");

    const [{ data: existing }, { data: existing2 }] = await Promise.all([
      supabase.from("Users").select("email").eq("email", email).maybeSingle(),
      //
      supabase
        .from("Restorani")
        .select("slug")
        .eq("slug", ocisceniSlug)
        .maybeSingle(),
    ]);
    if (existing) throw new Error("User with that email already exist");
    if (existing2) throw new Error("Restoran with that slug already exist");

    const passwordHash = await bcrypt.hash(password, 10);

    const {
      data: user,
      error,
    }: { data: User | null; error: PostgrestError | null } = await supabase
      .from("Users")
      .insert({ email, passwordHash, name, role: "admin" })
      .select("*")
      .single();
    if (!user || error) throw new Error("DB didnt create a new user");
    ids.userId = user?.userId;
    const sajt: Sajt = await konfiguracijaSajta(supabase, restoranName, ids);

    const [linksRes, restoranRes] = await Promise.all([
      supabase.from("Links").insert([
        {
          text: "Pocetna",
          url: `/${ocisceniSlug}`,
          headerId: sajt.headerId,
          footerId: sajt.footerId,
        },
        {
          text: "Profil",
          url: `/${ocisceniSlug}/profile`,
          headerId: sajt.headerId,
          footerId: sajt.footerId,
        },
        {
          text: "Politika privatnosti",
          url: `/${ocisceniSlug}/privacy-policy`,
          headerId: sajt.headerId,
          footerId: sajt.footerId,
        },
        {
          text: "Rezervacije",
          url: `/${ocisceniSlug}/reservations`,
          headerId: sajt.headerId,
          footerId: sajt.footerId,
        },
      ]),
      supabase
        .from("Restorani")
        .insert({
          slug: ocisceniSlug,
          name: restoranName,
          buffer: 15,
          trajanjeRezervacije: 120,
          ownerId: user.userId,
          siteId: sajt.siteId,
          role: "admin",
        })
        .select("*")
        .single(),
    ]);

    if (linksRes.error) throw new Error("DB didnt create links");
    ids.linksSuccess = true;
    const restoran = restoranRes.data;
    if (!restoran || restoranRes.error)
      throw new Error("DB didnt create a new restoran");
    ids.restoranId = restoranRes?.data.restoranId;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, restoranUserRes] = await Promise.all([
      konfiguracijaSaleIRadnogVremena(supabase, restoran, ids),
      supabase
        .from("RestaurantUsers")
        .insert({
          userId: user.userId,
          restoranId: restoran.restoranId,
          role: "admin",
        })
        .select("*")
        .single(),
    ]);

    if (restoranUserRes?.error || !restoranUserRes) {
      throw new Error("Database error4");
    }
    ids.restoranUserId = restoranUserRes?.data.id;
  } catch {
    await Promise.all([
      ids.userId
        ? supabase.from("Users").delete().eq("userId", ids.userId)
        : null,

      ids.restoranId
        ? supabase.from("Restorani").delete().eq("restoranId", ids.restoranId)
        : null,
      ids.linksSuccess
        ? supabase
            .from("Links")
            .delete()
            .eq("headerId", ids.headerId)
            .eq("footerId", ids.footerId)
        : null,
      ids.openingSucces
        ? supabase
            .from("OpeningHours")
            .delete()
            .eq("restoranId", ids.restoranId)
        : null,
      ids.salaId
        ? supabase.from("Sale").delete().eq("restoranId", ids.restoranId)
        : null,

      ids.sajtId
        ? supabase.from("Sajtovi").delete().eq("siteId", ids.sajtId)
        : null,

      ids.headerId
        ? supabase.from("Headers").delete().eq("headerId", ids.headerId)
        : null,

      ids.footerId
        ? supabase.from("Footers").delete().eq("footerId", ids.footerId)
        : null,

      ids.restoranUserId
        ? supabase
            .from("RestaurantUsers")
            .delete()
            .eq("restoranId", ids.restoranId)
        : null,
    ]);
  }
}

async function konfiguracijaSaleIRadnogVremena(
  supabase: SupabaseClient,
  restoran: Restoran,
  ids: Ids,
) {
  const sedam = new Date();
  sedam.setHours(7, 0, 0, 0);
  const deset = new Date();
  deset.setHours(22, 0, 0, 0);
  const [salaRes, openingHoursRes] = await Promise.all([
    supabase
      .from("Sale")
      .insert({
        restoranId: restoran.restoranId,
        width: 100,
        height: 100,
      })
      .select("*")
      .single(),
    supabase.from("OpeningHours").insert([
      {
        dayOfWeek: 0,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
      {
        dayOfWeek: 1,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
      {
        dayOfWeek: 2,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
      {
        dayOfWeek: 3,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
      {
        dayOfWeek: 4,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
      {
        dayOfWeek: 5,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
      {
        dayOfWeek: 6,
        startTime: sedam.getTime(),
        endTime: deset.getTime(),
        isOpen: true,
        restoranId: restoran.restoranId,
      },
    ]),
  ]);
  if (salaRes?.error || !salaRes)
    throw new Error("DB didnt create working hours or sala");
  ids.salaId = salaRes?.data.salaId;
  if (openingHoursRes?.error || !openingHoursRes)
    throw new Error("DB didnt create working hours or sala");
  ids.openingSucces = true;
}

async function konfiguracijaSajta(
  supabase: SupabaseClient,
  restoranName: string,
  ids: Ids,
) {
  const [headerRes, footerRes] = await Promise.all([
    supabase
      .from("Headers")
      .insert({
        hasLightModeSwitch: false,
        hasLogo: false,
        classname: "",
        text: restoranName,
      })
      .select("*")
      .single(),
    supabase
      .from("Footers")
      .insert({
        hasLogo: false,
        text: restoranName,
        hasContactInfo: true,
        classname: "",
      })
      .select("*")
      .single(),
  ]);

  if (!headerRes || headerRes?.error)
    throw new Error("DB didnt create a new header");
  ids.headerId = headerRes?.data?.headerId;
  if (!footerRes || footerRes?.error)
    throw new Error("DB didnt create a new footer");
  ids.footerId = footerRes?.data?.footerId;
  const header = headerRes.data;
  const footer = footerRes.data;

  const {
    data: sajt,
    error: error4,
  }: { data: Sajt | null; error: PostgrestError | null } = await supabase
    .from("Sajtovi")
    .insert({
      primaryColor: "blue-500",
      secondaryColor: "pink-500",
      backgroundColor: "white",
      surfaceColor: "gray-100",
      headerId: header.headerId,
      footerId: footer.footerId,
    })
    .select("*")
    .single();
  if (!sajt || error4) throw new Error("DB didnt create a new site");
  ids.sajtId = sajt?.siteId;
  return sajt;
}
