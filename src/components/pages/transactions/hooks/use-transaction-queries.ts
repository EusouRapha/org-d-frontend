import api from "@/app/api/auth/[...nextauth]/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TransactionOperationEnum, TransactionTypeEnum } from "../transaction-constants";

type Account = {
  account_number: string;
  balance: number;
  limit: number
};

export function useGetAccountsQuery(clientId: number | undefined) {
  const getAccountsQuery = useQuery<Account[]>({
    queryKey: [`accounts/clients/${clientId}`, { details: false }],
    enabled: !!clientId,
  });

  return getAccountsQuery;
}

export function useGetAllAccountsQuery() {
  const getAllAccountsQuery = useQuery<Account[]>({
    queryKey: ["accounts"],
  });

  return getAllAccountsQuery;
}

export function useCreateTransactionMutation(
  access_token: string | undefined,
  clientId: number,
  type: TransactionTypeEnum,
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { accountNumber: string; value: number, operation: TransactionOperationEnum, transferType?: TransactionTypeEnum  }) => {
      const token = access_token ?? "";
      return api.post(
        "launches",
        {
          account_number: data.accountNumber,
          value: data.value,
          type: data.transferType ?? type,
          operation: data.operation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`accounts/clients/${clientId}`, { details: false }],
      });

      queryClient.invalidateQueries({
        queryKey: ["accounts"],
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
