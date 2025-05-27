import api from "@/app/api/auth/[...nextauth]/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TransactionTypeEnum } from "../transaction-constants";

type Account = {
  accountNumber: string;
  balance: number;
};

export function useGetAccountQuery(clientId: number) {
  const getAccountsQuery = useQuery<Account[]>({
    queryKey: [`accounts/clients/${clientId}`],
  });

  return getAccountsQuery;
}

export function useCreateTransactionMutation(
  access_token: string | undefined,
  clientId: number,
  type: TransactionTypeEnum
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { accountNumber: string; value: number }) => {
      const token = access_token ?? "";
      return api.post(
        "launches",
        {
          account_number: data.accountNumber,
          value: data.value,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      console.log(clientId, "clientId");
      queryClient.invalidateQueries({
        queryKey: [`accounts/clients/${clientId}`],
      });
      const successMessage = "Transaçâo realizada com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage = "Ocorreu um erro ao realizar a transação";
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "white",
        },
      });
    },
  });

  return mutation;
}
