"use client";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Email inválido!"),
  password: z.string().min(8, "Senha inválida!"),
  rememberMe: z.boolean(),
})

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Handle login logic here
    console.log(values)
    form.reset();
    toast.success("Login realizado com sucesso");
  };

  const handleRegister = () => {
    // Handle register logic here, remove toast.info
    toast.info("Navegar para tela de registro");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here, remove toast.info
    toast.info("Navegar para tela de esqueci minha senha");
  };

  return (
    <section className="flex flex-col justify-center items-center self-stretch my-auto min-w-60 w-lg">
      {/* FORM */}
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col w-full">
            <h2 className="self-center text-2xl font-semibold text-center text-foreground">
              Entre agora
            </h2>
            <div className="mt-10 max-w-full w-[403px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email" {...field}
                        className="flex-1 shrink gap-2.5 self-stretch px-5 py-3 mt-1.5 w-full rounded-xl basis-0 bg-zinc-50 min-h-12 placeholder:text-muted-foreground"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-9">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">

                          <Input
                            placeholder="Senha"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="flex-1 shrink gap-2.5 self-stretch px-5 py-3 mt-1.5 w-full rounded-xl basis-0 bg-zinc-50 min-h-12"
                          />
                          <button
                            type="button"
                            onClick={() => { console.log('clicou'); setShowPassword(!showPassword) }}
                            className="absolute cursor-pointer z-10 right-3 top-8 -translate-y-1/2 flex justify-center items-center self-stretch my-auto w-6"
                          >
                            <div className="flex overflow-hidden flex-col justify-center self-stretch my-auto w-6 max-w-6 min-h-6 min-w-6">
                              <img
                                src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/8f5443055f0872d6f7925186506d4a633f96b658?placeholderIfAbsent=true"
                                alt={showPassword ? "Hide password" : "Show password"}
                                className="object-contain w-full aspect-[1.33] fill-slate-500"
                              />
                            </div>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center mt-8 w-full min-h-5">
              <div className="flex gap-3.5 items-center justify-between self-stretch px-0.5 my-auto min-w-60 w-[404px]">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-1 space-y-0 p-4 px-0 h-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="h-5 w-5 aspect-square cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal text-grey-light px-0 cursor-pointer">
                        Lembrar
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleForgotPassword}
                  className="text-base text-right font-normal text-grey-light justify-end px-3"
                >
                  Esqueceu sua senha?
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* BUTTON ACTIONS */}
      <div className="flex flex-col justify-center items-center mt-10 w-full">
        <Button type="button" onClick={form.handleSubmit(handleSubmit)} className="items-center w-[170px] max-md:px-5">
          <span className="text-base font-bold basis-0 pr-2">
            Entrar
          </span>
          <div className="flex flex-col justify-center items-center self-stretch my-auto w-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/8b0ee723288ad50ae8b825c5736ee7678ef9079e?placeholderIfAbsent=true"
              alt="Enter icon"
              className="object-contain w-full aspect-[1.33] fill-zinc-50"
            />
          </div>
        </Button>
        <Button
          onClick={handleRegister}
          variant="ghost"
          className="mt-6 text-sm font-semibold text-center flex overflow-hidden gap-3.5 justify-center items-center px-11 py-3.5 w-[170px] text-primary">
          Não tem uma conta?
        </Button>
      </div>
    </section>
  );
};
