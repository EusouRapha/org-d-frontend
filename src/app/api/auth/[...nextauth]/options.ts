import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpf: { label: "cpf", type: "text", placeholder: "cpf" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { cpf, password } = credentials as any;

        try {
          // Use o axios para fazer a chamada à API
          const response = await axios.post(
            "http://localhost:4000/auth/login",
            {
              cpf,
              password,
            }
          );

          const user = response.data;
          if (user) {
            return {
              id: user.id,
              name: user.name,
              cpf: user.cpf,
              phone_number: user.phone_number,
              access_token: user.access_token,
              expires: user.expiresIn.toString(),
            };
          }
          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  pages: {
    signIn: "../../../login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.cpf = user.cpf as string;
        token.phone_number = user.phone_number as string;
        token.access_token = user.access_token as string;
        token.expires = user.expires as number;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.name = token.name as string;
      session.user.cpf = token.cpf as string;
      session.user.phone_number = token.phone_number as string;
      session.access_token = token.access_token as string;
      session.expires = token.expires as number;

      return session;
    },
  },
};
