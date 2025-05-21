"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  QueryClientProvider,
  QueryClient,
  QueryFunctionContext,
} from "react-query";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
    const [endpoint, params] = queryKey as [string, Record<string, any>?];

    const queryResponse = await axios.get(`http://localhost:4000/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${session.data?.access_token}`,
      },
      params,
    });
    return queryResponse.data;
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
