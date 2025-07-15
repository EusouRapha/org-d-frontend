import api from "@/app/api/auth/[...nextauth]/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateClientMutation(access_token: string | undefined) {
  return useMutation({
    mutationFn: async (data: {
      clientId: number;
      name: string;
      phone_number: string;
    }) => {
      const token = access_token ?? "";

      return api.patch(
        `/clients/${data.clientId}`,
        { name: data.name, phone_number: data.phone_number },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (_data) => {
      const successMessage = "Cliente editado com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage = "Ocorreu um erro ao editar o cliente";
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "white",
        },
      });
    },
  });
}

export function useDeleteClientMutation(access_token: string | undefined) {
  return useMutation({
    mutationFn: async (clientId: number) => {
      const token = access_token ?? "";
      return api.delete(`/clients/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      const successMessage = "Cliente deletado com sucesso!";
      toast.success(successMessage, {
        style: {
          background: "green",
          color: "white",
        },
      });
    },
    onError: () => {
      const errorMessage = "Ocorreu um erro ao deletar o cliente";
      toast.error(errorMessage, {
        style: {
          background: "red",
          color: "white",
        },
      });
    },
  });
}
