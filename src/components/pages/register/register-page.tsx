import { H1, H3 } from "@/components/ui/typography";

import Image from "next/image";
import Logo from "../../../assets/Maquininha.svg";
import RegisterForm from "./ui/register-form";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col w-full h-screen align-center text-center items-center">
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <H1 className="text-blue-950 font-semibold">
            Pronto para se tornar um cliente? Registre-se aqui
          </H1>
          <Image
            className="p-8"
            src={Logo}
            alt={"Org-d Logo"}
            width={200}
            height={200}
          ></Image>
          <H3 className="text-blue-900 whitespace-pre-line">
            ORG-D. O banco que irá organizar sua vida financeira
          </H3>
        </div>
        <div className="flex flex-col items-center w-full h-full ">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
