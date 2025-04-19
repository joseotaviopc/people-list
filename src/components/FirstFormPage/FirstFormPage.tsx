"use client";
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpRight, InfoIcon, PlusIcon, XIcon } from "lucide-react";
import { ScrollLeft, ScrollRight } from "@/assets";
import { Upload } from "@/assets";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  state: z.string().min(2, "Deve ter pelo menos 2 caracteres"),
  cnpj: z.string().min(14, "CNPJ deve ter pelo menos 14 caracteres"),
  stateTaxId: z.string().min(14, "Deve ter pelo menos 14 caracteres"),
})

const initialFiles = [
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/8cf6f5a3ddaa10fe7e4d581d2b592e366d4c5b31?placeholderIfAbsent=true",
    date: "08/04/25",
    time: "12:20",
  },
  {
    imageUrl: "https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/8cf6f5a3ddaa10fe7e4d581d2b592e366d4c5b31?placeholderIfAbsent=true",
    date: "08/04/25",
    time: "12:20",
  },
]

export default function FirstFormPage() {
  const [files, setFiles] = useState(initialFiles)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 200;
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 200;
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cnpj: "",
      state: "",
      stateTaxId: "",
    },
  })

  function handleRemoveFile() {}

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <main className="flex overflow-hidden flex-wrap gap-10 justify-center items-center px-20 py-10 min-h-screen bg-zinc-50 max-md:px-5">
      <section className="flex flex-col justify-center h-full min-w-60 w-[722px] max-md:max-w-full">
        <header className="w-40 max-w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/28589217f7c95b3096b1e549983f5afc4d150520?placeholderIfAbsent=true"
            alt="Company logo"
            className="object-contain w-full aspect-[1.76]"
          />
        </header>

        <div className="flex flex-col justify-center pt-10 w-full max-md:max-w-full" />

        <article className="max-w-full w-[693px]">
          <div className="w-full max-w-[693px] max-md:max-w-full">
            <h1 className="flex flex-col w-full text-6xl tracking-tighter text-[64px] max-md:max-w-full max-md:text-4xl">
              <span className="gap-6 text-gray-700 max-md:max-w-full max-md:text-4xl">
              "Você informa os dados,
              </span>
              <div className="flex relative gap-4 items-start self-start text-gray-700 min-h-[72px] max-md:max-w-full max-md:text-4xl">
                <span className="z-0 my-auto max-md:max-w-full max-md:text-4xl">
                  a <span className="bg-primary m-1 px-2 text-background">LNADV</span> faz o
                  resto!"
                </span>
              </div>
            </h1>

            <p className="flex-1 shrink gap-2 self-stretch py-4 pl-10 mt-10 w-full text-lg tracking-normal leading-8 text-gray-700 border-l border-solid basis-0 border-l-[color:var(--Claro-Bordas-01,#D8E0F0)] border-slate-200 max-md:pl-5 max-md:max-w-full">
              Preencha seus dados e nós diagnosticamos e recuperamos o que é
              seu!<br /> As informações são necessárias para verificarmos todos os
              créditos tributários existentes em seu favor através das NFs
              emitidas.
            </p>
          </div>
        </article>

        <div className="flex flex-col justify-center pt-8 w-full max-md:max-w-full" />

        <Form {...form}>
          <form className="w-full max-md:max-w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500 font-bold px-2">Nome/Razão Social</FormLabel>
                  <FormControl className="px-5 text-base">
                    <Input className="placeholder:text-grey-light" placeholder="Ex: AgroTech Soluções LTDA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-500 font-bold px-2">CPF/CNPJ</FormLabel>
                  <FormControl className="px-5 text-base">
                    <Input className="placeholder:text-grey-light" placeholder="Ex: 12.345.678/0001-99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-slate-500 font-bold px-2">Estado</FormLabel>
                    <FormControl className="px-5 text-base">
                      <Input className="placeholder:text-grey-light" placeholder="Ex: SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /><FormField
                control={form.control}
                name="stateTaxId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-slate-500 font-bold px-2">Inscrição Estadual</FormLabel>
                    <FormControl className="px-5 text-base">
                      <Input className="placeholder:text-grey-light" placeholder="Ex: 110.042.490.114" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>


          <section className="mt-5 w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-2.5 items-center justify-between w-full max-md:max-w-full">
              <div className="flex items-center">
                <h2 className="self-stretch px-1.5 my-auto text-sm font-bold text-slate-500">
                  Upload de arquivos
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger><InfoIcon size={18} className="text-grey-light" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Adicionar ao acervo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const newFile = {
                      imageUrl: URL.createObjectURL(file),
                      date: format(new Date(), 'dd/MM/yy', { locale: ptBR }),
                      time: format(new Date(), 'HH:mm', { locale: ptBR }),
                      index: (files.length + 1).toString().padStart(2, '0'),
                    };
                    
                    setFiles([...files, newFile]);
                  }
                }}
              />

              <Button
                variant="ghost"
                className="flex gap-1.5 items-center self-stretch bg-grey-light/10"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <PlusIcon size={16} className="text-grey-dark" />
                <span className="self-stretch my-auto text-sm font-medium whitespace-nowrap text-slate-500">
                  Upload
                </span>
              </Button>
            </div>

            <div
              className="flex relative gap-4 items-center self-center  mt-6 w-full px-0"
            >
              {files.length > 4 && <div className="absolute left-1 cursor-pointer" onClick={handleScrollLeft}>
                <ScrollRight />
              </div>}
              <div className="flex gap-4 items-center self-center overflow-x-hidden" ref={scrollContainerRef}>
                {files.map((item, index) => (
                  <Button
                    variant="outline"
                    key={index}
                    className="flex overflow-hidden flex-col justify-center items-center self-stretch px-0 my-auto whitespace-nowrap rounded-lg min-h-[119px] shadow bg-background border"
                  >
                    {/* INSERIR BOTAO DE EXLUIR */}
                    <Button
                      variant="ghost"
                      className="flex gap-1.5 items-center self-stretch bg-grey-light/10"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <XIcon size={16} className="text-grey-dark" />
                      <span className="self-stretch my-auto text-sm font-medium whitespace-nowrap text-slate-500">
                        Excluir
                      </span>
                    </Button>
                    {item.imageUrl ? (
                      <>
                        <img
                          src={item.imageUrl}
                          alt="Uploaded file preview"
                          className="object-cover flex-1 aspect-[2.01] w-[169px]"
                        />
                        <div className="flex justify-center items-center px-4 py-2.5 w-full">
                          <time className="gap-2.5 self-stretch my-auto text-xs text-slate-500">
                          {index < 10 ? `0${index + 1}` : index + 1} - {item.date}
                          </time>
                          <div className="flex justify-center items-center self-stretch px-1.5 my-auto">
                            <div className="self-stretch my-auto w-0 border border-solid bg-slate-500 border-slate-500 min-h-[11px]" />
                          </div>
                          <time className="gap-2.5 self-stretch my-auto text-xs whitespace-nowrap text-slate-500">
                            {item.time}
                          </time>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="flex flex-col justify-center items-center px-4  aspect-[2.01] w-[169px] bg-grey-light/10"
                        >
                          <Upload />
                          <p className="text-base font-medium whitespace-nowrap text-muted-foreground">Fazer upload</p>
                        </div>
                        <div className="flex items-center px-4 py-2.5 w-full">
                          <time className="gap-2.5 self-stretch my-auto text-xs text-slate-500">
                            {index < 10 ? `0${index + 1}` : index + 1}
                          </time>
                        </div>
                      </>
                    )}

                  </Button>
                ))}
              </div>
              {files.length > 4 && <div className="absolute right-1 cursor-pointer" onClick={handleScrollRight}>
                <ScrollLeft />
              </div>}
            </div>
          </section>

          {/* SUBMIT */}
          <div className="flex flex-col justify-center items-end mt-5 w-full max-md:max-w-full">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              className="flex gap-2.5 justify-center items-center max-w-full"
            >
              <span className="flex gap-2.5 items-center justify-center self-stretch p-1 my-auto rounded-lg bg-background h-[26px] w-[26px]">
                <ArrowUpRight className="text-primary" strokeWidth={2.5} size={14} />
              </span>
              <span className="self-stretch my-auto text-xl font-semibold text-background">
                Enviar
              </span>
            </Button>
          </div>
        </Form>
      </section>

      <aside className="flex overflow-hidden items-center h-full rounded-2xl min-w-60 w-[413px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/caf2e5edb86f8dd7ab636f9d36fad6bb5b30fb10?placeholderIfAbsent=true"
          alt="Decorative side image"
          className="object-contain self-stretch my-auto aspect-[0.57] min-w-60 w-[413px]"
        />
      </aside>
    </main>
  );
}
