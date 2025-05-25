import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type Account = {
  accountNumber: string;
  balance: number;
};

export function useGetAccountQuery(clientId: number) {
  const getAccountsQuery = useQuery<Account[]>({
    queryKey: [`accounts/${clientId}`],
  });

  return getAccountsQuery;
}

export function useCreateAccountMutation(access_token: string | undefined) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (clientId: number) => {
      const token = access_token ?? "";
      return axios.post(
        "http://localhost:4000/accounts",
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
        queryKey: [`accounts/${variables}`],
      });

      const successMessage = "Cliente cadastrado com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage =
        "Ocorreu um erro ao cadastrar o cliente. Verifique o formulario ou tente novamente mais tarde.";
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
