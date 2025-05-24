"use client";

import Image from "next/image";
import Logo from "../../assets/Maquininha.svg";
import { useSession } from "next-auth/react";
import { H3 } from "./typography";

export default function Header() {
  const session = useSession();
  const userName = session.data?.user.name || "Carregando...";
  return (
    <header className="flex flex-col bg-green-700">
      <div className="flex items-end justify-between px-4 py-4">
        <div>
          <Image src={Logo} alt="Org-d Logo" width={50} height={50} />
        </div>
        <div className="text-white font-medium text-sm">
          <H3 className="text-blue-950 font-semibold">
            {`Cliente: ${userName}`}
          </H3>
        </div>
      </div>
      <div className="border-b-4 border-black"></div>
    </header>
  );
}
