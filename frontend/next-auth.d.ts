import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      role: string;
      name: string;
      id: number;
      passwordHash: string;
    };
  }
  interface User {
    email: string;
    role: string;
    name: string;
    id: number;
    passwordHash?: string;
    provider?: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    email: string;
    role: string;
    name: string;
    id: number;
    passwordHash: string;
  }
}
