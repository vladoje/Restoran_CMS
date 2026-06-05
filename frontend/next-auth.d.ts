import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
      name: string;
      id: number;
      passwordHash: string;
      slug?: string | null;
      restoranId?: number | null;
    };
  }
  interface User {
    email: string;
    role: string;
    name: string;
    id: number;
    passwordHash?: string;
    provider?: string | null;
    slug?: string | null;
    restoranId?: number | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    email: string;
    role: string;
    name: string;
    id: number;
    slug?: string | null;
    restoranId?: number | null;
    passwordHash: string;
  }
}
