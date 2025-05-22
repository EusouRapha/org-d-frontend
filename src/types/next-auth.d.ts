import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: number;
    name: string;
    cpf: string;
    phone_number: string;
    access_token: string;
    expires: number;
  }

  interface Session extends DefaultSession {
    access_token: string;
    expires: number;
    user: {
      id: number;
      name: string;
      cpf: string;
      phone_number: string;
    };
  }

  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    cpf: string;
    phone_number: string;
    access_token: string;
    expires: number;
  }
}
