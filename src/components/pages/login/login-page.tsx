"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { H1, H3 } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "../../../assets/ORG-D Logo.svg";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalido" }),
  password: z.string().min(1, { message: "senha invalida" }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="flex flex-row w-full h-screen align-center text-center items-center">
      <div className="flex flex-col justify-center items-center w-2/3 h-full ">
        <H1 className="text-blue-950 font-semibold">Seja bem vindo ao</H1>
        <Image
          onError={(e) => console.log(e.target)}
          src={Logo}
          alt={"Org-d Logo"}
          width={300}
          height={300}
        ></Image>
        <H3 className="text-blue-900 whitespace-pre-line">
          ORG-D é um sistema para você organizar seus desejos de compras e{"\n"}
          categorizá-los.
        </H3>
      </div>
      <div className="flex flex-col justify-center items-center bg-blue-900 w-1/2 h-full ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white cursor-not-allowed">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite aqui seu email"
                      type="email"
                      className="w-64"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white cursor-not-allowed">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite aqui sua senha"
                      type="password"
                      className="w-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={() => form.handleSubmit(onSubmit)}>
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
