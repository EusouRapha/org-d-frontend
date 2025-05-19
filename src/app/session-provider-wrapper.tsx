"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: never;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
