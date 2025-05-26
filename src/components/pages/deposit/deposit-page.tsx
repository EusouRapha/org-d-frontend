import { H1 } from "@/components/ui/typography";
import { DepositForm } from "./ui/deposit-form";

export default function DepositPage() {
  return (
    <>
      <H1 className="text-org-d-green font-bold text-center pr-16 pt-8">
        Deposito
      </H1>
      <div className="flex flex-col justify-center items-center h-screen mx-auto">
        <div className="flex flex-col h-3/4 gap-16">
          <div></div>
          <div className="flex flex-col justify-center align-center">
            <DepositForm />
          </div>
        </div>
      </div>
    </>
  );
}
