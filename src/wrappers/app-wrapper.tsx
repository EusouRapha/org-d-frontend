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
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/registrar";
  return (
    <SessionProvider session={session}>
      <ReactQueryWrapper>
        {!isLoginPage && !isRegisterPage ? (
          <div suppressHydrationWarning className="min-h-screen">
            <Sidebar />
            <main
              suppressHydrationWarning
              className="bg-org-d-pessego min-h-screen ml-[200px] max-[768px]:ml-20 max-[375px]:ml-16 max-[320px]:ml-14"
            >
              {children}
            </main>
          </div>
        ) : (
          <main
            suppressHydrationWarning
            className="min-h-screen bg-org-d-pessego"
          >
            {children}
          </main>
        )}
      </ReactQueryWrapper>
    </SessionProvider>
  );
}
