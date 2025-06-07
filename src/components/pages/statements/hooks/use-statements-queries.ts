import { useQuery } from "@tanstack/react-query";

export type Account = {
  id: number;
  account_number: string;
  balance: number;
  launches?: Launch[];
};

type Launch = {
  id: number;
  value: number;
  type: "CREDIT" | "DEBIT";
  date: Date;
  operation: string;
};

export function useGetAccountsQuery(clientId: number | undefined) {
  const getAccountsQuery = useQuery<Account[]>({
    queryKey: [`accounts/clients/${clientId}`, { details: true }],
    enabled: !!clientId,
  });

  return getAccountsQuery;
}
