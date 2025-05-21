"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";

export default function HomePage() {
  const [fetchUsers, setFetchUsers] = React.useState(false); // Estado para controlar a execução da query

  const usersQuery = useQuery<any>(["users", { page: 1 }], {
    enabled: fetchUsers,
  });
  async function onClick() {
    console.log(usersQuery?.data);
    setFetchUsers(true); // Define fetchUsers como true para executar a query
    console.log(usersQuery?.data);
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-green-500">
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
          <div>
            {usersQuery?.data && (
              <ul>
                {usersQuery?.data.map((user: any) => (
                  <li key={user.name}>{user.name}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      </div>
    </>
  );
}
