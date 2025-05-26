"use client";
import api from "@/app/api/auth/[...nextauth]/axios";
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSession } from "next-auth/react";

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

    const queryResponse = await api.get(`${endpoint}`, {
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
