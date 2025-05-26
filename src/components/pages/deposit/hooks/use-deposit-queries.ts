import api from "@/app/api/auth/[...nextauth]/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type Account = {
  accountNumber: string;
};

export function useGetAccountQuery(clientId: number) {
  const getAccountsQuery = useQuery<Account[]>({
    queryKey: [`accounts/${clientId}`],
  });

  return getAccountsQuery;
}

export function useCreateDepositMutation(access_token: string | undefined) {
  // const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { accountNumber: string; value: number }) => {
      const token = access_token ?? "";
      return api.post(
        "launches",
        {
          account_number: data.accountNumber,
          value: data.value,
          type: "CREDIT",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      const successMessage = "Depósito realizado com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage = "Ocorreu um erro ao realizar o depósito";
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
