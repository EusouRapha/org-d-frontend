"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
    const endpoint = queryKey[0] as string;
    const params = queryKey[1] as Record<string, any> | undefined;

    if (!endpoint) {
      throw new Error("O endpoint não foi definido no queryKey.");
    }

    const queryResponse = await axios.get(`http://localhost:4000/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${session.data?.access_token}`,
      },
      params,
    });

    return queryResponse.data;
  };

  queryClient.setDefaultOptions({
    queries: {
      queryFn: defaultQueryFn,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} client={queryClient} />
    </QueryClientProvider>
  );
}
