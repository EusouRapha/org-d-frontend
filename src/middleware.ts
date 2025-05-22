import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  const isAuthPage = request.nextUrl.pathname === "/login";
  const isRegisterPage = request.nextUrl.pathname === "/registrar";

  // Permitir acesso à página de registro e login sem token
  if (!token && (isAuthPage || isRegisterPage)) {
    return NextResponse.next();
  }

  // Redirecionar para login se não houver token e não for página de login ou registro
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirecionar para a página inicial se já estiver logado e tentar acessar a página de login
  if (token && isAuthPage) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
