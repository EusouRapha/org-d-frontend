import api from "@/app/api/auth/[...nextauth]/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Account = {
  account_number: string;
  balance: number;
};

export function useGetAccountsQuery(clientId: number | undefined) {
  const getAccountsQuery = useQuery<Account[]>({
    queryKey: [`accounts/clients/${clientId}`, { details: false }],
    enabled: !!clientId,
  });

  return getAccountsQuery;
}

export function useCreateAccountMutation(access_token: string | undefined) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (clientId: number) => {
      const token = access_token ?? "";
      return api.post(
        "/accounts",
        { client_id: clientId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`accounts/clients/${variables}`],
      });

      const successMessage = "Conta criada com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage = "Ocorreu um erro ao criar uma conta";
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
