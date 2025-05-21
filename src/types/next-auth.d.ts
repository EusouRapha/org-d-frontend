import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id?: string;
    username: string;
    access_token: string;
    expires: number;
  }

  interface Session extends DefaultSession {
    access_token: string;
    expires: number;
    user: {
      access_token: string;
      id: string;
      username: string;
      email: string;
    };
  }

  interface JWT extends DefaultJWT {
    id: string;
    username: string;
    email: string;
    access_token: string;
    expires: number;
  }
}
