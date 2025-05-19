"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import type { NextRequest } from "next/server";

export default function Home(request: NextRequest) {
  const session = useSession();

  React.useEffect(() => {
    console.log("session", session);
  }, [session]);

  async function onClick() {
    const token = session.data?.access_token;
    fetch("http://localhost:4000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {session.data?.user ? (
          <>
            <h1 className="font-black p-4"></h1>
            <button
              className="p-4 m-4 gap-4 border-amber-400 border-4"
              onClick={() => onClick()}
            >
              {" "}
              chamada da rota de usuarios
            </button>
            <button onClick={() => signOut()}>Deslogar</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Logar</button>
        )}
      </div>
    </>
  );
}
