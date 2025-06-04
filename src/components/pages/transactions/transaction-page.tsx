import { TransactionTypeEnum } from "@/components/pages/transactions/transaction-constants";
import { TransactionForm } from "@/components/pages/transactions/ui/transaction-form";
import { H1 } from "@/components/ui/typography";

export default function DepositPage() {
  return (
    <div suppressHydrationWarning>
      <H1 className="text-org-d-green font-bold text-center pt-8">
        Transações
      </H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto px-4 max-[768px]:px-2 max-[375px]:px-1">
        <div className="flex flex-col h-3/4 gap-16 max-[768px]:gap-8 max-[375px]:gap-4">
          <div className="flex flex-col justify-center align-center gap-8 max-[768px]:gap-4 max-[375px]:gap-2">
            <TransactionForm type={TransactionTypeEnum.CREDIT} />
            <TransactionForm type={TransactionTypeEnum.DEBIT} />
          </div>
        </div>
      </div>
    </div>
  );
}
