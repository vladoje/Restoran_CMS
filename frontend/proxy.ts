//dodati u user header-u bude link za vracanje na admin-a

import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
   function proxy(req: NextRequestWithAuth) {
    const destinacija = req.nextUrl.pathname;


    const token = req.nextauth.token;
    const slug = destinacija.split("/").at(1);
    if (!slug || slug === "undefined") {
      // Ako imamo token, spasi situaciju i baci ga na njegov pravi slug
      if (token?.slug) {
        return NextResponse.redirect(new URL(`/${token.slug}/admin`, req.url));
      }
      return NextResponse.redirect(new URL(`/login`, req.url));
    }
    if (!slug) {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }
    const isLoginOrRegister = destinacija
      .split("/")
      .find((url) => url === "login" || url === "register");
   const isAdminRoute = destinacija.includes("/admin");
    const isDashboard = destinacija === "/";
    const isUserDashboard = destinacija === `/${slug}`;

    if (isLoginOrRegister || isDashboard || isUserDashboard)
      return NextResponse.next();

    // 1. Ako nije ulogovan, ti preuzimaš kontrolu i šalješ ga na /[slug]/login
    if (!token) {
      if (!isAdminRoute)
        return NextResponse.redirect(new URL(`/${slug}/login`, req.url));
      return NextResponse.redirect(new URL(`/login`, req.url));
    }
    if (token.slug !== slug) {
      return NextResponse.redirect(new URL(`/${token.slug}`, req.url));
    }
    // 2. Ako JESTE ulogovan, ali nije admin, a gura se na /[slug]/admin
    if (token.role !== "admin" && isAdminRoute) {
      return NextResponse.redirect(new URL(`/${slug}`, req.url));
    }
    // if (token.role === "admin" && !isAdminRoute)
    //   return NextResponse.redirect(new URL(`/${slug}/admin`, req.url));
    return NextResponse.next();
  },
  {
    callbacks: {
      // Ova linija govori Next-Auth-u: "Pusti svakoga u middleware funkciju, ja ću unutra sam provjeriti token!"
      authorized: () => true,
    },
  },
);
export const config = {
  matcher: [
    /*
     * Uhvati sve rute OSIM:
     * 1. api ruta (Next-Auth rute za login, session itd. moraju ostati javne)
     * 2. _next/static (statički fajlovi, CSS, JS)
     * 3. _next/image (Next.js optimizacija slika)
     * 4. favicon.ico i javne slike iz public foldera (npr. .svg, .png)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)",
  ],
};
