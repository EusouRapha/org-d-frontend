import { H1, H3 } from "@/components/ui/typography";
import { CircleDollarSign } from "lucide-react";
import LoginForm from "./ui/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col w-full h-screen align-center text-center items-center bg-org-d-green">
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <H1 className="text-org-d-pessego p-4 font-bold">
            Seja bem vindo ao ORG-D
          </H1>
          <CircleDollarSign
            size={150}
            strokeWidth={1}
            className="stroke-org-d-pessego"
          />
          <H3 className="text-org-d-pessego whitespace-pre-line pt-4 font-semibold">
            O banco que irá organizar sua vida financeira
          </H3>
        </div>
        <div className="flex flex-col items-center w-full h-full ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
