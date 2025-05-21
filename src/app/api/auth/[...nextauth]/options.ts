import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;

        try {
          // Use o axios para fazer a chamada à API
          const response = await axios.post(
            "http://localhost:4000/auth/login",
            {
              email,
              password,
            }
          );

          const user = response.data;
          if (user) {
            return {
              id: user.id,
              username: user.username,
              email: user.email,
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
        token.username = user.username as string;
        token.email = user.email as string;
        token.access_token = user.access_token as string;
        token.expires = user.expires as number;
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string;
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.email = token.email as string;
      session.expires = token.expires as number;

      console.log("Session:", session);
      return session;
    },
  },
};
