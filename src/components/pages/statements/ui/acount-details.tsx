import { H4, P } from "@/components/ui/typography";
import { Account } from "../hooks/use-statements-queries";

export default function AccountDetails({
  accounts,
  selectedAccount,
}: {
  accounts: Account[] | undefined;
  selectedAccount: string | null;
}) {
  return (
    <div className="flex flex-col justify-center align-center">
      {accounts?.map((account) => (
        <div
          key={account.id}
          className={`p-4 rounded-lg shadow-md mb-4 ${
            selectedAccount === account.id.toString()
              ? "bg-org-d-green text-white gap-8"
              : "bg-gray-100"
          }`}
        >
          <div>
            <H4>Conta: {account.account_number}</H4>
            <p className="py-1">Saldo: R$ {account.balance.toFixed(2)}</p>
          </div>
          <div>
            <H4 className="max-[768px]:text-base">Lançamentos:</H4>
            {account.launches?.length !== 0 ? (
              account.launches?.map((launch) => (
                <div key={launch.id}>
                  <P>
                    Data: {new Date(launch.date).toLocaleDateString("pt-BR")} -
                    Tipo: {launch.type === "CREDIT" ? "Crédito" : "Débito"} -
                    Valor: R$ {Number(launch.value).toFixed(2)}
                  </P>
                </div>
              ))
            ) : (
              <p>Nenhum lançamento encontrado.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
