// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    // Torna `id` opcional ou altera para string
    id?: string;
    username: string;
    access_token: string;
    expires: number;
  }

  interface Session extends DefaultSession {
    // Token de acesso que vamos injetar
    access_token: string;
    expires: number;
    user: {
      access_token: string;
      id: string;
      username: string;
      email: string;
    };
  }

  // Se quiser também tipar o JWT:
  interface JWT extends DefaultJWT {
    id: string;
    username: string;
    email: string;
    access_token: string;
    expires: number;
  }
}
