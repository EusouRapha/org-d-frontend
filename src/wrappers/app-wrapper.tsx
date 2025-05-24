"use client";
import Sidebar from "@/components/ui/side-bar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import ReactQueryWrapper from "./react-query-wrapper";

export default function AppWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: never;
}) {
  const pathname = usePathname(); // Obtém a rota atual
  const isLoginPage = pathname === "/login"; // Verifica se é a página de login
  const isRegisterPage = pathname === "/registrar"; // Verifica se é a página de registro
  return (
    <SessionProvider session={session}>
      <ReactQueryWrapper>
        {!isLoginPage && !isRegisterPage ? (
          <div className="flex flex-row h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-grow bg-org-d-pessego">{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </ReactQueryWrapper>
    </SessionProvider>
  );
}
