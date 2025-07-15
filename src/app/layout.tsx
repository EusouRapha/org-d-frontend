import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import AppWrapper from "../wrappers/app-wrapper";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"], // Estilos normal e itálico
});

export const metadata: Metadata = {
  title: "ORG-D",
  description: "O banco feito para você",
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: never;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="w-full h-full">
      <body
        suppressHydrationWarning
        className={`${redHatDisplay.className} antialiased w-full h-full`}
      >
        <AppWrapper session={session}>{children}</AppWrapper>
      </body>
    </html>
  );
}
