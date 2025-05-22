"use client";
import { SessionProvider } from "next-auth/react";
import ReactQueryWrapper from "./react-query-wrapper";
import { usePathname } from "next/navigation";

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
          <div className="flex flex-col h-screen">
            <header className="fixed top-0">header</header>
            <main>{children}</main>
            <footer className="fixed bottom-0">
              <h1>footer</h1>
            </footer>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </ReactQueryWrapper>
    </SessionProvider>
  );
}
