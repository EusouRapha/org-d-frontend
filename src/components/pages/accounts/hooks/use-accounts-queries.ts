import api from "@/app/api/auth/[...nextauth]/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Account = {
  id: number;
  account_number: string;
  balance?: number;
  limit?: number;
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

export function useUpdateAccountMutation(
  access_token: string | undefined,
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: { accountId: number; accountNumber: string, value: number; clientId: number }) => {
      const token = access_token ?? "";
      return api.patch(
        `/accounts/${data.accountId}`,
        { limit: data.value, client_id: data.clientId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`accounts/clients/${variables.clientId}`, { details: false }],
      });

      const successMessage = "Conta atualizada com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage = "Ocorreu um erro ao atualizar o limite";
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
