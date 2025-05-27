import { H1 } from "@/components/ui/typography";
import { TransactionForm } from "@/components/shared/transaction/ui/transaction-form";
import { TransactionTypeEnum } from "@/components/shared/transaction/transaction-constants";

export default function DepositPage() {
  return (
    <>
      <H1 className="text-org-d-green font-bold text-center pr-16 pt-8">
        Transações
      </H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto">
        <div className="flex flex-col h-3/4 gap-16">
          <div></div>
          <div className="flex flex-col justify-center align-center gap-8">
            <TransactionForm type={TransactionTypeEnum.CREDIT} />
            <TransactionForm type={TransactionTypeEnum.DEBIT} />
          </div>
        </div>
      </div>
    </>
  );
}
